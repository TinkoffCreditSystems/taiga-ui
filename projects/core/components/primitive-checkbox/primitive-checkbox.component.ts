import {
    ChangeDetectionStrategy,
    Component,
    HostBinding,
    Inject,
    Input,
} from '@angular/core';
import {isPresent, TuiContextWithImplicit, tuiDefaultProp, tuiPure} from '@taiga-ui/cdk';
import {TuiSizeL} from '@taiga-ui/core/types';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {CheckboxOptions, TUI_CHECKBOX_OPTIONS} from './checkbox-options';

// @dynamic
@Component({
    selector: 'tui-primitive-checkbox',
    templateUrl: './primitive-checkbox.template.html',
    styleUrls: ['./primitive-checkbox.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiPrimitiveCheckboxComponent {
    icon: PolymorpheusContent<TuiContextWithImplicit<TuiSizeL>> = this.options.icons
        .checked;

    @Input()
    @HostBinding('attr.data-tui-host-size')
    @tuiDefaultProp()
    size: TuiSizeL = this.options.size;

    @Input()
    @tuiDefaultProp()
    disabled = false;

    @Input()
    @tuiDefaultProp()
    focused = false;

    @Input()
    @tuiDefaultProp()
    hovered = false;

    @Input()
    @tuiDefaultProp()
    pressed = false;

    @Input()
    @tuiDefaultProp()
    invalid = false;

    @Input()
    @tuiDefaultProp()
    color: string | null = null;

    @Input('value')
    @tuiDefaultProp()
    set valueSetter(value: boolean | null) {
        if (value !== false) {
            this.setCurrentIcon(value);
        }

        this.value = value;
    }

    value: boolean | null = false;

    constructor(
        @Inject(TUI_CHECKBOX_OPTIONS) private readonly options: CheckboxOptions,
    ) {}

    get appearance(): string {
        switch (this.value) {
            case false:
                return this.options.appearances.unchecked;
            case true:
                return this.options.appearances.checked;
            default:
                return this.options.appearances.indeterminate;
        }
    }

    get empty(): boolean {
        return this.value === false;
    }

    get context(): TuiContextWithImplicit<TuiSizeL> {
        return this.getContext(this.size);
    }

    get backgroundColor(): string | null {
        if (this.value !== false && isPresent(this.color)) {
            return this.color;
        }

        return null;
    }

    @tuiPure
    private getContext($implicit: TuiSizeL): TuiContextWithImplicit<TuiSizeL> {
        return {$implicit};
    }

    private setCurrentIcon(value: null | boolean) {
        this.icon =
            value === null
                ? this.options.icons.indeterminate
                : this.options.icons.checked;
    }
}
