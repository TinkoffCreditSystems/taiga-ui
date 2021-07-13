import {Component} from '@angular/core';
import {TuiTextMaskOptions} from '@taiga-ui/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-color-picker-example-3',
    templateUrl: './index.html',
    changeDetection,
    encapsulation,
})
export class TuiColorPickerExample3 {
    color = '#ffdd2d';
    colorGradient = '#000099';
    colorHex = '#ff00ff55';
    colorHexWithoutAlpha = '#ff00ff';
    colorMask = '#005500';

    hexMask: TuiTextMaskOptions = {
        mask: () => ['#', ...new Array(6).fill(/\d|[a-f]|[A-F]/)],
        guide: false,
    };
}
