import {DOCUMENT} from '@angular/common';
import {ChangeDetectionStrategy, Component, HostBinding, Inject} from '@angular/core';
import {Title} from '@angular/platform-browser';
import {ActivatedRoute, Router} from '@angular/router';
import {tuiPure, uniqBy} from '@taiga-ui/cdk';
import {TuiBrightness, TuiModeDirective} from '@taiga-ui/core';
import {Observable} from 'rxjs';
import {map, startWith} from 'rxjs/operators';
import {TuiDocPage} from '../../interfaces/page';
import {TUI_DOC_SEARCH_TEXT} from '../../tokens/i18n';
import {TuiDocPages} from '../../types/pages';
import {transliterateKeyboardLayout} from '../../utils/transliterate-keyboard-layout';
import {
    NAVIGATION_ITEMS,
    NAVIGATION_ITEMS_WITHOUT_SECTIONS,
    NAVIGATION_LABELS,
    NAVIGATION_PROVIDERS,
    NAVIGATION_TITLE,
} from './navigation.providers';

const SCROLL_INTO_VIEW_DELAY = 200;

// @dynamic
@Component({
    selector: 'tui-doc-navigation',
    templateUrl: 'navigation.template.html',
    styleUrls: ['navigation.style.less'],
    providers: NAVIGATION_PROVIDERS,
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiDocNavigationComponent {
    search = '';
    open = false;
    openPagesArr: boolean[] = [];
    openPagesGroupsArr: boolean[] = [];
    active = '';

    @HostBinding('class._open')
    menuOpen = false;

    readonly mode$: Observable<TuiBrightness> = this.mode.change$.pipe(
        startWith(null),
        map(() => this.mode.mode || 'onLight'),
    );

    constructor(
        @Inject(Title) titleService: Title,
        @Inject(NAVIGATION_TITLE) title$: Observable<string>,
        @Inject(DOCUMENT) private readonly documentRef: Document,
        @Inject(TuiModeDirective)
        private readonly mode: TuiModeDirective,
        @Inject(NAVIGATION_LABELS) readonly labels: string[],
        @Inject(NAVIGATION_ITEMS)
        readonly items: ReadonlyArray<TuiDocPages>,
        @Inject(NAVIGATION_ITEMS_WITHOUT_SECTIONS)
        readonly itemsWithoutSections: TuiDocPages,
        @Inject(TUI_DOC_SEARCH_TEXT) readonly searchText: string,
        @Inject(Router) private readonly router: Router,
        @Inject(ActivatedRoute) private readonly activatedRoute: ActivatedRoute,
    ) {
        // Angular can't navigate no anchor links
        // https://stackoverflow.com/questions/36101756/angular2-routing-with-hashtag-to-page-anchor
        title$.subscribe(title => {
            titleService.setTitle(title);
            this.openActivePageGroup();
            this.handleAnchorLink(this.activatedRoute.snapshot.fragment);
        });
    }

    get canOpen(): boolean {
        return this.search.length > 2;
    }

    get filteredItems(): ReadonlyArray<ReadonlyArray<TuiDocPage>> {
        return this.filterItems(
            this.flattenSubPages(this.items, this.itemsWithoutSections),
            this.search,
        );
    }

    isActive(route: string): boolean {
        return route === this.active;
    }

    onGroupClick(index: number) {
        this.openPagesGroupsArr[index] = !this.openPagesGroupsArr[index];
    }

    closeMenu() {
        this.menuOpen = false;
    }

    onSearchChange(search: string) {
        this.search = search;
        this.open = this.canOpen;
    }

    onClick() {
        this.open = false;
        this.menuOpen = false;
        this.search = '';
        this.openActivePageGroup();
    }

    @tuiPure
    private filterItems(
        items: ReadonlyArray<ReadonlyArray<TuiDocPage>>,
        search: string,
    ): ReadonlyArray<ReadonlyArray<TuiDocPage>> {
        return items.map(section =>
            uniqBy(
                section.filter(({title, keywords = ''}) => {
                    title = title.toLowerCase();
                    search = search.toLowerCase();
                    keywords = keywords.toLowerCase();

                    return (
                        title.includes(search) ||
                        keywords.includes(search) ||
                        title.includes(transliterateKeyboardLayout(search)) ||
                        keywords.includes(transliterateKeyboardLayout(search)) ||
                        search.replace(/-/gi, '').includes(title)
                    );
                }),
                'title',
            ),
        );
    }

    @tuiPure
    private flattenSubPages(
        items: ReadonlyArray<TuiDocPages>,
        itemsWithoutSection: TuiDocPages,
    ): ReadonlyArray<ReadonlyArray<TuiDocPage>> {
        return [...items, itemsWithoutSection].reduce<
            ReadonlyArray<ReadonlyArray<TuiDocPage>>
        >(
            (array, item) => [
                ...array,
                item.reduce<ReadonlyArray<TuiDocPage>>(
                    (pages, page) =>
                        'subPages' in page
                            ? [...pages, ...page.subPages]
                            : [...pages, page],
                    [],
                ),
            ],
            [],
        );
    }

    private isActiveRoute(route: string): boolean {
        return this.router.isActive(route, false);
    }

    private handleAnchorLink(hash: string) {
        setTimeout(() => {
            this.navigateToAnchorLink(hash);
        }, SCROLL_INTO_VIEW_DELAY);
    }

    private openActivePageGroup() {
        [...this.items, this.itemsWithoutSections].forEach((pages, pagesIndex) => {
            pages.forEach((page, pageIndex) => {
                if ('route' in page && this.isActiveRoute(page.route)) {
                    this.openPagesArr[pagesIndex] = true;
                    this.active = page.route;
                }

                if ('subPages' in page) {
                    page.subPages.forEach(subPage => {
                        if (this.isActiveRoute(subPage.route)) {
                            this.openPagesArr[pagesIndex] = true;
                            this.openPagesGroupsArr[pagesIndex + pageIndex] = true;
                            this.active = subPage.route;
                        }
                    });
                }
            });
        });
    }

    private navigateToAnchorLink(fragment: string) {
        const element = fragment && this.documentRef.querySelector(`#${fragment}`);

        if (!element) {
            return;
        }

        element.classList.add('tui-doc-animated-example');
        element.scrollIntoView({
            block: 'start',
            inline: 'nearest',
            behavior: 'smooth',
        });
    }
}
