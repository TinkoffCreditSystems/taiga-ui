import {HostTree} from '@angular-devkit/schematics';
import {SchematicTestRunner, UnitTestTree} from '@angular-devkit/schematics/testing';

// We can emulate filesystem with ng-morph
import {
    createProject,
    createSourceFile,
    resetActiveProject,
    saveActiveProject,
    setActiveProject,
} from 'ng-morph';
import {join} from 'path';
import {
    DOMPURIFY_VERSION,
    NG_DOMPURIFY_VERSION,
    TAIGA_VERSION,
} from '../constants/versions';
import {Schema} from '../schema';

const collectionPath = join(__dirname, '../../collection.json');

describe('ng-add', () => {
    let host: UnitTestTree;
    let runner: SchematicTestRunner;

    beforeEach(() => {
        host = new UnitTestTree(new HostTree());
        runner = new SchematicTestRunner('schematics', collectionPath);

        setActiveProject(createProject(host));

        createSourceFile('package.json', '{"dependencies": {}}');
        createAngularJson();
        createMainFiles();
        saveActiveProject();
    });

    it('should add main modules in package.json', async () => {
        const options: Schema = {
            addSanitizer: false,
            addDialogsModule: false,
            addNotificationsModule: false,
            addons: [],
            project: '',
        };

        const tree = await runner.runSchematicAsync('ng-add', options, host).toPromise();

        expect(tree.readContent('package.json')).toEqual(
            `{
  "dependencies": {
    "@taiga-ui/cdk": "${TAIGA_VERSION}",
    "@taiga-ui/core": "${TAIGA_VERSION}",
    "@taiga-ui/icons": "${TAIGA_VERSION}",
    "@taiga-ui/kit": "${TAIGA_VERSION}"
  }
}`,
        );
    });

    it('should add additional modules in package.json', async () => {
        const options: Schema = {
            addSanitizer: true,
            addDialogsModule: false,
            addNotificationsModule: false,
            addons: ['addon-doc', 'addon-mobile'],
            project: '',
        };

        const tree = await runner.runSchematicAsync('ng-add', options, host).toPromise();

        expect(tree.readContent('package.json')).toEqual(
            `{
  "dependencies": {
    "@taiga-ui/addon-doc": "${TAIGA_VERSION}",
    "@taiga-ui/addon-mobile": "${TAIGA_VERSION}",
    "@taiga-ui/cdk": "${TAIGA_VERSION}",
    "@taiga-ui/core": "${TAIGA_VERSION}",
    "@taiga-ui/icons": "${TAIGA_VERSION}",
    "@taiga-ui/kit": "${TAIGA_VERSION}",
    "@tinkoff/ng-dompurify": "${NG_DOMPURIFY_VERSION}",
    "dompurify": "${DOMPURIFY_VERSION}"
  }
}`,
        );
    });

    it('should add assets and styles in angular.json', async () => {
        const tree = await runner
            .runSchematicAsync('ng-add-setup-project', {}, host)
            .toPromise();

        expect(tree.readContent('angular.json')).toEqual(`
{
  "version": 1,
  "defaultProject": "demo", 
  "projects": {
    "demo": {
        "architect": {
          "build": {
            "options": {
              "main": "test/main.ts",
            "styles": [
              "node_modules/@taiga-ui/core/styles/taiga-ui-global.less",
              "node_modules/@taiga-ui/core/styles/taiga-ui-theme.less"
            ],
            "assets": [
              {
                "glob": "**/*",
                "input": "node_modules/@taiga-ui/icons/src",
                "output": "assets/taiga-ui/icons"
              }
            ]
            }
          }
        }
    }
  }
}`);
    });

    it('Should add Taiga-ui modules and providers to main module', async () => {
        const options: Schema = {
            addSanitizer: true,
            addDialogsModule: true,
            addNotificationsModule: true,
            addons: [],
            project: '',
        };
        const tree = await runner
            .runSchematicAsync('ng-add-setup-project', options, host)
            .toPromise();

        expect(tree.readContent('test/app/app.module.ts')).toEqual(
            `import { NgDompurifySanitizer } from "@tinkoff/ng-dompurify";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { TuiRootModule, TuiDialogModule, TuiNotificationsModule, TUI_SANITIZER } from "@taiga-ui/core";
import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

@NgModule({declarations: [AppComponent],
        imports: [TuiRootModule, BrowserAnimationsModule, TuiDialogModule, TuiNotificationsModule],
        providers: [{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}]
    })
export class AppModule {}
`,
        );
    });

    it('Should wrap main template with tui-root', async () => {
        const tree = await runner
            .runSchematicAsync('ng-add-setup-project', {}, host)
            .toPromise();

        expect(tree.readContent('test/app/app.template.html')).toEqual(`<tui-root>
<app></app>
</tui-root>`);
    });

    afterEach(() => {
        // clear it up
        resetActiveProject();
    });
});

function createAngularJson() {
    createSourceFile(
        'angular.json',
        `
{
  "version": 1,
  "defaultProject": "demo", 
  "projects": {
    "demo": {
        "architect": {
          "build": {
            "options": {
              "main": "test/main.ts",
            }
          }
        }
    }
  }
}`,
    );
}

function createMainFiles() {
    createSourceFile(
        'test/main.ts',
        `import {platformBrowserDynamic} from '@angular/platform-browser-dynamic';
  import {AppModule} from './app/app.module';
  import {environment} from './environments/environment';
  
  if (environment.production) {
    enableProdMode();
  }
  
  platformBrowserDynamic()
    .bootstrapModule(AppModule)
    .catch(err => console.log(err));
  `,
    );

    createSourceFile(
        'test/app/app.module.ts',
        `import {NgModule} from '@angular/core';
import {AppComponent} from './app.component';

@NgModule({declarations: [AppComponent]})
export class AppModule {}
`,
    );

    createSourceFile(
        'test/app/app.component.ts',
        `import {Component} from '@angular/core';
import {AppComponent} from './app.component';

@Component({templateUrl: './app.template.html'})
export class AppComponent {}`,
    );

    createSourceFile('test/app/app.template.html', `<app></app>`);
}
