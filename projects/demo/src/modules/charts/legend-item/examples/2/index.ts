import {Component} from '@angular/core';
import {isPresent, round, sum} from '@taiga-ui/cdk';
import {TuiAppearance} from '@taiga-ui/core';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-legend-item-example-2',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiLegendItemExample2 {
    activeItemIndex: number | null = null;
    mobileVersion = false;
    itemsWithBorders = true;

    value = [55, 25, 15, 5];
    readonly labels = [
        'Thinking names for variables',
        'Searching stack overflow',
        'Fixing bugs',
        'Coding',
    ];

    get closeButtonAppearance(): TuiAppearance | string {
        return this.mobileVersion || !this.itemsWithBorders
            ? ''
            : TuiAppearance.Whiteblock;
    }

    isItemActive(index: number): boolean | null {
        return isPresent(this.activeItemIndex) ? this.activeItemIndex === index : null;
    }

    onHover(index: number, hovered: boolean) {
        this.activeItemIndex = hovered ? index : null;
    }

    onCloseItemHover(hovered: boolean) {
        this.activeItemIndex = hovered ? -1 : null;
    }

    getColor(index: number): string {
        return `var(--tui-chart-${index})`;
    }

    deleteItem(index: number): void {
        this.value = [...this.value.slice(0, index), 0, ...this.value.slice(index + 1)];
    }

    getItemPercent(index: number): string {
        return `${round((this.value[index] * 100) / sum(...this.value), 2)}%`;
    }
}
