import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ValidatorFn } from '@angular/forms';
import { AbstractGnssControls } from './abstract-gnss-controls';
import { MiscUtils } from '../global/misc-utils';

const CHILD_FORM_VALUE_ACCESSOR = {
    provide: NG_VALUE_ACCESSOR,
    useExisting: forwardRef(() => NumberInputComponent),
    multi: true
};

const CHILD_FORM_VALIDATORS = {
    provide: NG_VALIDATORS,
    useExisting: forwardRef(() => NumberInputComponent),
    multi: true
};

function validatorFnFactory(min: number, max: number) {
    if (min === null) {
        min = Number.MIN_SAFE_INTEGER ;
    }
    if (max === null) {
        max = Number.MAX_SAFE_INTEGER;
    }
    return (control: FormControl): any => {
        let value: number = MiscUtils.stringToNumber(control.value);
        if (value && (value < min || value > max)) {
            let arg: string = min+'..'+max;
            return {outside_range: arg};
        }
        return null;
    }
}

@Component({
    moduleId: module.id,
    selector: 'number-input',
    templateUrl: 'number-input.component.html',
    styleUrls: ['form-input.component.css'],
        providers: [CHILD_FORM_VALUE_ACCESSOR, CHILD_FORM_VALIDATORS]
})
export class NumberInputComponent extends AbstractGnssControls implements ControlValueAccessor, OnInit {
    @Input() index: string = '0';
    @Input() name: string = '';
    @Input() public label: string = '';
    @Input() public required: boolean = false;
    @Input() public step: string = '';
    @Input() public min: string = '';
    @Input() public max: string = '';

    private validator: ValidatorFn;

    private _value: string = '';
    private minNumber: number;
    private maxNumber: number;

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    ngOnInit() {
        this.checkPreConditions();

        this.maxNumber = MiscUtils.stringToNumber(this.max);
        this.minNumber = MiscUtils.stringToNumber(this.min);
        this.validator = validatorFnFactory(this.minNumber, this.maxNumber);

        super.setForm(this.form);
    }

    get value(): string {
        return this._value;
    }

    set value(value: string) {
        let valueNumber: number = MiscUtils.stringToNumber(value);
        if (value && value !== this._value && MiscUtils.isNumeric(valueNumber) && valueNumber >= this.minNumber && valueNumber <= this.maxNumber) {
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

    private checkPreConditions() {
        if (!this.controlName || this.controlName.length === 0) {
            console.error('NumberInputComponent - controlName Input is required');
        }
        if (!this.form) {
            console.error('NumberInputComponent - form Input is required');
        }
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}
