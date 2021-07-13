import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {tuiDefaultProp} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'tui-preview-unavailable',
    templateUrl: './preview-unavailable.template.html',
    styleUrls: ['./preview-unavailable.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiPreviewUnavailableComponent {
    @Input()
    @tuiDefaultProp()
    content: PolymorpheusContent = 'Предпросмотр недоступен';
}
