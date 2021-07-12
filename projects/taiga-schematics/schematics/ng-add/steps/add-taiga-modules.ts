import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';

import {getWorkspace} from '@schematics/angular/utility/workspace';
import {
    addImports,
    addImportToNgModule,
    addProviderToNgModule,
    ClassDeclaration,
    createProject,
    editImports,
    getImports,
    getMainModule,
    saveActiveProject,
    setActiveProject,
} from 'ng-morph';
import {getProject} from '../../utils/get-project';
import {getProjectTargetOptions} from '../../utils/get-project-target-options';
import {
    DIALOG_MODULES,
    MAIN_MODULES,
    NOTIFICATION_MODULES,
    SANITIZER_MODULES,
} from '../constants/modules';
import {Schema} from '../schema';

export function addTaigaModules(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext) => {
        const workspace = await getWorkspace(tree);
        const project = getProject(options, workspace);
        const buildOptions = getProjectTargetOptions(project, 'build');

        setActiveProject(createProject(tree, '/', ['**/*.ts', '**/*.json']));

        const mainModule = getMainModule(buildOptions.main as string);

        addTuiModules(mainModule, options, context);
        addTuiProviders(mainModule, options);

        saveActiveProject();
    };
}

function addTuiModules(
    mainModule: ClassDeclaration,
    options: Schema,
    context: SchematicContext,
) {
    const modules = [
        ...MAIN_MODULES,
        ...(options.addDialogsModule ? DIALOG_MODULES : []),
        ...(options.addNotificationsModule ? NOTIFICATION_MODULES : []),
    ];

    const mainModulePath = mainModule.getSourceFile().getFilePath();

    modules.forEach(module => {
        addImportToNgModule(mainModule, module.name, {unique: true});
        addUniqueImport(mainModulePath, module.name, module.packageName);
    });

    context.logger.info(
        `${modules.map(module => module.name)} was added to ${mainModulePath}`,
    );
}

function addTuiProviders(mainModule: ClassDeclaration, options: Schema) {
    if (!options.addSanitizer) {
        return;
    }

    addProviderToNgModule(
        mainModule,
        '{provide: TUI_SANITIZER, useClass: NgDompurifySanitizer}',
        {unique: true},
    );

    SANITIZER_MODULES.forEach(module => {
        addUniqueImport(
            mainModule.getSourceFile().getFilePath(),
            module.name,
            module.packageName,
        );
    });
}

function addUniqueImport(filePath: string, namedImport: string, packageName: string) {
    const existingNamedImport = getImports(filePath, {
        namedImports: namedImport,
        moduleSpecifier: packageName,
    });

    if (existingNamedImport.length) {
        return;
    }

    const existingDeclaration = getImports(filePath, {
        moduleSpecifier: packageName,
    });

    if (existingDeclaration.length) {
        const modules = existingDeclaration[0]
            .getNamedImports()
            .map(namedImport => namedImport.getText());

        editImports(existingDeclaration, () => ({
            namedImports: [...modules, namedImport],
        }));

        return;
    }

    addImports(filePath, {
        moduleSpecifier: packageName,
        namedImports: [namedImport],
    });
}
