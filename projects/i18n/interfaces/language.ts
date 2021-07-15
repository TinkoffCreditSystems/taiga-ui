import {TuiCountryIsoCode} from '@taiga-ui/i18n/enums';

// prettier-ignore
type MONTHS_ARRAY = [string, string, string, string, string, string, string, string, string, string, string, string];

export interface LanguageCore {
    months: MONTHS_ARRAY;
    close: string;
    nothingFoundMessage: string;
    defaultErrorMessage: string;
    /**
     * [@string word 'previous', @string word 'next']
     */
    spinTexts: [string, string];
    /**
     * Tuple with short days of week
     * starts with Mon (Monday)
     */
    shortWeekDays: [string, string, string, string, string, string, string];
    countries: Record<TuiCountryIsoCode, string>;
}

export interface LanguageKit {
    cancel: string;
    done: string;
    more: string;
    otherDate: string;
    /**
     * [@string 'choose day', @param 'choose range']
     */
    mobileCalendarTexts: [string, string];
    /**
     * [@string 'from', @param 'to']
     */
    range: [string, string];
    /**
     * [@string 'plus', @param 'minus']
     */
    countTexts: [string, string];
    time: {
        'HH:MM': string;
        'HH:MM:SS': string;
        'HH:MM:SS.MSS': string;
    };
    dateTexts: {
        'dd.mm.yyyy': string;
    };
    /**
     * short bytes, kilobytes and megabytes
     * [@string 'B', @param 'KB', @param 'MB']
     */
    digitalInformationUnits: [string, string, string];
    /**
     * [@string 'Show password', @param 'Hide password']
     */
    passwordTexts: [string, string];
    /**
     * [@string 'Copy', @param 'Copied']
     */
    copyTexts: [string, string];
    shortCalendarMonths: MONTHS_ARRAY;
    /**
     * [@string 'Previous page', @param 'Next page']
     */
    pagination: [string, string];
    fileTexts: {
        loadingError: string;
        preview: string;
        remove: string;
    };
    inputFileTexts: {
        defaultLabelSingle: string;
        defaultLabelMultiple: string;
        defaultLinkSingle: string;
        defaultLinkMultiple: string;
        maxSizeRejectionReason: string;
        formatRejectionReason: string;
        drop: string;
        dropMultiple: string;
    };
}

export interface LanguageCommerce {
    /**
     * Short and full card number text
     * [@string 'Number', @string 'Card number']
     */
    cardNumber: [string, string];
    /**
     * Short and full expiry text
     * [@string 'Expiry', @string 'Expiry date']
     */
    cardExpiry: [string, string];
}

export interface LanguageTable {
    /**
     * 'Show/hide' button title
     */
    showHideText: string;
    paginationTexts: {
        pages: string;
        linesPerPage: string;
        of: string;
    };
}

// TODO: fix it after Editor 1.0
export type LanguageEditor = Record<string, any>;

export interface Language
    extends LanguageCore,
        LanguageKit,
        LanguageCommerce,
        LanguageTable {}
