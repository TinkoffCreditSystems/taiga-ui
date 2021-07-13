import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiTreeViewComponent} from './tree-view.component';

@NgModule({
    imports: [CommonModule, PolymorpheusModule],
    declarations: [TuiTreeViewComponent],
    exports: [TuiTreeViewComponent],
})
export class TuiTreeViewModule {}
