import {ChangeDetectionStrategy, Component, HostListener, Inject} from '@angular/core';
import {tuiSlideInTop} from '@taiga-ui/core';
import {TuiPreviewService} from './preview.service';

@Component({
    selector: 'tui-preview-host',
    templateUrl: './preview-host.template.html',
    styleUrls: ['./preview-host.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [tuiSlideInTop],
})
export class TuiPreviewHostComponent {
    readonly preview$ = this.previewService.preview$;

    constructor(
        @Inject(TuiPreviewService) private readonly previewService: TuiPreviewService,
    ) {}

    @HostListener('keydown.esc.stop')
    onKeyDownEsc() {
        this.previewService.preview$.next(null);
    }
}
