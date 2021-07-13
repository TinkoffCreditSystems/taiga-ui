import {Injectable} from '@angular/core';
import {CodeEditor} from '@taiga-ui/addon-doc';

import {default as angularJson} from '!!raw-loader!./project-files/angular.txt';
import {default as indexHtml} from '!!raw-loader!./project-files/src/index.html';
import {default as mainTs} from '!!raw-loader!./project-files/src/main.ts.txt';
import {default as polyfills} from '!!raw-loader!./project-files/src/polyfills.ts';
import {default as styles} from '!!raw-loader!./project-files/src/styles.less';
import {default as tsconfig} from '!!raw-loader!./project-files/tsconfig.txt';

import {default as appModuleTs} from '!!raw-loader!./project-files/src/app/app.module.ts.txt';
import {default as taigaUIModuleTs} from '!!raw-loader!./project-files/src/app/taiga-ui.module.ts.txt';

import {FrontEndExample} from '../../interfaces/front-end-example';

import stackblitz from '@stackblitz/sdk';

const DEPS: Record<string, string> = {
    '@angular/cdk': '*',
    '@angular/core': '*',
    '@angular/common': '*',
    '@angular/compiler': '*',
    '@angular/forms': '*',
    '@angular/platform-browser': '*',
    '@angular/platform-browser-dynamic': '*',
    '@angular/animations': '*',
    '@angular/router': '*',
    '@taiga-ui/cdk': '*',
    '@taiga-ui/i18n': '*',
    '@taiga-ui/core': '*',
    '@taiga-ui/kit': '*',
    '@taiga-ui/icons': '*',
    '@taiga-ui/addon-charts': '*',
    '@taiga-ui/addon-commerce': '*',
    '@taiga-ui/addon-mobile': '*',
    '@taiga-ui/addon-table': '*',
    '@taiga-ui/addon-tablebars': '*',
    '@taiga-ui/addon-editor': '*',
    '@tinkoff/ng-dompurify': '*',
    '@tinkoff/ng-polymorpheus': '3.1.8',
    '@ng-web-apis/common': '*',
    '@tinkoff/ng-event-plugins': '*',
    '@ng-web-apis/intersection-observer': '*',
    '@ng-web-apis/mutation-observer': '*',
    'angular2-text-mask': '*',
    dompurify: '*',
    '@types/dompurify': '*',
};

const COMPONENT_SELECTOR = `selector: 'my-app',`;
const COMPONENT_TEMPLATE = `templateUrl: './app.component.html',`;
const COMPONENT_STYLES = `styleUrls: ['./app.component.less'],`;

const COMPONENT_NAME = `
})
export class AppComponent {`;

function prepareTs(content: string): string {
    console.log(content);

    return content
        .replace(/selector: \'.+,*$/gm, COMPONENT_SELECTOR)
        .replace(/templateUrl: \'.+,*$/gm, COMPONENT_TEMPLATE)
        .replace(/styleUrls: \['.+,*$/gm, COMPONENT_STYLES)
        .replace(/^}\)\nexport class [\w ]+{/m, COMPONENT_NAME);
}

function prepareLess(content: string): string {
    return content.replace(
        '~@taiga-ui/core/styles/taiga-ui-local',
        '@taiga-ui/core/styles/taiga-ui-local.less',
    );
}

function compileSupportModule(
    content: Array<{[path: string]: string}> | undefined,
): {[key: string]: string} {
    const files: {[key: string]: string} = {};

    if (content && Array.isArray(content)) {
        let declarationFiles = '';
        let importFiles = '';

        content.map(file => {
            const key = Object.keys(file)[0];
            const path = `${key}`;

            declarationFiles += `${file[key]},`;
            importFiles += `
                 import { ${file[key]} } from '${path}';
                `;
        });
        files['src/app/support.module.ts'] = `
import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';
import {TaigaUIModule} from './taiga-ui.module';
${importFiles}

@NgModule({
    imports: [
        BrowserModule,
        TaigaUIModule
    ],
    declarations: [${declarationFiles}],
    exports: [${declarationFiles}],
})
export class SupportModule {}
            `;
    } else {
        files['src/app/support.module.ts'] = `
import {NgModule} from '@angular/core';

@NgModule({})
export class SupportModule {}
            `;
    }

    return files;
}

function compileSupportFiles(
    content: Array<{[path: string]: string}> | undefined,
): {[key: string]: string} {
    const files: {[key: string]: string} = {};

    if (content && Array.isArray(content)) {
        content.map(file => {
            const path = Object.keys(file)[0];

            files[path] = file[path];
        });
    }

    return files;
}

@Injectable()
export class StackblitzService implements CodeEditor {
    readonly name = 'Stackblitz';

    open(component: string, sampleId: string, content: FrontEndExample) {
        if (!content.HTML || !content.TypeScript) {
            return;
        }

        let supportFileObject: {[key: string]: string} = {};

        supportFileObject = {
            ...supportFileObject,
            ...compileSupportModule(content.SupportDeclaration),
        };
        supportFileObject = {
            ...supportFileObject,
            ...compileSupportFiles(content.Support),
        };

        console.log(content);

        stackblitz.openProject({
            title: `${component}-${sampleId}`,
            description: `Taiga UI example of the component ${component}`,
            template: 'angular-cli',
            dependencies: DEPS,
            files: {
                'tsconfig.json': tsconfig,
                'angular.json': angularJson,
                'src/index.html': indexHtml,
                'src/main.ts': mainTs,
                'src/polyfills.ts': polyfills,
                'src/styles.less': styles,
                'src/app/app.module.ts': appModuleTs,
                'src/app/taiga-ui.module.ts': taigaUIModuleTs,
                'src/app/app.component.ts': prepareTs(content.TypeScript || ''),
                'src/app/app.component.html': `<tui-root>\n\n${content.HTML}\n</tui-root>`,
                'src/app/app.component.less': prepareLess(content.LESS || ''),
                ...supportFileObject,
            },
            tags: ['Angular', 'Taiga UI', 'Angular components', 'UI Kit'],
        });
    }
}
