import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';

@Component({
    moduleId: module.id,
    selector: 'textarea-input',
    templateUrl: 'textarea-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [
        {
            provide: NG_VALUE_ACCESSOR,
            useExisting: forwardRef(() => TextAreaInputComponent),
            multi: true
        }
    ]
})
export class TextAreaInputComponent extends AbstractGnssControls implements ControlValueAccessor, OnInit {
    @Input() rows: number = 2;
    @Input() maxlength: number = 10000;

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    constructor() {
        super();
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }
}
