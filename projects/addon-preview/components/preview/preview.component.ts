import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    Inject,
    Input,
    ViewChild,
} from '@angular/core';
import {DomSanitizer} from '@angular/platform-browser';
import {TuiPreviewService} from '@taiga-ui/addon-preview/components/preview-host';
import {
    clamp,
    dragAndDropFrom,
    round,
    tuiDefaultProp,
    TuiDestroyService,
    TuiDragStage,
    TuiDragState,
    typedFromEvent,
} from '@taiga-ui/cdk';
import {tuiSlideInTop} from '@taiga-ui/core';
import {BehaviorSubject, combineLatest, merge, Observable, Subject} from 'rxjs';
import {
    distinctUntilChanged,
    filter,
    map,
    mapTo,
    pairwise,
    scan,
    startWith,
    switchMap,
    takeUntil,
} from 'rxjs/operators';

const INITIAL_SCALE_COEF = 0.8;
const EMPTY_COORDINATES: [number, number] = [0, 0];

@Component({
    selector: 'tui-preview',
    templateUrl: './preview.template.html',
    styleUrls: ['./preview.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
    animations: [tuiSlideInTop],
    providers: [TuiDestroyService],
})
export class TuiPreviewComponent {
    @Input()
    @tuiDefaultProp()
    zoomable = true;

    @Input()
    @tuiDefaultProp()
    rotatable = false;

    minZoom = 1;

    width = 0;
    height = 0;

    readonly drag$ = new Subject<TuiDragState | null>();

    readonly zoom$ = new BehaviorSubject<number>(1);
    readonly rotation$ = new BehaviorSubject<number>(0);

    readonly transitioned$ = merge(
        this.drag$.pipe(
            filter(drag => drag === null),
            switchMap(() =>
                merge(
                    this.zoom$.pipe(filter(zoom => zoom !== this.minZoom)),
                    this.rotation$.pipe(filter(rotation => rotation !== 0)),
                ).pipe(mapTo(true), startWith(false)),
            ),
        ),
        this.drag$.pipe(
            filter(drag => drag !== null),
            map(drag => !drag || drag.stage !== TuiDragStage.Continues),
        ),
    );

    readonly cursor$ = combineLatest(this.drag$.pipe(startWith(null)), this.zoom$).pipe(
        map(([state, zoom]) => {
            if (!this.zoomable) {
                return null;
            }

            if (state && state.stage === TuiDragStage.Continues) {
                return 'grabbing';
            }

            return zoom > this.minZoom ? 'zoom-out' : 'zoom-in';
        }),
    );

    // TODO: use named tuples after TS update
    readonly wrapperTranslate$ = combineLatest([
        this.drag$.pipe(startWith(null), pairwise()),
        this.zoom$,
        this.rotation$,
    ]).pipe(
        scan<
            [[TuiDragState | null, TuiDragState | null], number, number],
            [number, number]
        >((coordinates, latest) => {
            const [pair, zoom, rotation] = latest;

            if (pair[1] === null || pair[0] === null) {
                return EMPTY_COORDINATES;
            }

            if (pair[1].stage === TuiDragStage.Start) {
                return coordinates;
            }

            if (
                pair[0].stage === TuiDragStage.Start &&
                pair[1].stage === TuiDragStage.End
            ) {
                coordinates = this.recalculateCoordinatesAfterZoom(
                    coordinates,
                    pair[1].event.clientX,
                    pair[1].event.clientY,
                    rotation,
                );
            }

            const moveX = pair[1].event.clientX - pair[0].event.clientX;
            const moveY = pair[1].event.clientY - pair[0].event.clientY;

            const offsetX = ((zoom - this.minZoom) * this.width) / 2;
            const offsetY = ((zoom - this.minZoom) * this.height) / 2;

            const x = clamp(coordinates[0] + moveX, -offsetX, offsetX);
            const y = clamp(coordinates[1] + moveY, -offsetY, offsetY);

            return [x, y];
        }, EMPTY_COORDINATES),
        map(([x, y]) => `${x}px, ${y}px`),
        distinctUntilChanged(),
    );

    readonly wrapperTransform$ = combineLatest([
        this.wrapperTranslate$,
        this.zoom$,
        this.rotation$,
    ]).pipe(
        map(([translate, zoom, rotation]) =>
            this.sanitizer.bypassSecurityTrustStyle(
                `translate(${translate}) scale(${zoom}) rotate(${rotation}deg)`,
            ),
        ),
    );

    @ViewChild('contentWrapper')
    set contentWrapper({nativeElement}: ElementRef<HTMLElement>) {
        merge(
            dragAndDropFrom(nativeElement),
            typedFromEvent(nativeElement, 'touchmove').pipe(
                map(
                    event =>
                        /**
                         * TODO: find the better way. DragFrom does not support touches and
                         * they are incompatible with MouseEvent, but we may use it
                         * while we need only ClientX/Y
                         */
                        new TuiDragState(TuiDragStage.Continues, event.touches[0] as any),
                ),
            ),
        )
            .pipe(
                filter(() => this.zoomable),
                takeUntil(this.destroy$),
            )
            .subscribe(event => {
                this.drag$.next(event);
            });
    }

    constructor(
        @Inject(TuiPreviewService) private readonly previewService: TuiPreviewService,
        @Inject(DomSanitizer) private readonly sanitizer: DomSanitizer,
        @Inject(ElementRef) readonly elementRef: ElementRef<HTMLElement>,
        @Inject(TuiDestroyService) readonly destroy$: Observable<void>,
    ) {
        this.initClickSubscription();
    }

    close() {
        this.previewService.preview$.next(null);
    }

    rotate() {
        this.rotation$.next(this.rotation$.value - 90);
    }

    onMutation(contentWrapper: HTMLElement) {
        const {clientWidth, clientHeight} = contentWrapper;

        this.refresh(clientWidth, clientHeight);
    }

    onResize(contentResizeEntries: ReadonlyArray<ResizeObserverEntry>) {
        if (contentResizeEntries.length === 0) {
            return;
        }

        const {width, height} = contentResizeEntries[0].contentRect;

        this.refresh(width, height);
    }

    private calculateMinZoom(
        contentHeight: number,
        contentWidth: number,
        boxHeight: number,
        boxWidth: number,
    ): number {
        const bigSize =
            contentHeight > boxHeight * INITIAL_SCALE_COEF ||
            contentWidth > boxWidth * INITIAL_SCALE_COEF;

        return bigSize
            ? round(
                  Math.min(
                      (this.elementRef.nativeElement.clientHeight * INITIAL_SCALE_COEF) /
                          contentHeight,
                      (this.elementRef.nativeElement.clientWidth * INITIAL_SCALE_COEF) /
                          contentWidth,
                  ),
                  2,
              )
            : 1;
    }

    private recalculateCoordinatesAfterZoom(
        previous: [number, number],
        nextX: number,
        nextY: number,
        rotation: number,
    ): [number, number] {
        const vertical = rotation % 180 === 0;
        const third =
            (vertical
                ? this.elementRef.nativeElement.clientHeight
                : this.elementRef.nativeElement.clientWidth) / 3;
        const next = vertical ? nextY : nextX;

        if (next < third) {
            return [vertical ? 0 : this.width / 3, vertical ? this.height / 3 : 0];
        }

        const lastThird =
            (vertical
                ? this.elementRef.nativeElement.clientHeight
                : this.elementRef.nativeElement.clientWidth) - third;

        if (next > lastThird) {
            return [vertical ? 0 : -this.width / 3, vertical ? -this.height / 3 : 0];
        }

        return previous;
    }

    private initClickSubscription() {
        this.drag$
            .pipe(
                pairwise(),
                filter(
                    ([previous, current]) =>
                        previous !== null &&
                        current !== null &&
                        previous.stage === TuiDragStage.Start &&
                        current.stage === TuiDragStage.End,
                ),
                takeUntil(this.destroy$),
            )
            .subscribe(() => {
                this.zoom$.next(
                    this.zoom$.value > this.minZoom
                        ? this.minZoom
                        : this.zoom$.value + 0.5,
                );
            });
    }

    private refresh(width: number, height: number) {
        this.width = width;
        this.height = height;
        this.minZoom = this.calculateMinZoom(
            height,
            width,
            this.elementRef.nativeElement.clientHeight,
            this.elementRef.nativeElement.clientWidth,
        );
        this.zoom$.next(this.minZoom);
        this.rotation$.next(0);
        this.drag$.next(null);
    }
}
