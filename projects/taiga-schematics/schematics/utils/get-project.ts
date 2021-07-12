import {workspaces} from '@angular-devkit/core';
import {SchematicsException} from '@angular-devkit/schematics';
import {Schema} from '../ng-add/schema';

export function getProject(
    options: Schema,
    workspace: workspaces.WorkspaceDefinition,
): workspaces.ProjectDefinition {
    const projectName =
        options.project || workspace.extensions.defaultProject!.toString();
    const project = workspace.projects.get(projectName);

    if (!project) {
        throw new SchematicsException(
            `Unable to find project '${projectName}' in the workspace`,
        );
    }

    return project;
}
