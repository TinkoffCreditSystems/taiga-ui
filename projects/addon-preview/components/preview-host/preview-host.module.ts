import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiFocusTrapModule, TuiOverscrollModule} from '@taiga-ui/cdk';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiPreviewHostComponent} from './preview-host.component';

@NgModule({
    imports: [CommonModule, PolymorpheusModule, TuiOverscrollModule, TuiFocusTrapModule],
    declarations: [TuiPreviewHostComponent],
    exports: [TuiPreviewHostComponent],
})
export class TuiPreviewHostModule {}
