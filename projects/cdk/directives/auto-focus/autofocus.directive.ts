import {isPlatformBrowser} from '@angular/common';
import {
    AfterViewInit,
    ChangeDetectorRef,
    Directive,
    ElementRef,
    Inject,
    Input,
    NgZone,
    Optional,
    PLATFORM_ID,
    Renderer2,
    Self,
    ViewContainerRef,
} from '@angular/core';
import {POLLING_TIME} from '@taiga-ui/cdk/constants';
import {TuiFocusableElementAccessor} from '@taiga-ui/cdk/interfaces';
import {TUI_FOCUSABLE_ITEM_ACCESSOR, TUI_IS_IOS} from '@taiga-ui/cdk/tokens';
import {getClosestElement} from '@taiga-ui/cdk/utils/dom';
import {setNativeFocused} from '@taiga-ui/cdk/utils/focus';
import {interval, race, timer} from 'rxjs';
import {filter, map, take} from 'rxjs/operators';

const IOS_TIMEOUT = 1000;
const NG_ANIMATION_SELECTOR = '.ng-animating';

// @bad TODO: Consider removing iOS hacks
@Directive({
    selector: '[tuiAutoFocus]',
})
export class TuiAutoFocusDirective implements AfterViewInit {
    @Input()
    autoFocus = true;

    constructor(
        @Inject(PLATFORM_ID)
        private readonly platformId: string,
        @Inject(ChangeDetectorRef)
        private readonly changeDetectorRef: ChangeDetectorRef,
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLElement>,
        @Optional()
        @Self()
        @Inject(TUI_FOCUSABLE_ITEM_ACCESSOR)
        private readonly tuiFocusableComponent: TuiFocusableElementAccessor | null,
        @Inject(TUI_IS_IOS) private readonly isIos: boolean,
        @Inject(Renderer2) private readonly renderer: Renderer2,
        @Inject(ViewContainerRef)
        private readonly viewContainerRef: ViewContainerRef,
        private readonly ngZone: NgZone,
    ) {}

    ngAfterViewInit() {
        if (!this.autoFocus) {
            return;
        }

        const element =
            this.tuiFocusableComponent === null
                ? this.elementRef.nativeElement
                : this.tuiFocusableComponent.nativeFocusableElement;

        if (!(element instanceof HTMLElement)) {
            return;
        }

        if (!this.isIos && isPlatformBrowser(this.platformId)) {
            this.ngZone.runOutsideAngular(() => {
                // P.S. we'd been using the `setTimeout` previously.
                // The `HTMLElement.prototype.focus` triggers the layout update. We'd want to focus
                // the element in the next frame to prevent the frame drop (e.g. if the composite thread is busy).
                requestAnimationFrame(() => {
                    setNativeFocused(element);
                });
            });

            return;
        }

        this.veryVerySadIosFix(element);
    }

    private veryVerySadIosFix(element: HTMLElement) {
        const {nativeElement} = this.viewContainerRef.element;
        const decoy: HTMLElement = this.renderer.createElement('input');

        decoy.style.position = 'absolute';
        decoy.style.opacity = '0';
        decoy.style.height = '0';

        this.renderer.setAttribute(decoy, 'readonly', 'readonly');
        this.renderer.appendChild(nativeElement, decoy);
        setNativeFocused(decoy);

        race<unknown>(
            timer(IOS_TIMEOUT),
            interval(POLLING_TIME).pipe(
                map(() => getClosestElement(element, NG_ANIMATION_SELECTOR)),
                filter(element => !element),
                take(1),
            ),
        ).subscribe(() => {
            setTimeout(() => {
                setNativeFocused(element);
                this.changeDetectorRef.markForCheck();
                this.renderer.removeChild(nativeElement, decoy);
            });
        });
    }
}
