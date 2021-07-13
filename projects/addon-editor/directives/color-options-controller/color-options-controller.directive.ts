import {Directive, forwardRef, Input} from '@angular/core';
import {ColorPickerOutputFormats} from '@taiga-ui/addon-editor/interfaces';
import {TuiController, tuiDefaultProp} from '@taiga-ui/cdk';
import {TuiTextMaskOptions} from '@taiga-ui/core';
import {TUI_COLOR_OPTIONS_CONTROLLER} from './color-options-controller.token';

@Directive({
    selector:
        '[tuiColorOptionsModeEnabled], [tuiColorOptionsAlphaEnabled], [tuiColorOptionsOutputFormat], [tuiColorOptionsInputMask]',
    providers: [
        {
            provide: TUI_COLOR_OPTIONS_CONTROLLER,
            useExisting: forwardRef(() => TuiColorOptionsControllerDirective),
        },
    ],
})
export class TuiColorOptionsControllerDirective extends TuiController {
    @Input('tuiColorOptionsModeEnabled')
    @tuiDefaultProp()
    isModeEnabled = true;

    @Input('tuiColorOptionsAlphaEnabled')
    @tuiDefaultProp()
    isAlphaEnabled = true;

    @Input('tuiColorOptionsOutputFormat')
    @tuiDefaultProp()
    outputFormat: ColorPickerOutputFormats = 'rgb';

    @Input('tuiColorOptionsInputMask')
    @tuiDefaultProp()
    inputMask: TuiTextMaskOptions = {
        mask: ({length}) => new Array(length).fill(/./),
        guide: false,
    };
}
