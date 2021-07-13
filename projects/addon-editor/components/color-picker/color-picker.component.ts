import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Inject,
    Input,
    Output,
} from '@angular/core';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {hsvToRgb, rgbToHsv} from '@taiga-ui/addon-editor/utils';
import {round, tuiDefaultProp, tuiPure} from '@taiga-ui/cdk';
import {TuiPoint} from '@taiga-ui/core';

@Component({
    selector: 'tui-color-picker',
    templateUrl: './color-picker.template.html',
    styleUrls: ['./color-picker.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiColorPickerComponent {
    // TODO: Named tuples
    @Input()
    @tuiDefaultProp()
    set color(color: [number, number, number, number]) {
        if (
            this.currentColor.every((item, index) => item === color[index]) &&
            color[3] === this.opacity
        ) {
            return;
        }

        const [h, s, v] = rgbToHsv(color[0], color[1], color[2]);

        this.opacity = color[3];
        this.hue = h / 360;
        this.point = [s, 1 - v / 255];
    }

    @Input()
    @tuiDefaultProp()
    isAlphaEnabled = true;

    @Output()
    readonly colorChange = new EventEmitter<[number, number, number, number]>();

    point: TuiPoint = [0, 1];

    hue = 0;

    opacity = 1;

    constructor(@Inject(DomSanitizer) private readonly sanitizer: DomSanitizer) {}

    get currentColor(): [number, number, number] {
        return this.getCurrentColor(this.hue, this.point);
    }

    get base(): string {
        return `rgb(${hsvToRgb(this.hue * 360, 1, 255)})`;
    }

    get gradient(): SafeStyle {
        return this.sanitizer.bypassSecurityTrustStyle(
            `linear-gradient(to right, rgba(${this.currentColor.join(
                ',',
            )}, 0), rgb(${this.currentColor.join(',')}))`,
        );
    }

    onPointChange(point: TuiPoint) {
        this.point = point;
        this.updateColor();
    }

    onHueChange(hue: number) {
        this.hue = hue;
        this.updateColor();
    }

    onOpacityChange(opacity: number) {
        this.opacity = round(opacity, 2);
        this.updateColor();
    }

    @tuiPure
    private getCurrentColor(hue: number, point: TuiPoint): [number, number, number] {
        return hsvToRgb(hue * 360, point[0], (1 - point[1]) * 255);
    }

    private updateColor() {
        // TODO: Revisit with updated TS, spread might work
        this.colorChange.emit([
            this.currentColor[0],
            this.currentColor[1],
            this.currentColor[2],
            this.opacity,
        ]);
    }
}
