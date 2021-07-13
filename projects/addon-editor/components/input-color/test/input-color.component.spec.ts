import {Component, ViewChild} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TuiTextMaskOptions} from '@taiga-ui/core';
import {NativeInputPO} from '@taiga-ui/testing';
import {TuiColorOptionsControllerModule} from '../../../directives/color-options-controller';
import {TuiInputColorComponent} from '../input-color.component';
import {TuiInputColorModule} from '../input-color.module';

@Component({
    template: `
        <tui-input-color
            [(ngModel)]="color"
            [tuiColorOptionsInputMask]="mask"
        ></tui-input-color>
    `,
})
class TestComponent {
    @ViewChild(TuiInputColorComponent)
    component: TuiInputColorComponent;

    color = '#0000ff';
    mask: TuiTextMaskOptions = {
        mask: ({length}) => new Array(length).fill(/./),
        guide: false,
    };
}

describe('InputColor', () => {
    let fixture: ComponentFixture<TestComponent>;
    let testComponent: TestComponent;
    let inputPO: NativeInputPO;

    beforeEach(() => {
        TestBed.configureTestingModule({
            imports: [
                TuiInputColorModule,
                TuiColorOptionsControllerModule,
                FormsModule,
                NoopAnimationsModule,
            ],
            declarations: [TestComponent],
        });

        fixture = TestBed.createComponent(TestComponent);
        testComponent = fixture.componentInstance;
        fixture.detectChanges();

        inputPO = new NativeInputPO(fixture, `tui-primitive-textfield__native-input`);
    });

    it('Plain string for single color', () => {
        expect(testComponent.component.background).toBe(testComponent.color);
    });

    it('Sanitized value for gradient', done => {
        testComponent.color = 'linear-gradient(#ff0000, #00ff00)';
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(typeof testComponent.component.background).toBe('object');
            done();
        });
    });

    it('Entering any text without mask should work', () => {
        inputPO.sendText('rgba(0, 0, 255, 1)');
        expect(inputPO.value).toBe('rgba(0, 0, 255, 1)');

        inputPO.sendText('#zzzzzz');
        expect(inputPO.value).toBe('#zzzzzz');

        inputPO.sendText('test');
        expect(inputPO.value).toBe('test');
    });

    it('Entering wrong text with hex mask should return empty string', () => {
        testComponent.mask = {
            mask: () => ['#', ...new Array(6).fill(/\d|[a-f]|[A-F]/)],
            guide: false,
        };

        inputPO.sendText('#zzzzzz');
        expect(inputPO.value).toBe('#');

        inputPO.sendText('#eaea00ff');
        expect(inputPO.value).toBe('#eaea00');

        inputPO.sendText('+');
        expect(inputPO.value).toBe('');
    });

    it('Entering right text with hex mask should return hex string', () => {
        testComponent.mask = {
            mask: () => ['#', ...new Array(6).fill(/\d|[a-f]|[A-F]/)],
            guide: false,
        };

        inputPO.sendText('#eaea00');

        expect(inputPO.value).toBe('#eaea00');
    });
});
