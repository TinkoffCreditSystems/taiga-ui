import {NgModule} from '@angular/core';
import {TuiDropdownModule} from '@taiga-ui/core';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiDropdownContextHostComponent} from './dropdown-context-host.component';
import {TuiDropdownContextDirective} from './dropdown-context.directive';

@NgModule({
    imports: [TuiDropdownModule, PolymorpheusModule],
    declarations: [TuiDropdownContextDirective, TuiDropdownContextHostComponent],
    exports: [TuiDropdownContextDirective],
    entryComponents: [TuiDropdownContextHostComponent],
})
export class TuiDropdownContextModule {}
