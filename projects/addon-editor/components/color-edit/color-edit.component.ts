import {
    ChangeDetectionStrategy,
    Component,
    EventEmitter,
    Input,
    Output,
} from '@angular/core';
import {hexToRgb, rgbToHex} from '@taiga-ui/addon-editor/utils';
import {tuiDefaultProp} from '@taiga-ui/cdk';
import {TuiTextMaskOptions} from '@taiga-ui/core';

@Component({
    selector: 'tui-color-edit',
    templateUrl: './color-edit.template.html',
    styleUrls: ['./color-edit.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiColorEditComponent {
    @Input()
    @tuiDefaultProp()
    color: [number, number, number, number] = [0, 0, 0, 1];

    @Input()
    @tuiDefaultProp()
    isAlphaEnabled = true;

    @Output()
    readonly colorChange = new EventEmitter<[number, number, number, number]>();

    readonly hexMask: TuiTextMaskOptions = {
        mask: ({length}) => Array.from({length}, () => /\d|[a-f]|[A-F]/),
        guide: false,
    };

    readonly modes = ['HEX', 'RGB'];

    mode = this.modes[0];

    get isHex(): boolean {
        return this.mode === this.modes[0];
    }

    get hex(): string {
        return rgbToHex(this.color[0], this.color[1], this.color[2]);
    }

    get opacity(): number {
        return this.color[3] * 100;
    }

    onHexChange(hex: string) {
        if (hex.length !== 6) {
            return;
        }

        const rgb = hexToRgb(hex);

        this.updateColor([rgb[0], rgb[1], rgb[2], this.color[3]]);
    }

    onRgbChange(...rgba: [number, number, number, number]) {
        this.updateColor(rgba);
    }

    private updateColor(color: [number, number, number, number]) {
        this.color = color;
        this.colorChange.emit(color);
    }
}
