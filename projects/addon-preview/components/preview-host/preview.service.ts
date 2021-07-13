import {Injectable} from '@angular/core';
import {tuiAssert} from '@taiga-ui/cdk';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';
import {NEVER, Observable, Subject} from 'rxjs';
import {finalize, takeUntil} from 'rxjs/operators';

const NO_HOST =
    'No host for preview, add TuiPreviewHostModule to your main module and ' +
    'tui-preview-host into tui-root in your template';

@Injectable({
    providedIn: 'root',
})
export class TuiPreviewService {
    readonly preview$ = new Subject<PolymorpheusContent | null>();

    open(content: PolymorpheusContent): Observable<never> {
        tuiAssert.assert(!!this.preview$.observers.length, NO_HOST);

        this.preview$.next(content);

        return NEVER.pipe(
            takeUntil(this.preview$),
            finalize(() => {
                this.preview$.next(null);
            }),
        );
    }
}
