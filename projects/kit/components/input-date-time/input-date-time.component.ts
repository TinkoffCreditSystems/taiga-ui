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
    ALWAYS_FALSE_HANDLER,
    nullableSame,
    TUI_DATE_FILLER,
    TUI_FIRST_DAY,
    TUI_FOCUSABLE_ITEM_ACCESSOR,
    TUI_LAST_DAY,
    TuiBooleanHandler,
    TuiDay,
    tuiDefaultProp,
    TuiFocusableElementAccessor,
    TuiMonth,
    tuiPure,
    TuiTime,
    TuiTimeMode,
} from '@taiga-ui/cdk';
import {
    sizeBigger,
    TUI_TEXTFIELD_SIZE,
    TuiPrimitiveTextfieldComponent,
    TuiTextfieldSizeDirective,
    TuiTextMaskOptions,
    TuiWithOptionalMinMax,
} from '@taiga-ui/core';
import {DATE_TIME_SEPARATOR, TUI_DATE_MASK} from '@taiga-ui/kit/constants';
import {LEFT_ALIGNED_DROPDOWN_CONTROLLER_PROVIDER} from '@taiga-ui/kit/providers';
import {TUI_CALENDAR_DATA_STREAM, TUI_TIME_TEXTS} from '@taiga-ui/kit/tokens';
import {
    tuiCreateAutoCorrectedDateTimePipe,
    tuiCreateTimeMask,
} from '@taiga-ui/kit/utils/mask';
import {TuiReplayControlValueChangesFactory} from '@taiga-ui/kit/utils/miscellaneous';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';

// TODO: remove in ivy compilation
export const TIME_STREAM_FACTORY = TuiReplayControlValueChangesFactory;

// @dynamic
@Component({
    selector: 'tui-input-date-time',
    templateUrl: './input-date-time.template.html',
    styleUrls: ['./input-date-time.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    providers: [
        {
            provide: TUI_FOCUSABLE_ITEM_ACCESSOR,
            useExisting: forwardRef(() => TuiInputDateTimeComponent),
        },
        {
            provide: TUI_CALENDAR_DATA_STREAM,
            deps: [[new Optional(), new Self(), NgControl]],
            useFactory: TIME_STREAM_FACTORY,
        },
        LEFT_ALIGNED_DROPDOWN_CONTROLLER_PROVIDER,
    ],
})
export class TuiInputDateTimeComponent
    extends AbstractTuiControl<[TuiDay | null, TuiTime | null]>
    implements TuiWithOptionalMinMax<TuiDay>, TuiFocusableElementAccessor {
    @Input()
    @tuiDefaultProp()
    min = TUI_FIRST_DAY;

    @Input()
    @tuiDefaultProp()
    max = TUI_LAST_DAY;

    @Input()
    @tuiDefaultProp()
    disabledItemHandler: TuiBooleanHandler<TuiDay> = ALWAYS_FALSE_HANDLER;

    @Input()
    @tuiDefaultProp()
    defaultActiveYearMonth = TuiMonth.currentLocal();

    @Input()
    @tuiDefaultProp()
    timeMode: TuiTimeMode = 'HH:MM';

    open = false;

    private month: TuiMonth | null = null;

    @ViewChild(TuiPrimitiveTextfieldComponent)
    private readonly textfield?: TuiPrimitiveTextfieldComponent;

    constructor(
        @Optional()
        @Self()
        @Inject(NgControl)
        control: NgControl | null,
        @Inject(ChangeDetectorRef) changeDetectorRef: ChangeDetectorRef,
        @Inject(TUI_TEXTFIELD_SIZE)
        private readonly textfieldSize: TuiTextfieldSizeDirective,
        @Inject(TUI_DATE_FILLER) readonly dateFiller: string,
        @Inject(TUI_TIME_TEXTS)
        readonly timeTexts$: Observable<Record<TuiTimeMode, string>>,
    ) {
        super(control, changeDetectorRef);
    }

    get fillerLength(): number {
        return this.dateFiller.length + DATE_TIME_SEPARATOR.length + this.timeMode.length;
    }

    get textMaskOptions(): TuiTextMaskOptions {
        return this.calculateMask(
            this.value[0],
            this.min,
            this.max,
            this.timeMode,
            this.dateFiller,
        );
    }

    get nativeFocusableElement(): HTMLInputElement | null {
        return this.textfield ? this.textfield.nativeFocusableElement : null;
    }

    get focused(): boolean {
        return !!this.textfield && this.textfield.focused;
    }

    get calendarIcon(): string {
        return sizeBigger(this.textfieldSize.size)
            ? 'tuiIconCalendarLarge'
            : 'tuiIconCalendar';
    }

    get computedValue(): string {
        const {value, nativeValue, timeMode} = this;
        const [date, time] = value;
        const hasTimeInputChars = nativeValue.length > this.dateFiller.length;

        if (!date || (!time && hasTimeInputChars)) {
            return nativeValue;
        }

        return this.getDateTimeString(date, time, {timeMode});
    }

    get calendarValue(): TuiDay | null {
        return this.value[0];
    }

    get computedActiveYearMonth(): TuiMonth {
        return this.month || this.value[0] || this.defaultActiveYearMonth;
    }

    get nativeValue(): string {
        return this.nativeFocusableElement ? this.nativeFocusableElement.value : '';
    }

    set nativeValue(value: string) {
        if (!this.nativeFocusableElement) {
            return;
        }

        this.nativeFocusableElement.value = value;
    }

    get canOpen(): boolean {
        return !this.computedDisabled && !this.readOnly;
    }

    @tuiPure
    getFiller$(dateFiller: string, timeMode: TuiTimeMode): Observable<string> {
        return this.timeTexts$.pipe(
            map(texts => `${dateFiller}${DATE_TIME_SEPARATOR}${texts[timeMode]}`),
        );
    }

    @HostListener('click')
    onClick() {
        this.open = !this.open;
    }

    onValueChange(value: string) {
        if (value.length < this.dateFiller.length) {
            this.updateValue([null, null]);

            return;
        }

        const [date, time] = value.split(DATE_TIME_SEPARATOR);

        const parsedDate = TuiDay.normalizeParse(date);
        const parsedTime =
            time && time.length === this.timeMode.length
                ? TuiTime.fromString(time)
                : null;

        if (parsedDate !== null) {
            this.open = false;
        }

        this.updateValue([parsedDate, parsedTime]);
    }

    onDayClick(day: TuiDay) {
        this.updateValue([day, this.value[1]]);
        this.updateNativeValue(day);
        this.open = false;
    }

    onHovered(hovered: boolean) {
        this.updateHovered(hovered);
    }

    onMonthChange(month: TuiMonth) {
        this.month = month;
    }

    onOpenChange(open: boolean) {
        this.open = open;
    }

    onFocused(focused: boolean) {
        this.updateFocused(focused);

        if (
            focused ||
            this.value[0] === null ||
            this.value[1] !== null ||
            this.nativeValue.length <= this.fillerLength + DATE_TIME_SEPARATOR.length ||
            this.timeMode === 'HH:MM'
        ) {
            return;
        }

        const [, time] = this.nativeValue.split(DATE_TIME_SEPARATOR);

        if (!time) {
            return;
        }

        const parsedTime = TuiTime.fromString(time);

        this.updateValue([this.value[0], parsedTime]);

        setTimeout(() => {
            if (this.nativeValue.endsWith('.') || this.nativeValue.endsWith(':')) {
                this.nativeValue = this.nativeValue.slice(0, -1);
            }
        });
    }

    setDisabledState() {
        super.setDisabledState();
        this.open = false;
    }

    writeValue(value: [TuiDay | null, TuiTime | null] | null) {
        super.writeValue(value);

        this.nativeValue = value && (value[0] || value[1]) ? this.computedValue : '';
    }

    protected getFallbackValue(): [TuiDay | null, TuiTime | null] {
        return [null, null];
    }

    protected valueIdenticalComparator(
        oldValue: [TuiDay | null, TuiTime | null],
        newValue: [TuiDay | null, TuiTime | null],
    ): boolean {
        return (
            nullableSame(oldValue[0], newValue[0], (a, b) => a.daySame(b)) &&
            nullableSame(
                oldValue[1],
                newValue[1],
                (a, b) => a.toString() === b.toString(),
            )
        );
    }

    private updateNativeValue(day: TuiDay) {
        const time = this.nativeValue.split(DATE_TIME_SEPARATOR)[1] || '';

        this.nativeValue = this.getDateTimeString(day, time);
    }

    @tuiPure
    private calculateMask(
        day: TuiDay | null,
        min: TuiDay,
        max: TuiDay,
        timeMode: TuiTimeMode,
        filler: string,
    ): TuiTextMaskOptions {
        return {
            mask: [...TUI_DATE_MASK, ',', ' ', ...tuiCreateTimeMask(timeMode)],
            pipe: tuiCreateAutoCorrectedDateTimePipe(
                {value: day, min, max, filler},
                timeMode,
            ),
            guide: false,
        };
    }

    @tuiPure
    private getDateTimeString(
        date: TuiDay,
        time: TuiTime | string | null,
        {timeMode = 'HH:MM'}: {timeMode?: TuiTimeMode} = {},
    ): string {
        const timeString = time instanceof TuiTime ? time.toString(timeMode) : time || '';

        return `${date.toString()}${DATE_TIME_SEPARATOR}${timeString}`;
    }
}
