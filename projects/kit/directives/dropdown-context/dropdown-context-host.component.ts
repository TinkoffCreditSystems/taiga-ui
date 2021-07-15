import {
    ChangeDetectionStrategy,
    Component,
    ElementRef,
    HostBinding,
    Inject,
    Input,
    ViewChild,
} from '@angular/core';
import {tuiDefaultProp} from '@taiga-ui/cdk';
import {TUI_DROPDOWN_DIRECTIVE, TuiDropdown} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

@Component({
    selector: 'tui-dropdown-context-host',
    template: `
        <div
            [tuiDropdownContent]="contentWrapper"
            [tuiDropdownDirection]="directive.direction"
            [tuiDropdownAlign]="directive.align"
            [tuiDropdownMinHeight]="directive.minHeight"
            [tuiDropdownMaxHeight]="directive.maxHeight"
            [tuiDropdownLimitWidth]="directive.limitMinWidth"
            [tuiDropdown]="true"
        ></div>

        <ng-template #contentWrapper>
            <div #contentRef>
                <div polymorpheus-outlet [content]="content" [context]="context"></div>
            </div>
            <!--This DIV is here to start backwards TreeWalker for focusing last focusable item on ArrowUp-->
            <div></div>
        </ng-template>
    `,
    styles: [':host { position: fixed }'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiDropdownContextHostComponent {
    @Input()
    @tuiDefaultProp()
    content: PolymorpheusContent = '';

    @Input()
    @tuiDefaultProp()
    context: unknown = {};

    @Input()
    @tuiDefaultProp()
    @HostBinding('style.left.px')
    x: number | null = null;

    @Input()
    @tuiDefaultProp()
    @HostBinding('style.top.px')
    y: number | null = null;

    @ViewChild('contentRef')
    contentRef?: ElementRef<HTMLDivElement>;

    constructor(@Inject(TUI_DROPDOWN_DIRECTIVE) readonly directive: TuiDropdown) {}
}
