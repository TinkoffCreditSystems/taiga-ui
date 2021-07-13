import {InjectionToken, Provider} from '@angular/core';
import {ActivatedRoute, NavigationEnd, Router} from '@angular/router';
import {isPresent, TuiDestroyService} from '@taiga-ui/cdk';
import {Observable} from 'rxjs';
import {filter, map, mergeMap, takeUntil} from 'rxjs/operators';
import {TUI_DOC_PAGES} from '../../tokens/pages';
import {TUI_DOC_TITLE} from '../../tokens/title';
import {TuiDocPages} from '../../types/pages';

export const NAVIGATION_TITLE = new InjectionToken<Observable<string>>('Page title');
export const NAVIGATION_LABELS = new InjectionToken<readonly string[]>(
    'Navigation sections labels for search',
);
export const NAVIGATION_ITEMS: InjectionToken<
    ReadonlyArray<TuiDocPages>
> = new InjectionToken<ReadonlyArray<TuiDocPages>>('Navigation pages');

export const NAVIGATION_ITEMS_WITHOUT_SECTIONS = new InjectionToken<
    ReadonlyArray<TuiDocPages>
>('Navigation pages without sections');

export const NAVIGATION_PROVIDERS: Provider[] = [
    TuiDestroyService,
    {
        provide: NAVIGATION_TITLE,
        deps: [Router, ActivatedRoute, TUI_DOC_TITLE, TuiDestroyService],
        useFactory: titleProviderFactory,
    },
    {
        provide: NAVIGATION_LABELS,
        deps: [TUI_DOC_PAGES],
        useFactory: labelsProviderFactory,
    },
    {
        provide: NAVIGATION_ITEMS,
        deps: [TUI_DOC_PAGES],
        useFactory: itemsProviderFactory,
    },
    {
        provide: NAVIGATION_ITEMS_WITHOUT_SECTIONS,
        deps: [TUI_DOC_PAGES],
        useFactory: itemsWithoutSections,
    },
];

export function titleProviderFactory(
    router: Router,
    activatedRoute: ActivatedRoute,
    titlePrefix: string,
    destroy$: Observable<void>,
): Observable<string> {
    return router.events.pipe(
        filter(event => event instanceof NavigationEnd),
        map(() => activatedRoute.firstChild),
        filter(isPresent),
        mergeMap(({data}) => data),
        map(({title}) => titlePrefix + title),
        takeUntil(destroy$),
    );
}

export function labelsProviderFactory(pages: TuiDocPages): readonly string[] {
    return pages
        .map(({section}) => section)
        .filter(isPresent)
        .filter((item, index, array) => array.indexOf(item) === index);
}

export function itemsProviderFactory(pages: TuiDocPages): ReadonlyArray<TuiDocPages> {
    const labels = labelsProviderFactory(pages);

    return labels.map(label => pages.filter(({section}) => section === label));
}

export function itemsWithoutSections(pages: TuiDocPages): TuiDocPages {
    return pages.filter(page => !page.section);
}
