import {
    ChangeDetectionStrategy,
    ChangeDetectorRef,
    Component,
    HostListener,
    Inject,
    Input,
    Optional,
    Self,
    ViewChild,
} from '@angular/core';
import {NgControl} from '@angular/forms';
import {DomSanitizer, SafeStyle} from '@angular/platform-browser';
import {
    COLOR_OPTIONS_CONTROLLER_PROVIDER,
    TUI_COLOR_OPTIONS_WATCHED_CONTROLLER,
    TuiColorOptionsControllerDirective,
} from '@taiga-ui/addon-editor/directives/color-options-controller';
import {getGradientData, parseGradient, toGradient} from '@taiga-ui/addon-editor/utils';
import {
    AbstractTuiControl,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    TuiNativeFocusableElement,
    tuiPure,
} from '@taiga-ui/cdk';
import {
    TUI_DROPDOWN_CONTROLLER,
    TuiDropdownControllerDirective,
    TuiHostedDropdownComponent,
    TuiPrimitiveTextfieldComponent,
} from '@taiga-ui/core';

export function longDropdownControllerFactory(
    directive: TuiDropdownControllerDirective | null,
): TuiDropdownControllerDirective {
    directive = directive || new TuiDropdownControllerDirective();
    directive.maxHeight = 600;

    return directive;
}

@Component({
    selector: 'tui-input-color',
    templateUrl: './input-color.template.html',
    styleUrls: ['./input-color.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        COLOR_OPTIONS_CONTROLLER_PROVIDER,
        {
            provide: TUI_DROPDOWN_CONTROLLER,
            deps: [[new Optional(), TuiDropdownControllerDirective]],
            useFactory: longDropdownControllerFactory,
        },
    ],
})
export class TuiInputColorComponent
    extends AbstractTuiControl<string>
    implements TuiFocusableElementAccessor {
    @Input()
    @tuiDefaultProp()
    colors: ReadonlyMap<string, string> = new Map<string, string>();

    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly textfield?: TuiPrimitiveTextfieldComponent;

    @ViewChild(TuiHostedDropdownComponent)
    private readonly dropdown?: TuiHostedDropdownComponent;

    open = false;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(DomSanitizer) private readonly domSanitizer: DomSanitizer,
        @Inject(TUI_COLOR_OPTIONS_WATCHED_CONTROLLER)
        readonly controller: TuiColorOptionsControllerDirective,
    ) {
        super(control, changeDetectorRef);
    }

    get nativeFocusableElement(): TuiNativeFocusableElement | null {
        return this.computedDisabled || !this.textfield
            ? null
            : this.textfield.nativeFocusableElement;
    }

    get focused(): boolean {
        return !!this.dropdown && this.dropdown.focused;
    }

    get background(): SafeStyle {
        return this.sanitize(this.value, this.domSanitizer);
    }

    @HostListener('click')
    onClick() {
        this.open = !this.open;
    }

    onValueChange(textValue: string) {
        this.updateValue(textValue);
    }

    onFocused(focused: boolean) {
        this.updateFocused(focused);
    }

    onHovered(hovered: boolean) {
        this.updateHovered(hovered);
    }

    onPressed(pressed: boolean) {
        this.updatePressed(pressed);
    }

    protected getFallbackValue(): string {
        return '#000000';
    }

    @tuiPure
    private sanitize(value: string, domSanitizer: DomSanitizer): SafeStyle | string {
        return value.startsWith('linear-gradient(')
            ? domSanitizer.bypassSecurityTrustStyle(
                  toGradient(parseGradient(getGradientData(value))),
              )
            : value;
    }
}
