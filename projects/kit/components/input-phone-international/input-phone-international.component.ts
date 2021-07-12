import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    forwardRef,
    HostListener,
    Inject,
    Input,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {
    AbstractTuiControl,
    getClipboardDataText,
    setNativeFocused,
    TUI_FOCUSABLE_ITEM_ACCESSOR,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    TuiMapper,
    tuiPure,
    TuiStringHandler,
} from '@taiga-ui/cdk';
import {
    TUI_ICONS_PATH,
    TUI_NON_DIGITS_REGEXP,
    TuiPrimitiveTextfieldComponent,
} from '@taiga-ui/core';
import {TuiCountryIsoCode} from '@taiga-ui/i18n';
import {TUI_ARROW} from '@taiga-ui/kit/components/arrow';
import {TuiInputPhoneComponent} from '@taiga-ui/kit/components/input-phone';
import {FIXED_DROPDOWN_CONTROLLER_PROVIDER} from '@taiga-ui/kit/providers';
import {TUI_COUNTRIES} from '@taiga-ui/kit/tokens';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {Observable} from 'rxjs';
import {COUNTRIES_MASKS} from './const/countries';

const MASK_AFTER_CODE_REGEXP = /\([\#]+\)|[#\- ]/g;

// @dynamic
@Component({
    selector: 'tui-input-phone-international',
    templateUrl: './input-phone-international.template.html',
    styleUrls: ['./input-phone-international.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_FOCUSABLE_ITEM_ACCESSOR,
            useExisting: forwardRef(() => TuiInputPhoneInternationalComponent),
        },
        FIXED_DROPDOWN_CONTROLLER_PROVIDER,
    ],
})
export class TuiInputPhoneInternationalComponent
    extends AbstractTuiControl<string>
    implements TuiFocusableElementAccessor {
    @Input()
    @tuiDefaultProp()
    countryIsoCode: TuiCountryIsoCode = TuiCountryIsoCode.RU;

    @Input()
    countries: ReadonlyArray<TuiCountryIsoCode> = [];

    open = false;

    readonly isoToCountryCodeMapper: TuiMapper<TuiCountryIsoCode, string> = item =>
        this.isoToCountryCode(item);

    readonly arrow: PolymorpheusContent = TUI_ARROW;

    private staticPath: string | null = null;

    @ViewChild(TuiInputPhoneComponent)
    private readonly inputPhoneComponent?: TuiInputPhoneComponent;

    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly primitiveTextfield?: TuiPrimitiveTextfieldComponent;

    @HostListener('paste.capture.prevent.stop', ['$event'])
    @HostListener('drop.capture.prevent.stop', ['$event'])
    onPaste(event: ClipboardEvent | DragEvent) {
        const value = this.extractValue(event);
        const country = this.countries.find(countryIsoCode =>
            value.startsWith(this.isoToCountryCode(countryIsoCode)),
        );

        if (country) {
            this.countryIsoCode = country;
            this.updateValue('+' + value.replace(TUI_NON_DIGITS_REGEXP, ''));
        }
    }

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(TUI_ICONS_PATH)
        iconsPath: TuiStringHandler<string>,
        @Inject(TUI_COUNTRIES)
        readonly countriesNames$: Observable<Record<TuiCountryIsoCode, string>>,
    ) {
        super(control, changeDetectorRef);

        this.staticPath = iconsPath('tuiIcon').replace('tuiIcon.svg#tuiIcon', '');
    }

    get nativeFocusableElement(): HTMLElement | null {
        return this.inputPhoneComponent && !this.computedDisabled
            ? this.inputPhoneComponent.nativeFocusableElement
            : null;
    }

    get focused(): boolean {
        return (
            (!!this.primitiveTextfield && this.primitiveTextfield.focused) ||
            (!!this.inputPhoneComponent && this.inputPhoneComponent.focused)
        );
    }

    get inputPhoneCountryCode(): string {
        return this.isoToCountryCode(this.countryIsoCode);
    }

    get phoneMaskAfterCountryCode(): string {
        const countryCode = this.isoToCountryCode(this.countryIsoCode);

        return this.calculateMaskAfterCountryCode(
            COUNTRIES_MASKS[this.countryIsoCode],
            countryCode,
        );
    }

    get countryFlagPath(): string {
        return this.getFlagPath(this.countryIsoCode);
    }

    getFlagPath(code: TuiCountryIsoCode): string {
        return `${this.staticPath}${code}.png`;
    }

    onItemClick(isoCode: TuiCountryIsoCode) {
        this.open = false;
        this.countryIsoCode = isoCode;
        // recalculates mask inside inputPhone to prevent isoCode conflict
        this.changeDetectorRef.detectChanges();

        const maxLength = this.getMaxAllowedLength(isoCode);

        if (this.value.length > maxLength) {
            this.updateValue(this.value.slice(0, maxLength));
        }

        if (this.nativeFocusableElement) {
            setNativeFocused(this.nativeFocusableElement);
        }
    }

    setDisabledState() {
        super.setDisabledState();
        this.close();
    }

    isoToCountryCode(isoCode: TuiCountryIsoCode): string {
        return COUNTRIES_MASKS[isoCode].replace(MASK_AFTER_CODE_REGEXP, '');
    }

    protected getFallbackValue(): string {
        return '';
    }

    private close() {
        this.open = false;
    }

    @tuiPure
    private calculateMaskAfterCountryCode(mask: string, countryCode: string): string {
        return mask.replace(countryCode, '').trim();
    }

    private getMaxAllowedLength(isoCode: TuiCountryIsoCode): number {
        return COUNTRIES_MASKS[isoCode].replace(/[()\- ]/g, '').length;
    }

    private extractValue(event: DragEvent | ClipboardEvent): string {
        return event instanceof DragEvent
            ? event.dataTransfer?.getData('text/plain') || ''
            : getClipboardDataText(event);
    }
}
