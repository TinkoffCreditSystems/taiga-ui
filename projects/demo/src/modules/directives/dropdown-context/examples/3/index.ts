import {Component} from '@angular/core';
import {FormControl, FormGroup} from '@angular/forms';
import {changeDetection} from '../../../../../change-detection-strategy';
import {encapsulation} from '../../../../../view-encapsulation';

@Component({
    selector: 'tui-dropdown-context-example-3',
    templateUrl: './index.html',
    styleUrls: ['./index.less'],
    changeDetection,
    encapsulation,
})
export class TuiDropdownContextExample3 {
    testForm = new FormGroup({
        reportText: new FormControl('Misspell HERE!'),
    });

    report(textId: string) {
        console.log({...this.testForm.value, textId});
    }
}
