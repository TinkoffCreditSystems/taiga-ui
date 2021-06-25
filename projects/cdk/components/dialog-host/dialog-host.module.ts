import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiBackNavigationBlockService} from '@taiga-ui/cdk/components/dialog-host/tui-back-navigation-block.service';
import {TuiFocusTrapModule} from '@taiga-ui/cdk/directives/focus-trap';
import {TuiOverscrollModule} from '@taiga-ui/cdk/directives/overscroll';
import {TuiDestroyService} from '@taiga-ui/cdk/services';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiDialogHostComponent} from './dialog-host.component';

@NgModule({
    imports: [CommonModule, PolymorpheusModule, TuiOverscrollModule, TuiFocusTrapModule],
    providers: [TuiDestroyService, TuiBackNavigationBlockService],
    declarations: [TuiDialogHostComponent],
    exports: [TuiDialogHostComponent],
})
export class TuiDialogHostModule {}
