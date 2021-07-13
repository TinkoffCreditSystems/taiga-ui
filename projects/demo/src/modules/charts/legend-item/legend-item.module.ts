import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {
    TuiLegendItemModule,
    TuiPieChartModule,
    TuiRingChartModule,
} from '@taiga-ui/addon-charts';
import {TuiMoneyModule} from '@taiga-ui/addon-commerce';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiHoveredModule} from '@taiga-ui/cdk';
import {TuiButtonModule, TuiPrimitiveCheckboxModule} from '@taiga-ui/core';
import {TuiCheckboxModule, TuiToggleModule} from '@taiga-ui/kit';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TuiLegendItemExample1} from './examples/1';
import {TuiLegendItemExample2} from './examples/2';
import {TuiLegendItemExample3} from './examples/3';
import {ExampleTuiLegendItemComponent} from './legend-item.component';

@NgModule({
    imports: [
        CommonModule,
        TuiLegendItemModule,
        TuiRingChartModule,
        TuiPieChartModule,
        TuiMoneyModule,
        PolymorpheusModule,
        TuiHoveredModule,
        TuiAddonDocModule,
        TuiToggleModule,
        TuiButtonModule,
        TuiPrimitiveCheckboxModule,
        TuiCheckboxModule,
        RouterModule.forChild(generateRoutes(ExampleTuiLegendItemComponent)),
        FormsModule,
        ReactiveFormsModule,
    ],
    declarations: [
        ExampleTuiLegendItemComponent,
        TuiLegendItemExample1,
        TuiLegendItemExample2,
        TuiLegendItemExample3,
    ],
    exports: [ExampleTuiLegendItemComponent],
})
export class ExampleTuiLegendItemModule {}
