import {ChangeDetectionStrategy, Component, Input} from '@angular/core';
import {TuiContextWithImplicit, tuiDefaultProp} from '@taiga-ui/cdk';
import {colorFallback, TuiAppearance} from '@taiga-ui/core';
import {PolymorpheusContent} from '@tinkoff/ng-polymorpheus';

// TODO: Remove fallback in 3.0
@Component({
    selector: 'tui-legend-item',
    templateUrl: './legend-item.template.html',
    styleUrls: ['./legend-item.style.less'],
    changeDetection: ChangeDetectionStrategy.OnPush,
})
export class TuiLegendItemComponent {
    @Input()
    @tuiDefaultProp()
    active = false;

    @Input()
    @tuiDefaultProp()
    color = '';

    @Input()
    @tuiDefaultProp()
    text = '';

    @Input()
    @tuiDefaultProp()
    withBorder = true;

    @Input()
    @tuiDefaultProp()
    disabled = false;

    @Input()
    @tuiDefaultProp()
    customColorContent: PolymorpheusContent = '';

    get computedColor(): string {
        return this.color.startsWith('var(') ? this.color : colorFallback(this.color);
    }

    get buttonAppearance(): TuiAppearance | string {
        return this.withBorder ? TuiAppearance.Whiteblock : 'legend-item-no-border';
    }

    get pseudoHovered(): boolean | null {
        return this.active ?? null;
    }

    get colorContext(): TuiContextWithImplicit<string> {
        return {$implicit: this.computedColor};
    }
}
