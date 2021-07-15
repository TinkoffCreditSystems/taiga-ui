import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiTableModule} from '@taiga-ui/addon-table';
import {
    TuiButtonModule,
    TuiDataListModule,
    TuiDropdownModule,
    TuiSvgModule,
} from '@taiga-ui/core';
import {TuiDropdownContextModule, TuiTextAreaModule} from '@taiga-ui/kit';
import {ExampleTuiDropdownContextComponent} from './dropdown-context.component';
import {TuiDropdownContextExample1} from './examples/1';
import {TuiDropdownContextExample2} from './examples/2';
import {TuiDropdownContextExample3} from './examples/3';

@NgModule({
    imports: [
        CommonModule,
        TuiAddonDocModule,
        TuiDataListModule,
        TuiDropdownModule,
        TuiSvgModule,
        TuiTableModule,
        TuiDropdownContextModule,
        TuiTextAreaModule,
        TuiButtonModule,
        RouterModule.forChild(generateRoutes(ExampleTuiDropdownContextComponent)),
        ReactiveFormsModule,
    ],
    declarations: [
        ExampleTuiDropdownContextComponent,
        TuiDropdownContextExample1,
        TuiDropdownContextExample2,
        TuiDropdownContextExample3,
    ],
})
export class ExampleTuiDropdownContextModule {}
