import {Component, Inject, TemplateRef, ViewChild} from '@angular/core';
import {TuiPreviewService} from '@taiga-ui/addon-preview';
import {isPresent} from '@taiga-ui/cdk';
import {BehaviorSubject, Observable, of, timer} from 'rxjs';
import {filter, map, mapTo, startWith, switchMap} from 'rxjs/operators';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-preview-example-3',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiPreviewExample3 {
    @ViewChild('preview')
    readonly preview?: TemplateRef<{}>;

    readonly items = [
        {
            title: 'some table.xlsx',
            hasPreview: false,
        },
        {
            title: 'Content #2',
            hasPreview: true,
        },
    ];

    readonly index$$ = new BehaviorSubject<number>(0);

    readonly item$ = this.index$$.pipe(
        map(index => this.items[index]),
        filter(isPresent),
    );

    readonly title$ = this.item$.pipe(map(item => item.title));

    readonly contentUnavailable$ = this.item$.pipe(map(item => !item.hasPreview));

    readonly imageSrc$ = this.item$.pipe(
        switchMap(item =>
            item.hasPreview ? this.emulateBackendRequest().pipe(startWith('')) : of(null),
        ),
    );

    readonly loading$ = this.imageSrc$.pipe(map(src => src === ''));

    constructor(
        @Inject(TuiPreviewService) private readonly previewService: TuiPreviewService,
    ) {}

    show() {
        this.previewService.open(this.preview || '').subscribe();
    }

    download() {
        console.log('downloading...');
    }

    emulateBackendRequest(): Observable<string> {
        return timer(1500).pipe(
            mapTo('https://ng-web-apis.github.io/dist/assets/images/web-api.svg'),
        );
    }
}
