import {Rule, SchematicContext, Tree} from '@angular-devkit/schematics';
import {getWorkspace} from '@schematics/angular/utility/workspace';
import {
    ClassDeclaration,
    createProject,
    Expression,
    getMainModule,
    Identifier,
    Node,
    saveActiveProject,
    setActiveProject,
    ts,
} from 'ng-morph';
import {getProject} from '../../utils/get-project';
import {getProjectTargetOptions} from '../../utils/get-project-target-options';
import {Schema} from '../schema';

export function wrapWithTuiRootComponent(options: Schema): Rule {
    return async (tree: Tree, context: SchematicContext) => {
        const workspace = await getWorkspace(tree);
        const project = getProject(options, workspace);
        const buildOptions = getProjectTargetOptions(project, 'build');

        const appTemplatePath = getAppTemplatePath(tree, buildOptions.main as string);

        if (!appTemplatePath) {
            context.logger.error(
                'Could not find the default main template file for this project.',
            );
            context.logger.info(
                'Consider manually wrapping content of your app with tui-root',
            );
            context.logger.info(
                'More information at https://taiga-ui.dev/getting-started',
            );

            return;
        }

        addTuiRootComponent(appTemplatePath, context, tree);
    };
}

function addTuiRootComponent(filePath: string, context: SchematicContext, tree: Tree) {
    const buffer = tree.read(filePath);

    if (!buffer) {
        context.logger.error(
            `Could not read the default template file within the project ${filePath}`,
        );
        context.logger.info(
            'Consider manually wrapping content of your app with tui-root',
        );

        return;
    }

    const htmlContent = buffer.toString();
    const openTag = '<tui-root>' + '\n';
    const closeTag = '\n' + '</tui-root>';

    if (htmlContent.includes(openTag)) {
        return;
    }

    const recorder = tree.beginUpdate(filePath);

    recorder.insertLeft(0, openTag);
    recorder.insertLeft(htmlContent.length, closeTag);
    tree.commitUpdate(recorder);
    context.logger.info(
        `Content of the app was wrapped with tui-root component in ${filePath}`,
    );
}

function getAppTemplatePath(tree: Tree, mainPath: string): string | undefined {
    setActiveProject(createProject(tree, '/', ['**/*.ts', '**/*.json']));

    const mainModule = getMainModule(mainPath);
    const mainInitializer = getInitializer(mainModule, 'NgModule', 'declarations');

    if (!Node.isArrayLiteralExpression(mainInitializer)) {
        return;
    }

    const appIdentifier = mainInitializer.getElements()[0] as Identifier;
    const appComponent = appIdentifier.getDefinitionNodes()[0] as ClassDeclaration;

    const templateInitializer = getInitializer(appComponent, 'Component', 'templateUrl');

    const appComponentPath = appComponent.getSourceFile().getFilePath().split('/');

    const templateUrlPath = `${appComponentPath
        .splice(0, appComponentPath.length - 1)
        .join('/')}/${templateInitializer?.getText().replace(/['"]/g, '')}`;

    saveActiveProject();

    return templateUrlPath;
}

function getInitializer(
    classDeclaration: ClassDeclaration,
    decoratorName: string,
    propertyName: string,
): Expression<ts.Expression> | undefined {
    const decorator = classDeclaration.getDecorator(decoratorName);

    if (!decorator) {
        return;
    }

    const [metadata] = decorator.getArguments();

    if (!Node.isObjectLiteralExpression(metadata)) {
        return;
    }

    const property = metadata.getProperty(propertyName);

    if (!Node.isPropertyAssignment(property)) {
        return;
    }

    return property.getInitializer();
}
