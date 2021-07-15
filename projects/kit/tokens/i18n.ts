import {InjectionToken} from '@angular/core';
import {TuiDateMode} from '@taiga-ui/cdk';
import {extractI18n, TuiCountryIsoCode} from '@taiga-ui/i18n';
import {Observable} from 'rxjs';

export const TUI_CANCEL_WORD = new InjectionToken(`i18n 'cancel' word`, {
    factory: extractI18n('cancel'),
});

export const TUI_DONE_WORD = new InjectionToken(`i18n 'done' word`, {
    factory: extractI18n('done'),
});

export const TUI_MORE_WORD = new InjectionToken(`i18n 'more' word`, {
    factory: extractI18n('more'),
});

export const TUI_OTHER_DATE_TEXT = new InjectionToken(`i18n 'Other date' text`, {
    factory: extractI18n('otherDate'),
});

export const TUI_CHOOSE_DAY_OR_RANGE_TEXTS = new InjectionToken(
    `choose day or range i18n texts`,
    {
        factory: extractI18n('mobileCalendarTexts'),
    },
);

export const TUI_FROM_TO_TEXTS = new InjectionToken(`from and to i18n texts`, {
    factory: extractI18n('range'),
});

export const TUI_PLUS_MINUS_TEXTS = new InjectionToken(`plus and minus i18n texts`, {
    factory: extractI18n('countTexts'),
});

export const TUI_TIME_TEXTS = new InjectionToken(`time i18n texts`, {
    factory: extractI18n('time'),
});

export const TUI_DATE_TEXTS = new InjectionToken<Observable<Record<TuiDateMode, string>>>(
    'date format i18n texts',
    {
        factory: extractI18n('dateTexts'),
    },
);

export const TUI_DIGITAL_INFORMATION_UNITS = new InjectionToken(
    `short bytes, kilobytes and megabytes i18n texts`,
    {
        factory: extractI18n('digitalInformationUnits'),
    },
);

export const TUI_COPY_TEXTS = new InjectionToken('copy i18n texts', {
    factory: extractI18n('copyTexts'),
});

export const TUI_PASSWORD_TEXTS = new InjectionToken('password i18n texts', {
    factory: extractI18n('passwordTexts'),
});

export const TUI_CALENDAR_MONTHS = new InjectionToken('short calendar months i18n', {
    factory: extractI18n('shortCalendarMonths'),
});

export const TUI_FILE_TEXTS = new InjectionToken('file i18n texts', {
    factory: extractI18n('fileTexts'),
});

export const TUI_PAGINATION_TEXTS = new InjectionToken('pagination i18n texts', {
    factory: extractI18n('paginationTexts'),
});

export const TUI_INPUT_FILE_TEXTS = new InjectionToken('tui-input-file i18n texts', {
    factory: extractI18n('inputFileTexts'),
});

export const TUI_COUNTRIES: InjectionToken<
    Observable<Record<TuiCountryIsoCode, string>>
> = new InjectionToken('Localized countries names', {
    factory: extractI18n('countries'),
});
