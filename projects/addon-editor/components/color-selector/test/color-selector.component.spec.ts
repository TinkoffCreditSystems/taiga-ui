import {Component, DebugElement, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {PageObject} from '@taiga-ui/testing';
import {TuiColorOptionsControllerModule} from '../../../directives/color-options-controller';
import {ColorPickerOutputFormats} from '../../../interfaces/color-picker-options';
import {TuiColorSelectorComponent} from '../color-selector.component';
import {TuiColorSelectorModule} from '../color-selector.module';

@Component({
    template: `
        <tui-color-selector
            [colors]="colors"
            [(color)]="color"
            (colorChange)="onValueChange($event)"
            [tuiColorOptionsModeEnabled]="isModeEnabled"
            [tuiColorOptionsOutputFormat]="format"
            [tuiColorOptionsAlphaEnabled]="isAlphaEnabled"
        ></tui-color-selector>
    `,
})
class TestComponent {
    @ViewChild(TuiColorSelectorComponent)
    component: TuiColorSelectorComponent;

    onValueChange(textValue: string) {
        this.outsideColor = textValue;
    }

    colors = new Map([
        ['hap', '#ff0000'],
        ['ica', 'linear-gradient(red, blue)'],
    ]);

    outsideColor = '';
    color = '#0000ff';
    isModeEnabled = true;
    isAlphaEnabled = true;
    format: ColorPickerOutputFormats = 'rgb';
}

describe('ColorSelector', () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let pageObject: PageObject<TestComponent>;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TuiColorSelectorModule,
                TuiColorOptionsControllerModule,
                NoopAnimationsModule,
            ],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        pageObject = new PageObject(fixture);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();
    });

    it('Parses color', () => {
        expect(testComponent.component.color).toEqual([0, 0, 255, 1]);
    });

    it('Filters out gradients from palette', () => {
        expect(testComponent.component.palette.get('hap')).toBe('#ff0000');
        expect(testComponent.component.palette.get('ica')).toBeUndefined();
    });

    it('Mode dropdown exists if alpha is true', () => {
        expect(getModeDropdown()).toBeDefined();
    });

    it('Mode dropdown does not exist if mode is false', () => {
        testComponent.isModeEnabled = false;
        fixture.detectChanges();

        expect(getModeDropdown()).toBeNull();
    });

    it('Outside color is RGBA format by default', () => {
        testComponent.component.onColorChange([0, 0, 255, 1]);

        expect(testComponent.outsideColor).toEqual('rgba(0, 0, 255, 1)');
    });

    it('Outside color is RGB format if alpha is false', () => {
        testComponent.isAlphaEnabled = false;
        fixture.detectChanges();
        testComponent.component.onColorChange([0, 0, 255, 1]);

        expect(testComponent.outsideColor).toEqual('rgb(0, 0, 255)');
    });

    it('Outside color is HEX format with alpha if outside format is hex', () => {
        testComponent.format = 'hex';
        fixture.detectChanges();
        testComponent.component.onColorChange([0, 0, 255, 1]);

        expect(testComponent.outsideColor).toEqual('#0000ffff');
    });

    it('Outside color is HEX format without alpha if outside format is hex and alpha is false', () => {
        testComponent.format = 'hex';
        testComponent.isAlphaEnabled = false;
        fixture.detectChanges();
        testComponent.component.onColorChange([0, 0, 255, 1]);

        expect(testComponent.outsideColor).toEqual('#0000ff');
    });

    function getModeDropdown(): DebugElement | null {
        return pageObject.getByAutomationId('tui-hosted-dropdown__mode');
    }
});
