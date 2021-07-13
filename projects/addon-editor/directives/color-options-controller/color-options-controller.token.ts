import {InjectionToken} from '@angular/core';
import {TuiColorOptionsControllerDirective} from './color-options-controller.directive';

export const TUI_COLOR_OPTIONS_CONTROLLER = new InjectionToken<TuiColorOptionsControllerDirective>(
    'Controls configuration of color options',
    {
        factory: () => new TuiColorOptionsControllerDirective(),
    },
);
