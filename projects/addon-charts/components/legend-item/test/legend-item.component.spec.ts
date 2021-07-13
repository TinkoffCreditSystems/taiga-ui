import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {TuiLegendItemModule} from '@taiga-ui/addon-charts/components';
import {configureTestSuite} from 'ng-bullet';
import {TuiLegendItemComponent} from '../legend-item.component';

describe('LegendItem', () => {
    const DEFAULT_TEXT_INSIDE = 'test text';
    const CUSTOM_COLOR_CONTENT = 'o';

    @Component({
        template: `
            <tui-legend-item
                [color]="color"
                [text]="text"
                [disabled]="disabled"
                [customColorContent]="isCustomColorDotEnabled ? myColorDot : ''"
            ></tui-legend-item>

            <ng-template #myColorDot>{{ customColorContent }}</ng-template>
        `,
        styles: [
            `
                :host {
                    --tui-legend-disabled: grey;
                    --tui-legend-active: red;
                }
            `,
        ],
    })
    class TestComponent {
        @ViewChild(TuiLegendItemComponent)
        readonly component: TuiLegendItemComponent;
        disabled = false;
        text = DEFAULT_TEXT_INSIDE;
        isCustomColorDotEnabled = false;
        customColorContent = CUSTOM_COLOR_CONTENT;

        get color(): string {
            if (this.disabled) {
                return 'var(--tui-legend-disabled)';
            }

            return 'var(--tui-legend-active)';
        }
    }

    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [TuiLegendItemModule],
            declarations: [TestComponent],
        });
    });

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('displays input prop `text`', () => {
        expect(fixture.debugElement.nativeElement.innerText).toBe(DEFAULT_TEXT_INSIDE);
    });

    describe('if no `customColorContent` is provided', () => {
        let displayedColorDots: HTMLElement[];

        beforeEach(() => {
            displayedColorDots = getDefaultColorDots();
        });

        it('displays default color dot', () => {
            expect(displayedColorDots.length).toBe(1);
        });

        it('fills default color dot with active color if it is not disabled', () => {
            const [colorDot] = displayedColorDots;

            expect(colorDot.style.background).toBe('var(--tui-legend-active)');
        });

        it('changes color dot with disabled color if its disable status was changed', () => {
            const [colorDot] = displayedColorDots;

            testComponent.disabled = true;
            fixture.detectChanges();
            expect(colorDot.style.background).toBe('var(--tui-legend-disabled)');
        });
    });

    describe('if `customColorContent` is provided', () => {
        beforeEach(() => {
            testComponent.isCustomColorDotEnabled = true;
            fixture.detectChanges();
        });

        it('displays this custom content', () => {
            expect(fixture.debugElement.nativeElement.innerText).toMatch(
                new RegExp(`${CUSTOM_COLOR_CONTENT}[\s\n]${DEFAULT_TEXT_INSIDE}`),
            );
        });

        it('doesnt displays default color dot', () => {
            expect(getDefaultColorDots().length).toBe(0);
        });
    });

    function getDefaultColorDots(): HTMLElement[] {
        return fixture.debugElement
            .queryAll(By.css('.dot'))
            .map(debugEl => debugEl.nativeElement);
    }
});
