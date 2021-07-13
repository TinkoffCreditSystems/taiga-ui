import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {tuiDefaultProp} from '@taiga-ui/cdk';

@Component({
    selector: 'tui-preview-action',
    templateUrl: './preview-action.template.html',
    styleUrls: ['./preview-action.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiPreviewActionComponent {
    @Input()
    @tuiDefaultProp()
    title = '';

    @Input()
    @tuiDefaultProp()
    icon = '';
}
