import {ChangeDetectorRef, InjectionToken, Provider} from '@angular/core';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {watchedControllerFactory} from '@taiga-ui/core/providers';
import {TUI_COLOR_OPTIONS_CONTROLLER} from './color-options-controller.token';

export const TUI_COLOR_OPTIONS_WATCHED_CONTROLLER = new InjectionToken(
    'watched color options controller',
);

export const COLOR_OPTIONS_CONTROLLER_PROVIDER: Provider = [
    TuiDestroyService,
    {
        provide: TUI_COLOR_OPTIONS_WATCHED_CONTROLLER,
        deps: [TUI_COLOR_OPTIONS_CONTROLLER, ChangeDetectorRef, TuiDestroyService],
        useFactory: watchedControllerFactory,
    },
];
