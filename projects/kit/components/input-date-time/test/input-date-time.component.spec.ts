import {Component, DebugElement} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {FormControl, ReactiveFormsModule} from '@angular/forms';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TuiDay} from '@taiga-ui/cdk';
import {TuiRootModule} from '@taiga-ui/core';
import {TuiInputDateTimeModule} from '@taiga-ui/kit/components';
import {NativeInputPO, PageObject} from '@taiga-ui/testing';
import {configureTestSuite} from 'ng-bullet';

@Component({
    template: `
        <tui-root>
            <tui-input-date-time [formControl]="control"></tui-input-date-time>
        </tui-root>
    `,
})
class TestComponent {
    readonly control = new FormControl([new TuiDay(2021, 6, 12), null]);
}

describe('InputDateTime', () => {
    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [
                TuiRootModule,
                ReactiveFormsModule,
                NoopAnimationsModule,
                TuiInputDateTimeModule,
            ],
            declarations: [TestComponent],
        });
    });

    let fixture: ComponentFixture<TestComponent>;
    let inputPO: NativeInputPO;
    let pageObject: PageObject<TestComponent>;
    const testContext = {
        get prefix() {
            return 'tui-input-date-time__';
        },
        get calendarCellAutomationId() {
            return 'tui-primitive-calendar__cell';
        },
        get nativeInputAutomationId() {
            return 'tui-primitive-textfield__native-input';
        },
    };

    beforeEach(done => {
        fixture = TestBed.createComponent(TestComponent);
        pageObject = new PageObject(fixture);
        inputPO = new NativeInputPO(fixture, testContext.nativeInputAutomationId);

        fixture.whenStable().then(() => {
            fixture.detectChanges();
            done();
        });
    });

    it('displays initial value', done => {
        fixture.whenStable().then(() => {
            expect(inputPO.value).toBe('12.07.2021');
            done();
        });
    });

    it('does not clear not finished time string on the first blur', done => {
        fixture
            .whenStable()
            .then(() => {
                inputPO.sendText('12.07.2021 1');
                inputPO.blur();

                return fixture.whenStable();
            })
            .then(() => {
                expect(inputPO.value).toBe('12.07.2021, 1');
                done();
            });
    });

    it('does not clear not finished time string on the second blur', done => {
        inputPO.focus();
        inputPO.blur();

        fixture
            .whenStable()
            .then(() => {
                inputPO.sendText('12.07.20211');
                inputPO.blur();

                return fixture.whenStable();
            })
            .then(() => {
                expect(inputPO.value).toBe('12.07.2021, 1');
                done();
            });
    });

    it('does not clear all date string if 1 char of date was erased', done => {
        inputPO.sendText('14.07.2021');

        fixture
            .whenStable()
            .then(() => {
                inputPO.sendText('14.07.202');

                return fixture.whenStable();
            })
            .then(() => {
                expect(inputPO.value).toBe('14.07.202');
                done();
            });
    });

    it('keeps not finished time string if date was changed using calendar', done => {
        const TIME_STRING = '1';

        fixture
            .whenStable()
            .then(() => {
                inputPO.sendText(`05.07.2021${TIME_STRING}`);
                mouseDownOnTextfield();

                return fixture.whenStable();
            })
            .then(() => {
                expect(inputPO.value).toBe(`05.07.2021, ${TIME_STRING}`);
                expect(getCalendar()).not.toBeFalsy();
                clickOnCellInsideCalendar(27);

                return fixture.whenStable();
            })
            .then(() => {
                expect(inputPO.value).toBe(`27.07.2021, ${TIME_STRING}`);

                done();
            });
    });

    it('keeps finished time string if date was changed using calendar', done => {
        const TIME = '18:00';
        const TIME_RAW = TIME.replace(':', '');

        fixture
            .whenStable()
            .then(() => {
                inputPO.sendText(`14.07.2021${TIME_RAW}`);
                mouseDownOnTextfield();

                return fixture.whenStable();
            })
            .then(() => {
                expect(inputPO.value).toBe(`14.07.2021, ${TIME}`);
                expect(getCalendar()).not.toBeFalsy();
                clickOnCellInsideCalendar(10);

                return fixture.whenStable();
            })
            .then(() => {
                expect(inputPO.value).toBe(`10.07.2021, ${TIME}`);

                done();
            });
    });

    function clickOnCellInsideCalendar(dayNumber: number): void {
        const cells = pageObject.getAllByAutomationId(
            testContext.calendarCellAutomationId,
        );
        const cell = cells.find(
            debugEl => debugEl.nativeElement.textContent.trim() === `${dayNumber}`,
        );

        cell?.nativeElement.click();
        fixture.detectChanges();
    }

    function mouseDownOnTextfield() {
        getTextfield()!.nativeElement.dispatchEvent(
            new MouseEvent('mousedown', {bubbles: true}),
        );
        getTextfield()!.nativeElement.click();
        fixture.detectChanges();
    }

    function getTextfield(): DebugElement | null {
        return pageObject.getByAutomationId(`${testContext.prefix}textfield`);
    }

    function getCalendar(): DebugElement | null {
        return pageObject.getByAutomationId(`${testContext.prefix}calendar`);
    }
});
