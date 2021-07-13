import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PageObject} from '@taiga-ui/testing';
import {TuiColorEditComponent} from '../color-edit.component';
import {TuiColorEditModule} from '../color-edit.module';

@Component({
    template: `
        <tui-color-edit
            [(color)]="color"
            [isAlphaEnabled]="isAlphaEnabled"
        ></tui-color-edit>
    `,
})
class TestComponent {
    @ViewChild(TuiColorEditComponent)
    component: TuiColorEditComponent;

    color = [255, 0, 0, 1];
    isAlphaEnabled = true;
}

describe('ColorEdit', () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: PageObject<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [TuiColorEditModule, NoopAnimationsModule],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        pageObject = new PageObject(fixture);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('HEX', () => {
        expect(testComponent.component.hex).toBe('ff0000');
    });

    it('Updates', () => {
        testComponent.component.onHexChange('00ff00');

        expect(testComponent.color).toEqual([0, 255, 0, 1]);
    });

    it('Does not trigger if HEX is not fully entered', () => {
        testComponent.component.onHexChange('00ff');

        expect(testComponent.color).toEqual([255, 0, 0, 1]);
    });

    it('Alpha input exists if alpha is true', () => {
        expect(getAlphaInput()).toBeDefined();
    });

    it('Alpha input does not exist if alpha is false', () => {
        testComponent.isAlphaEnabled = false;
        fixture.detectChanges();

        expect(getAlphaInput()).toBeNull();
    });

    function getAlphaInput(): DebugElement | null {
        return pageObject.getByAutomationId('tui-input-count__alpha');
    }
});
