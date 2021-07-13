import {ChangeDetectionStrategy, Component} from '@angular/core';

@Component({
    selector: 'tui-preview-loading',
    templateUrl: './preview-loading.template.html',
    styleUrls: ['./preview-loading.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiPreviewLoadingComponent {}
