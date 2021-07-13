import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as example3Html} from '!!raw-loader!./examples/3/index.html';
import {default as example3Ts} from '!!raw-loader!./examples/3/index.ts';

import {default as changeDetection4Ts} from '!!raw-loader!./../../../change-detection-strategy.ts';
import {default as example4Component} from '!!raw-loader!./examples/4/custom-list/custom-list.component.ts';
import {default as example4Template} from '!!raw-loader!./examples/4/custom-list/custom-list.template.html';
import {default as example4Html} from '!!raw-loader!./examples/4/index.html';
import {default as example4Ts} from '!!raw-loader!./examples/4/index.ts';

import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleInsertTemplate} from '!!raw-loader!./examples/import/insert-template.txt';

import {Component} from '@angular/core';
import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

@Component({
    selector: 'example-tui-data-list',
    templateUrl: './data-list.template.html',
    changeDetection,
})
export class ExampleTuiDataListComponent {
    readonly exampleImportModule = exampleImportModule;
    readonly exampleInsertTemplate = exampleInsertTemplate;

    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        HTML: example1Html,
    };

    readonly example2: FrontEndExample = {
        TypeScript: example2Ts,
        HTML: example2Html,
    };

    readonly example3: FrontEndExample = {
        TypeScript: example3Ts,
        HTML: example3Html,
    };

    readonly example4 = {
        TypeScript: example4Ts,
        HTML: example4Html,
        Support: [
            {'src/app/custom-list/custom-list.component.ts': example4Component},
            {'src/app/custom-list/custom-list.template.html': example4Template},
            {'src/change-detection-strategy.ts': changeDetection4Ts},
        ],
        SupportDeclaration: [
            {'./custom-list/custom-list.component': 'CustomListComponent'},
        ],
    };
}
