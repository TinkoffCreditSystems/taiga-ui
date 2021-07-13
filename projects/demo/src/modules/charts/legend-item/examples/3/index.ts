import {Component, Inject, OnInit} from '@angular/core';
import {FormArray, FormControl} from '@angular/forms';
import {isPresent, round, sum, TuiDestroyService} from '@taiga-ui/cdk';
import {takeUntil} from 'rxjs/operators';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-legend-item-example-3',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    providers: [TuiDestroyService],
    changeDetection,
    encapsulation,
})
export class TuiLegendItemExample3 implements OnInit {
    activeItemIndex: number | null = null;

    readonly originalChartValues = [40, 30, 15, 15];
    chartValues = this.originalChartValues;
    readonly labels = ['Pizza dough', 'Cheese', 'Tomato', 'Salami'];
    readonly checkboxesControls = new FormArray([]);

    isItemActive(index: number): boolean | null {
        return isPresent(this.activeItemIndex) ? this.activeItemIndex === index : null;
    }

    onHover(index: number, hovered: boolean) {
        this.activeItemIndex = hovered ? index : null;
    }

    getColor(index: number): string {
        return `var(--tui-chart-${index})`;
    }

    getItemPercent(index: number): string {
        if ((!index && index !== 0) || !this.chartValues[index]) {
            return '';
        }

        return `${round((this.chartValues[index] * 100) / sum(...this.chartValues), 2)}%`;
    }

    constructor(@Inject(TuiDestroyService) private destroy$: TuiDestroyService) {}

    ngOnInit() {
        this.chartValues.forEach(() =>
            this.checkboxesControls.push(new FormControl(true)),
        );

        this.checkboxesControls.valueChanges
            .pipe(takeUntil(this.destroy$))
            .subscribe(values => this.onCheckboxValuesChange(values));
    }

    private onCheckboxValuesChange(checkedValues: boolean[]): void {
        this.chartValues = this.chartValues.map((_, index) => {
            return checkedValues[index] ? this.originalChartValues[index] : 0;
        });
    }
}
