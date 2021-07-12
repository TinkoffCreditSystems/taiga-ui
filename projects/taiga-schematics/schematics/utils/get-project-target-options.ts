import {JsonArray, JsonObject, workspaces} from '@angular-devkit/core';
import {SchematicsException} from '@angular-devkit/schematics';

export function getProjectTargetOptions(
    project: workspaces.ProjectDefinition,
    buildTarget: string,
): Record<string, string | number | boolean | JsonArray | JsonObject | undefined | null> {
    const buildTargetObject = project.targets?.get(buildTarget);

    if (buildTargetObject && buildTargetObject.options) {
        return buildTargetObject.options;
    }

    throw new SchematicsException(
        `Cannot determine project target configuration for: ${buildTarget}.`,
    );
}
