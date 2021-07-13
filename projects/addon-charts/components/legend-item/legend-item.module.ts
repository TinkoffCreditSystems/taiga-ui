import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiButtonModule} from '@taiga-ui/core';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiLegendItemComponent} from './legend-item.component';

@NgModule({
    imports: [CommonModule, TuiButtonModule, PolymorpheusModule],
    declarations: [TuiLegendItemComponent],
    exports: [TuiLegendItemComponent],
})
export class TuiLegendItemModule {}
