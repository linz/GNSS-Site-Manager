import { Component, Input, Output, EventEmitter, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, AbstractControl, FormGroup, NG_VALIDATORS } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';

@Component({
    moduleId: module.id,
    selector: 'text-input2',
    templateUrl: 'text-input.component2.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => TextInputComponent2),
        multi: true
    }]
})
export class TextInputComponent2 extends AbstractGnssControls implements ControlValueAccessor, OnInit {
    private _value: string = '';
    @Input() index: string = '0';
    @Input() name: string = '';
    @Input() label: string = '';
    // controlName & form needed for validation
    @Input() controlName: string;
    @Input() form: FormGroup;

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    ngOnInit() {
        this.checkPreConditions();
        super.setForm(this.form);
    }

    private checkPreConditions() {
        if (!this.controlName || this.controlName.length === 0) {
            console.error('TextAreaInputComponent - controlName Input is required');
        }
        if (!this.form) {
            console.error('TextAreaInputComponent - form Input is required');
        }
    }


    get value(): string {
        return this._value;
    }

    set value(value: string) {
        if (value !== undefined && value !== this._value) {
            this._value = value;
            this.propagateChange(value);
        }
    }

    writeValue(value: string) {
        if (value !== undefined && value !== this.value) {
            this.value = value;
        }
    }


    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }
}
