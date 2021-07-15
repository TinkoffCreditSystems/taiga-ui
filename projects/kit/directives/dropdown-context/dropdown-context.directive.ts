import {
    ComponentFactoryResolver,
    ComponentRef,
    Directive,
    ElementRef,
    forwardRef,
    HostListener,
    Inject,
    Injector,
    Input,
    Optional,
} from '@angular/core';
import {WINDOW} from '@ng-web-apis/common';
import {
    getClosestFocusable,
    setNativeFocused,
    TuiActiveZoneDirective,
    TuiContextWithImplicit,
    tuiDefaultProp,
    TuiDestroyService,
    TuiParentsScrollService,
    TuiPortalService,
} from '@taiga-ui/cdk';
import {AbstractTuiDropdown, TUI_DROPDOWN_DIRECTIVE, TuiDropdown} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {fromEvent, merge} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TuiDropdownContextHostComponent} from './dropdown-context-host.component';

// @dynamic
@Directive({
    selector: '[tuiDropdownContext]',
    providers: [
        TuiParentsScrollService,
        TuiDestroyService,
        {
            provide: TUI_DROPDOWN_DIRECTIVE,
            useExisting: forwardRef(() => TuiDropdownContextDirective),
        },
    ],
})
export class TuiDropdownContextDirective<C extends object>
    extends AbstractTuiDropdown
    implements TuiDropdown {
    @Input('tuiDropdownContext')
    @tuiDefaultProp()
    content: PolymorpheusContent = '';

    @Input('tuiDropdownContextData')
    @tuiDefaultProp()
    context: C | null = null;

    private hostRef: ComponentRef<TuiDropdownContextHostComponent> | null = null;

    private get dropdownContent(): HTMLElement | null {
        return this.hostRef?.instance.contentRef?.nativeElement || null;
    }

    constructor(
        protected readonly elementRef: ElementRef,
        @Inject(WINDOW) private readonly windowRef: Window,
        @Inject(TuiDestroyService) readonly destroy$: TuiDestroyService,
        @Inject(ComponentFactoryResolver)
        readonly componentFactoryResolver: ComponentFactoryResolver,
        @Inject(Injector) readonly injector: Injector,
        @Inject(TuiPortalService) readonly portalService: TuiPortalService,
        @Inject(TuiParentsScrollService) readonly refresh$: TuiParentsScrollService,
        @Optional() readonly activeZone: TuiActiveZoneDirective | null,
    ) {
        super(componentFactoryResolver, injector, portalService, elementRef, activeZone);

        merge(refresh$, fromEvent(this.windowRef, 'resize'))
            .pipe(takeUntil(destroy$))
            .subscribe(() => this.closeDropdown());
    }

    @HostListener('contextmenu', ['$event'])
    onContextMenu(event: MouseEvent) {
        const {clientX: x, clientY: y} = event;

        event.preventDefault();
        this.closeDropdown();
        this.hostRef = this.openDropdown(x, y);
    }

    @HostListener('document:click', ['$event.target'])
    onLeftClickOutside(target: HTMLElement) {
        const clickedInside = this.dropdownContent?.contains(target);

        if (!clickedInside) {
            this.closeDropdown();
        }
    }

    @HostListener('document:contextmenu', ['$event.target'])
    onAnotherContextOpen(target: HTMLElement) {
        const isAnotherContextOpened = !this.elementRef.nativeElement.contains(target);

        if (isAnotherContextOpened) {
            this.closeDropdown();
        }
    }

    @HostListener('document:keydown.arrowDown', ['$event', 'true'])
    @HostListener('document:keydown.arrowUp', ['$event', 'false'])
    onArrow(event: KeyboardEvent, down: boolean) {
        if (
            !this.dropdownContent ||
            !(this.dropdownContent.nextElementSibling instanceof HTMLElement)
        ) {
            return;
        }

        event.preventDefault();

        const focusable = getClosestFocusable(
            down ? this.dropdownContent : this.dropdownContent.nextElementSibling,
            !down,
            this.dropdownContent,
        );

        if (focusable === null) {
            return;
        }

        setNativeFocused(focusable);
    }

    @HostListener('document:keydown.esc', ['$event'])
    onKeyDownEsc(event: KeyboardEvent) {
        if (!this.dropdownContent) {
            return;
        }

        event.stopPropagation();
        this.closeDropdown();
    }

    private closeDropdown(): void {
        if (this.hostRef) {
            this.portalService.remove(this.hostRef);
            this.hostRef = null;
        }
    }

    private buildContext(data: C): TuiContextWithImplicit<C> & {close: () => void} {
        const close = this.closeDropdown.bind(this);

        return {
            close,
            $implicit: data,
        };
    }

    private openDropdown(
        x: number,
        y: number,
    ): ComponentRef<TuiDropdownContextHostComponent> {
        const componentFactory = this.componentFactoryResolver.resolveComponentFactory(
            TuiDropdownContextHostComponent,
        );
        const componentRef = this.portalService.add(componentFactory, this.injector);

        componentRef.instance.content = this.content;
        componentRef.instance.context = this.buildContext(this.context || ({} as C));
        componentRef.instance.x = x;
        componentRef.instance.y = y;

        componentRef.changeDetectorRef.detectChanges();

        return componentRef;
    }
}
