import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    ContentChild,
    EventEmitter,
    forwardRef,
    Inject,
    Input,
    Optional,
    Output,
    Self,
    TemplateRef,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    AbstractTuiControl,
    getClipboardDataText,
    isNativeFocused,
    setNativeFocused,
    TUI_FOCUSABLE_ITEM_ACCESSOR,
    TuiActiveZoneDirective,
    TuiContextWithImplicit,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    TuiInputModeT,
    tuiRequiredSetter,
} from '@taiga-ui/cdk';
import {
    formatPhone,
    TUI_DATA_LIST_HOST,
    TUI_TEXTFIELD_CLEANER,
    TuiDataListDirective,
    TuiDataListHost,
    TuiHostedDropdownComponent,
    TuiPrimitiveTextfieldComponent,
    TuiTextfieldCleanerDirective,
    TuiTextMaskOptions,
} from '@taiga-ui/core';
import {Observable} from 'rxjs';
import {INPUT_PHONE_PROVIDERS, SELECTION_STREAM} from './input-phone.providers';

const NON_PLUS_AND_DIGITS_REGEX = /[ \-_\(\)]/g;

// @dynamic
@Component({
    selector: 'tui-input-phone',
    templateUrl: './input-phone.template.html',
    styleUrls: ['./input-phone.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_FOCUSABLE_ITEM_ACCESSOR,
            useExisting: forwardRef(() => TuiInputPhoneComponent),
        },
        {
            provide: TUI_DATA_LIST_HOST,
            useExisting: forwardRef(() => TuiInputPhoneComponent),
        },
        INPUT_PHONE_PROVIDERS,
    ],
})
export class TuiInputPhoneComponent
    extends AbstractTuiControl<string>
    implements TuiFocusableElementAccessor, TuiDataListHost<string> {
    @Input('countryCode')
    @tuiRequiredSetter()
    set countryCodeSetter(countryCode: string) {
        this.updateValueWithNewContryCode(countryCode);
        this.countryCode = countryCode;
    }

    @Input()
    @tuiDefaultProp()
    phoneMaskAfterCountryCode = '(###) ###-##-##';

    @Input()
    @tuiDefaultProp()
    allowText = false;

    @Input()
    @tuiDefaultProp()
    search = '';

    @Output()
    readonly searchChange = new EventEmitter<string>();

    readonly textMaskOptions: TuiTextMaskOptions = {
        mask: value =>
            this.allowText && !this.value && isText(value) && value !== '+'
                ? false
                : [
                      ...this.countryCode.split(''),
                      ' ',
                      ...this.phoneMaskAfterCountryCode
                          .replace(/[^#\- \(\)]+/g, '')
                          .split('')
                          .map(item => (item === '#' ? /\d/ : item)),
                  ],
        pipe: value => {
            if (this.allowText) {
                return value;
            }

            return value === '' && this.focused && !this.readOnly
                ? `${this.countryCode} `
                : value.replace(/-$/, '');
        },
        guide: false,
    };

    countryCode = '+7';

    open = false;

    @ContentChild(TuiDataListDirective, {read: TemplateRef})
    readonly datalist?: TemplateRef<TuiContextWithImplicit<TuiActiveZoneDirective>>;

    @ViewChild(TuiHostedDropdownComponent)
    private readonly dropdown?: TuiHostedDropdownComponent;

    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly textfield?: TuiPrimitiveTextfieldComponent;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(SELECTION_STREAM)
        selection$: Observable<unknown>,
        @Inject(TUI_TEXTFIELD_CLEANER)
        private readonly textfieldCleaner: TuiTextfieldCleanerDirective,
    ) {
        super(control, changeDetectorRef);

        selection$.subscribe(() => {
            this.setCaretPosition();
        });
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return !this.textfield || this.computedDisabled
            ? null
            : this.textfield.nativeFocusableElement;
    }

    get focused(): boolean {
        return (
            isNativeFocused(this.nativeFocusableElement) ||
            (!!this.dropdown && this.dropdown.focused)
        );
    }

    get nativeValue(): string {
        return this.value
            ? formatPhone(this.value, this.countryCode, this.phoneMaskAfterCountryCode)
            : this.search || '';
    }

    get inputMode(): TuiInputModeT {
        return this.allowText ? 'text' : 'numeric';
    }

    get canOpen(): boolean {
        return !this.computedDisabled && !this.readOnly && !!this.datalist;
    }

    get canClean(): boolean {
        return this.nativeValue !== this.countryCode && this.textfieldCleaner.cleaner;
    }

    onHovered(hovered: boolean) {
        this.updateHovered(hovered);
    }

    onDrop(event: DragEvent) {
        if (!event.dataTransfer) {
            return;
        }

        this.setValueWithoutPrefix(event.dataTransfer.getData('text'));
        event.preventDefault();
    }

    onPaste(event: ClipboardEvent) {
        this.setValueWithoutPrefix(getClipboardDataText(event));
    }

    onActiveZone(active: boolean) {
        this.updateFocused(active);

        if (active && !this.nativeValue && !this.readOnly && !this.allowText) {
            this.updateSearch(this.countryCode);

            return;
        }

        if (
            this.nativeValue === this.countryCode ||
            (this.search !== null &&
                isNaN(parseInt(this.search.replace(NON_PLUS_AND_DIGITS_REGEX, ''), 10)))
        ) {
            this.updateSearch('');
        }
    }

    onBackspace(event: Event & {target: HTMLInputElement}) {
        if (
            (event.target.selectionStart || 0) <= this.nonRemovableLength &&
            event.target.selectionStart === event.target.selectionEnd
        ) {
            event.preventDefault();
        }
    }

    onValueChange(value: string) {
        value = value === '' ? this.countryCode : value;

        const parsed = isText(value)
            ? value
            : value.replace(NON_PLUS_AND_DIGITS_REGEX, '');

        this.updateSearch(parsed);
        this.updateValue(parsed === this.countryCode || isText(parsed) ? '' : parsed);
        this.open = true;
    }

    handleOption(item: string) {
        this.focusInput();
        this.updateValue(item);
        this.updateSearch('');
        this.open = false;
    }

    setDisabledState() {
        super.setDisabledState();
        this.open = false;
    }

    writeValue(value: string | null) {
        super.writeValue(value);
        this.updateSearch('');
    }

    protected getFallbackValue(): string {
        return '';
    }

    private get caretIsInForbiddenArea(): boolean {
        const {nativeFocusableElement} = this;

        if (!nativeFocusableElement) {
            return false;
        }

        const {selectionStart, selectionEnd} = nativeFocusableElement;

        return (
            isNativeFocused(nativeFocusableElement) &&
            selectionStart !== null &&
            selectionStart < this.nonRemovableLength &&
            selectionStart === selectionEnd
        );
    }

    private get nonRemovableLength(): number {
        return this.isTextValue ? 0 : this.countryCode.length + 1;
    }

    private get maxPhoneLength(): number {
        return (
            this.countryCode.length +
            this.phoneMaskAfterCountryCode.replace(/[^#]+/g, '').length
        );
    }

    private get isTextValue(): boolean {
        return !!this.search && isText(this.search);
    }

    private setCaretPosition() {
        if (this.caretIsInForbiddenArea && !!this.nativeFocusableElement) {
            this.nativeFocusableElement.setSelectionRange(
                this.nonRemovableLength,
                this.nonRemovableLength,
            );
        }
    }

    private setValueWithoutPrefix(value: string) {
        if (this.readOnly) {
            return;
        }

        this.open = true;
        this.updateValue(this.cleanValue(value));
        this.updateSearch(
            this.allowText && isText(value)
                ? value
                : value.replace(NON_PLUS_AND_DIGITS_REGEX, ''),
        );
    }

    private cleanValue(value: string): string {
        const reg: RegExp =
            this.countryCode === '+7'
                ? /^7|^8/
                : new RegExp(this.countryCode.substring(1));
        const oldValueExist =
            this.value.length > this.countryCode.length &&
            this.value.length < this.maxPhoneLength;
        const newValueLength = value.replace(NON_PLUS_AND_DIGITS_REGEX, '').length;
        const cleanNewValue = value.replace(/[^0-9]+/g, '');
        const selectionLength = getSelection()!.toString().length;

        if (oldValueExist && selectionLength === 0) {
            return `${this.value}${cleanNewValue}`.slice(0, this.maxPhoneLength);
        }

        if (newValueLength < this.maxPhoneLength - 1) {
            return `${this.countryCode}${cleanNewValue}`.slice(0, this.maxPhoneLength);
        }

        return `${this.countryCode}${cleanNewValue.replace(reg, '')}`.slice(
            0,
            this.maxPhoneLength,
        );
    }

    private focusInput() {
        if (this.nativeFocusableElement) {
            setNativeFocused(this.nativeFocusableElement, true, true);
        }
    }

    private updateSearch(search: string) {
        if (this.search === search) {
            return;
        }

        this.search = search;
        this.searchChange.emit(search);
    }

    private updateValueWithNewContryCode(newCountryCode: string) {
        if (!this.isTextValue) {
            this.updateValue(this.value.replace(this.countryCode, newCountryCode));
        }
    }
}

function isText(value: string): boolean {
    return isNaN(parseInt(value.replace(NON_PLUS_AND_DIGITS_REGEX, ''), 10));
}
