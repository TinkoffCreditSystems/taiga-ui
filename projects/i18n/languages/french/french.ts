import {Language} from '@taiga-ui/i18n/interfaces';
import {TUI_FRENCH_LANGUAGE_ADDON_COMMERCE} from './addon-commerce';
import {TUI_FRENCH_LANGUAGE_ADDON_TABLE} from './addon-table';
import {TUI_FRENCH_LANGUAGE_CORE} from './core';
import {TUI_FRENCH_LANGUAGE_KIT} from './kit';

export const TUI_FRENCH_LANGUAGE: Language = {
    ...TUI_FRENCH_LANGUAGE_CORE,
    ...TUI_FRENCH_LANGUAGE_KIT,
    ...TUI_FRENCH_LANGUAGE_ADDON_TABLE,
    ...TUI_FRENCH_LANGUAGE_ADDON_COMMERCE,
};
