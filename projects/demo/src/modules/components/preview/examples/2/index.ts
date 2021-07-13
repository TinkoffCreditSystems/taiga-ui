import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import {TuiPreviewService} from '@taiga-ui/addon-preview';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-preview-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiPreviewExample2 {
    @ViewChild('preview')
    readonly preview?: TemplateRef<{}>;

    constructor(
        @Inject(TuiPreviewService) private readonly previewService: TuiPreviewService,
    ) {}

    show() {
        this.previewService.open(this.preview || '').subscribe();
    }
}
