import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PageObject} from '@taiga-ui/testing';
import {TuiColorPickerComponent} from '../color-picker.component';
import {TuiColorPickerModule} from '../color-picker.module';

@Component({
    template: `
        <tui-color-picker
            [(color)]="color"
            [isAlphaEnabled]="isAlphaEnabled"
        ></tui-color-picker>
    `,
})
class TestComponent {
    @ViewChild(TuiColorPickerComponent)
    component: TuiColorPickerComponent;

    color = [0, 255, 0, 1];
    isAlphaEnabled = true;
}

describe('ColorPicker', () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: PageObject<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TuiColorPickerModule, NoopAnimationsModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        pageObject = new PageObject(fixture);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Parses color', () => {
        expect(testComponent.component.currentColor).toEqual([0, 255, 0]);
        expect(testComponent.component.point).toEqual([1, 0]);
        expect(testComponent.component.opacity).toBe(1);
        expect(testComponent.component.hue).toBe(1 / 3);
    });

    it('Alpha linear picker exists if alpha is true', () => {
        expect(getAlphaLinearPicker()).toBeDefined();
    });

    it('Alpha linear picker does not exist if alpha is false', () => {
        testComponent.isAlphaEnabled = false;
        fixture.detectChanges();

        expect(getAlphaLinearPicker()).toBeNull();
    });

    function getAlphaLinearPicker(): DebugElement | null {
        return pageObject.getByAutomationId('tui-linear-picker__alpha');
    }
});
