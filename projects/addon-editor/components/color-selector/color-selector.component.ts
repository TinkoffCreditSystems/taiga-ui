import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {
    COLOR_OPTIONS_CONTROLLER_PROVIDER,
    TUI_COLOR_OPTIONS_WATCHED_CONTROLLER,
    TuiColorOptionsControllerDirective,
} from '@taiga-ui/addon-editor/directives/color-options-controller';
import {TUI_EDITOR_COLOR_SELECTOR_MODE_NAMES} from '@taiga-ui/addon-editor/tokens';
import {TuiGradientDirection} from '@taiga-ui/addon-editor/types';
import {
    getGradientData,
    parseColor,
    parseGradient,
    rgbaToHexA,
    rgbToHex,
} from '@taiga-ui/addon-editor/utils';
import {tuiDefaultProp, tuiPure, tuiRequiredSetter} from '@taiga-ui/cdk';
import {TuiHostedDropdownComponent} from '@taiga-ui/core';
import {LEFT_ALIGNED_DROPDOWN_CONTROLLER_PROVIDER} from '@taiga-ui/kit/providers';

const EMPTY_STOP: [number, number, number, number] = [0, 0, 0, 0];
const DEFAULT_STEPS: ReadonlyArray<[number, [number, number, number, number]]> = [
    [0, [0, 0, 0, 1]],
    [1, [255, 255, 255, 1]],
];
const ICONS: Record<TuiGradientDirection, string> = {
    'to top right': 'tuiIconArrowUpRight',
    'to right': 'tuiIconArrowRight',
    'to bottom right': 'tuiIconArrowDownRight',
    'to bottom': 'tuiIconArrowDown',
    'to bottom left': 'tuiIconArrowDownLeft',
    'to left': 'tuiIconArrowLeft',
    'to top left': 'tuiIconArrowUpLeft',
    'to top': 'tuiIconArrowUp',
};

// @dynamic
@Component({
    selector: 'tui-color-selector',
    templateUrl: './color-selector.template.html',
    styleUrls: ['./color-selector.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        COLOR_OPTIONS_CONTROLLER_PROVIDER,
        LEFT_ALIGNED_DROPDOWN_CONTROLLER_PROVIDER,
    ],
})
export class TuiColorSelectorComponent {
    @Input()
    @tuiDefaultProp()
    colors: ReadonlyMap<string, string> = new Map<string, string>();

    @Input('color')
    @tuiRequiredSetter()
    set colorSetter(color: string) {
        this.parse(color);
    }

    @Output()
    readonly colorChange = new EventEmitter<string>();

    color: [number, number, number, number] = [0, 0, 0, 1];

    currentMode = this.modes[0];

    readonly buttons: ReadonlyArray<TuiGradientDirection> = [
        'to top right',
        'to right',
        'to bottom right',
        'to bottom',
        'to bottom left',
        'to left',
        'to top left',
        'to top',
    ];

    private stops = new Map(DEFAULT_STEPS);

    private currentStop = 0;

    private direction: TuiGradientDirection = 'to bottom';

    constructor(
        @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
        @Inject(TUI_EDITOR_COLOR_SELECTOR_MODE_NAMES) readonly modes: [string, string],
        @Inject(TUI_COLOR_OPTIONS_WATCHED_CONTROLLER)
        readonly controller: TuiColorOptionsControllerDirective,
    ) {}

    get palette(): Map<string, string> {
        return this.filterPalette(this.colors, this.isGradient);
    }

    get stopsKeys(): number[] {
        return this.getStopsKeys(this.stops);
    }

    get currentColor(): [number, number, number, number] {
        return this.isGradient ? this.getStop(this.currentStop) : this.color;
    }

    get gradient(): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(this.getGradient('to right'));
    }

    get isGradient(): boolean {
        return this.currentMode === this.modes[1];
    }

    getStringFromColor(color: [number, number, number, number]): string {
        const isAlphaEnabled = this.controller.isAlphaEnabled;
        const isHexOutput = this.controller.outputFormat === 'hex';

        if (isHexOutput) {
            return `#${
                isAlphaEnabled
                    ? rgbaToHexA(...color)
                    : rgbToHex(...(color.slice(0, 3) as [number, number, number]))
            }`;
        } else {
            return `${isAlphaEnabled ? 'rgba' : 'rgb'}(${color
                .slice(0, isAlphaEnabled ? 4 : 3)
                .join(', ')})`;
        }
    }

    getIcon(direction: TuiGradientDirection): string {
        return ICONS[direction];
    }

    isModeActive(mode: string): boolean {
        return this.currentMode === mode;
    }

    isDirectionActive(direction: TuiGradientDirection): boolean {
        return this.direction === direction;
    }

    onPalettePick(color: string) {
        this.updateColor(color);
    }

    onDirectionChange(direction: TuiGradientDirection) {
        this.direction = direction;
        this.updateColor(this.getGradient(direction));
    }

    onModeSelect(mode: string, dropdown: TuiHostedDropdownComponent) {
        this.currentMode = mode;
        dropdown.open = false;
        this.updateColor(
            mode === this.modes[0]
                ? this.getStringFromColor(this.color)
                : this.getGradient(this.direction),
        );
    }

    onIndexChange(index: number) {
        this.currentStop = this.stopsKeys[index];
    }

    onColorChange(color: [number, number, number, number]) {
        if (!this.isGradient) {
            this.updateColor(this.getStringFromColor(color));

            return;
        }

        this.stops.set(this.currentStop, color);
        this.updateColor(this.getGradient(this.direction));
    }

    onStopsChange(stopsKeys: readonly number[]) {
        const removed = this.stopsKeys.find(item => stopsKeys.indexOf(item) === -1);
        const added = stopsKeys.find(item => this.stopsKeys.indexOf(item) === -1);

        if (removed === undefined && added !== undefined) {
            this.addStop(added);
        }

        if (removed !== undefined && added === undefined) {
            this.removeStop(removed);
        }

        if (removed !== undefined && added !== undefined) {
            this.replaceStop(removed, added);
        }

        this.updateColor(this.getGradient(this.direction));
    }

    private updateColor(color: string) {
        this.colorChange.emit(color);
    }

    private getGradient(direction: TuiGradientDirection): string {
        return `linear-gradient(${direction}, ${[...this.stopsKeys]
            .sort()
            .map(key => `${this.getStringFromColor(this.getStop(key))} ${key * 100}%`)
            .join(', ')})`;
    }

    private getStop(stop: number): [number, number, number, number] {
        return this.stops.get(stop) || EMPTY_STOP;
    }

    private addStop(stop: number) {
        const closest = this.stopsKeys.reduce(
            (prev, curr) => (Math.abs(curr - stop) < Math.abs(prev - stop) ? curr : prev),
            this.stopsKeys[0],
        );

        this.stops.set(stop, this.getStop(closest));
        this.stops = new Map(this.stops);
        this.currentStop = stop;
    }

    private removeStop(stop: number) {
        this.stops.delete(stop);
        this.stops = new Map(this.stops);
        this.currentStop = this.stopsKeys[0];
    }

    private replaceStop(removed: number, added: number) {
        const value = this.getStop(removed);

        this.currentStop = added;
        this.stops = new Map(
            this.stopsKeys.map<[number, [number, number, number, number]]>(key =>
                key === removed ? [added, value] : [key, this.getStop(key)],
            ),
        );
    }

    @tuiPure
    private getStopsKeys(stops: Map<number, unknown>): number[] {
        return Array.from(stops.keys());
    }

    @tuiPure
    private filterPalette(
        colors: ReadonlyMap<string, string>,
        isGradient: boolean,
    ): Map<string, string> {
        const map = new Map(colors);

        map.forEach((value, key) => {
            if (
                (value.startsWith('linear-gradient') && !isGradient) ||
                (!value.startsWith('linear-gradient') && isGradient)
            ) {
                map.delete(key);
            }
        });

        return map;
    }

    private parse(color: string) {
        if (color.startsWith('linear-gradient')) {
            this.parseGradient(color);
        } else {
            this.parseColor(color);
        }
    }

    private parseGradient(color: string) {
        if (color === this.getGradient(this.direction)) {
            return;
        }

        const gradient = parseGradient(getGradientData(color));

        this.currentMode = this.modes[1];
        this.direction = gradient.side;
        this.currentStop = 0;
        this.stops = new Map(
            gradient.stops.length
                ? gradient.stops.map<[number, [number, number, number, number]]>(
                      ({color, position}) => [
                          parseFloat(position) / 100,
                          parseColor(color),
                      ],
                  )
                : DEFAULT_STEPS,
        );
    }

    private parseColor(color: string) {
        this.currentMode = this.modes[0];
        this.currentStop = 0;
        this.color = parseColor(color);
    }
}
