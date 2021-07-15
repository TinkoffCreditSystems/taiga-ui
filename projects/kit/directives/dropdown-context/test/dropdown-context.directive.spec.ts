import {Component} from '@angular/core';
import {ComponentFixture, TestBed} from '@angular/core/testing';
import {By} from '@angular/platform-browser';
import {NoopAnimationsModule} from '@angular/platform-browser/animations';
import {TuiRootModule} from '@taiga-ui/core';
import {TuiDropdownContextModule} from '@taiga-ui/kit/directives';
import {configureTestSuite} from 'ng-bullet';

describe('TuiDropdownContext directive', () => {
    @Component({
        template: `
            <tui-root>
                <p [tuiDropdownContext]="ref" id="root">Some dumb text</p>

                <ng-template #ref>
                    <p id="insideDropdown">Text inside dropdown</p>
                </ng-template>
            </tui-root>
        `,
    })
    class TestComponent {}

    configureTestSuite(() => {
        TestBed.configureTestingModule({
            imports: [NoopAnimationsModule, TuiRootModule, TuiDropdownContextModule],
            declarations: [TestComponent],
        });
    });

    const rightClickEvent = new MouseEvent('contextmenu');
    const leftClickEvent = new MouseEvent('click');
    const escButtonEvent = new KeyboardEvent('keydown', {key: 'escape'});
    let fixture: ComponentFixture<TestComponent>;

    beforeEach(() => {
        fixture = TestBed.createComponent(TestComponent);
        fixture.detectChanges();
    });

    it('dont show dropdown if NO right-click was made', () => {
        expect(getTextInsideDropdown()).toBeNull();
    });

    it('dont show dropdown if left-click was made', () => {
        dispatchEventFromRoot(leftClickEvent);

        expect(getTextInsideDropdown()).toBeNull();
    });

    it('show dropdown if right-click was made', () => {
        dispatchEventFromRoot(rightClickEvent);

        expect(getTextInsideDropdown()).toBe('Text inside dropdown');
    });

    it('close dropdown on esc button', done => {
        dispatchEventFromRoot(rightClickEvent);
        fixture.detectChanges();

        expect(getTextInsideDropdown()).toBe('Text inside dropdown');
        document.dispatchEvent(escButtonEvent);
        fixture.detectChanges();

        fixture.whenStable().then(() => {
            expect(getTextInsideDropdown()).toBeNull();
            done();
        });
    });

    function getTextInsideDropdown(): string | null {
        return (
            fixture.debugElement.query(By.css('#insideDropdown'))?.nativeElement
                ?.textContent || null
        );
    }

    function getRootBlock(): HTMLElement | null {
        return fixture.debugElement.query(By.css('#root'))?.nativeElement || null;
    }

    function dispatchEventFromRoot(event: Event): void {
        getRootBlock()?.dispatchEvent(event);
        fixture.detectChanges();
    }
});
