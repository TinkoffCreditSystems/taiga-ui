import {Component} from '@angular/core';

import {default as exampleComponent} from '!!raw-loader!./examples/import/component.txt';
import {default as exampleImportHostModule} from '!!raw-loader!./examples/import/import-host-module.txt';
import {default as exampleImportModule} from '!!raw-loader!./examples/import/import-module.txt';
import {default as exampleTemplate} from '!!raw-loader!./examples/import/template.txt';
import {default as exampleTuiRoot} from '!!raw-loader!./examples/import/tui-root.txt';

import {default as example1Html} from '!!raw-loader!./examples/1/index.html';
import {default as example1Less} from '!!raw-loader!./examples/1/index.less';
import {default as example1Ts} from '!!raw-loader!./examples/1/index.ts';

import {default as example2Html} from '!!raw-loader!./examples/2/index.html';
import {default as example2Less} from '!!raw-loader!./examples/2/index.less';
import {default as example2Ts} from '!!raw-loader!./examples/2/index.ts';

import {default as example3Html} from '!!raw-loader!./examples/3/index.html';
import {default as example3Less} from '!!raw-loader!./examples/3/index.less';
import {default as example3Ts} from '!!raw-loader!./examples/3/index.ts';

import {changeDetection} from '../../../change-detection-strategy';
import {FrontEndExample} from '../../interfaces/front-end-example';

@Component({
    selector: 'example-preview',
    templateUrl: './preview.template.html',
    changeDetection,
})
export class ExampleTuiPreviewComponent {
    readonly exampleTuiRoot = exampleTuiRoot;
    readonly exampleImportHostModule = exampleImportHostModule;
    readonly exampleImportModule = exampleImportModule;
    readonly exampleComponent = exampleComponent;
    readonly exampleTemplate = exampleTemplate;

    readonly example1: FrontEndExample = {
        TypeScript: example1Ts,
        LESS: example1Less,
        HTML: example1Html,
    };

    readonly example2: FrontEndExample = {
        TypeScript: example2Ts,
        LESS: example2Less,
        HTML: example2Html,
    };

    readonly example3: FrontEndExample = {
        TypeScript: example3Ts,
        LESS: example3Less,
        HTML: example3Html,
    };
}
