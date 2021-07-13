import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {RouterModule} from '@angular/router';
import {generateRoutes, TuiAddonDocModule} from '@taiga-ui/addon-doc';
import {TuiTreeViewModule} from '@taiga-ui/kit';
import {TuiTreeViewExample1} from './examples/1';
import {ExampleTuiTreeViewComponent} from './tree-view.component';

@NgModule({
    imports: [
        TuiTreeViewModule,
        CommonModule,
        FormsModule,
        ReactiveFormsModule,
        TuiAddonDocModule,
        RouterModule.forChild(generateRoutes(ExampleTuiTreeViewComponent)),
    ],
    declarations: [ExampleTuiTreeViewComponent, TuiTreeViewExample1],
    exports: [ExampleTuiTreeViewComponent],
})
export class ExampleTuiTreeViewModule {}
