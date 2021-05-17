import {
    ChangeDetectorRef,
    Directive,
    ElementRef,
    HostBinding,
    Inject,
    Input,
} from '@angular/core';
import {IntersectionObserverService} from '@ng-web-apis/intersection-observer';
import {TuiDestroyService} from '@taiga-ui/cdk';
import {fromEvent} from 'rxjs';
import {takeUntil} from 'rxjs/operators';
import {TuiLazyLoadingService} from './lazy-loading.service';

@Directive({
    selector: 'img[loading="lazy"]',
    providers: [TuiLazyLoadingService, IntersectionObserverService, TuiDestroyService],
    host: {
        '[style.background-color]': '"rgba(0, 0, 0, .16)"',
    },
})
export class TuiLazyLoadingDirective {
    @Input('src')
    set srcSetter(src: string) {
        this.src = this.supported ? src : null;
        this.src$.next(src);
    }

    @HostBinding('style.animation')
    animation = 'tuiSkeletonVibe ease-in-out 1s infinite alternate';

    @HostBinding('attr.src')
    src: string | null = null;

    private readonly supported = 'loading' in this.elementRef.nativeElement;

    constructor(
        @Inject(TuiDestroyService)
        private readonly destroy$: TuiDestroyService,
        @Inject(ChangeDetectorRef) private readonly changeDetectorRef: ChangeDetectorRef,
        @Inject(TuiLazyLoadingService)
        private readonly src$: TuiLazyLoadingService,
        @Inject(ElementRef)
        private readonly elementRef: ElementRef<HTMLImageElement>,
    ) {
        fromEvent(this.elementRef.nativeElement, 'load')
            .pipe(takeUntil(this.destroy$))
            .subscribe(() => this.cancelSkeletonAnimation());

        if (!this.supported) {
            this.src$.subscribe(src => {
                this.src = src;
            });
        }
    }

    private cancelSkeletonAnimation() {
        this.animation = '';
        this.changeDetectorRef.markForCheck();
    }
}
