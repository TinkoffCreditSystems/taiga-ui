import {Component} from '@angular/core';
import {sum} from '@taiga-ui/cdk';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-legend-item-example-1',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiLegendItemExample1 {
    activeItemIndex: number | null = null;
    allItemsEnabled = true;
    itemsWithBorders = true;

    readonly value = [13769, 12367, 10172, 3018, 2592];
    readonly sum = sum(...this.value);
    readonly labels = ['Food', 'Cafe', 'Open Source', 'Taxi', 'Other'];

    isItemActive(index: number): boolean {
        return this.activeItemIndex === index;
    }

    checkIsDisabled(index: number): boolean {
        return !this.allItemsEnabled && index % 2 !== 0;
    }

    onHover(index: number, hovered: boolean) {
        this.activeItemIndex = hovered && !this.checkIsDisabled(index) ? index : null;
    }

    getColor(index: number): string {
        if (this.checkIsDisabled(index)) {
            return 'var(--tui-chart-disabled)';
        }

        return `var(--tui-chart-${index})`;
    }
}
