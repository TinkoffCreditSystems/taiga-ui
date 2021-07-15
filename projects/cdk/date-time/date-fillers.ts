import {inject, InjectionToken} from '@angular/core';
import {TuiDateMode} from '@taiga-ui/cdk/types';
import {RANGE_SEPARATOR_CHAR} from './date-time';

/**
 * TODO: think about yyyy.mm.dd format
 * TODO: Remove return type string in 3.0
 * @deprecated return type will be narrowed down to just TuiDateMode (without string) in next major version
 */
export const TUI_DATE_FILLER = new InjectionToken<TuiDateMode | string>(
    'date filler for Taiga UI',
    {
        factory: () => `dd.mm.yyyy`,
    },
);

export const TUI_DATE_RANGE_FILLER = new InjectionToken<string>(
    'date range filler for Taiga UI',
    {
        factory: () => {
            const dateFiller = inject(TUI_DATE_FILLER);

            return `${dateFiller}${RANGE_SEPARATOR_CHAR}${dateFiller}`;
        },
    },
);
