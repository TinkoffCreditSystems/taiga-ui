import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {TuiColorSelectorModule} from '@taiga-ui/addon-editor/components/color-selector';
import {TuiColorOptionsControllerModule} from '@taiga-ui/addon-editor/directives/color-options-controller';
import {TuiActiveZoneModule} from '@taiga-ui/cdk';
import {
    TuiHintControllerModule,
    TuiHostedDropdownModule,
    TuiPrimitiveTextfieldModule,
    TuiTextfieldControllerModule,
} from '@taiga-ui/core';
import {PolymorpheusModule} from '@tinkoff/ng-polymorpheus';
import {TextMaskModule} from 'angular2-text-mask';

import {TuiInputColorComponent} from './input-color.component';

@NgModule({
    imports: [
        CommonModule,
        TextMaskModule,
        TuiPrimitiveTextfieldModule,
        TuiTextfieldControllerModule,
        TuiColorOptionsControllerModule,
        TuiHintControllerModule,
        PolymorpheusModule,
        TuiHostedDropdownModule,
        TuiColorSelectorModule,
        TuiActiveZoneModule,
    ],
    declarations: [TuiInputColorComponent],
    exports: [TuiInputColorComponent],
})
export class TuiInputColorModule {}
