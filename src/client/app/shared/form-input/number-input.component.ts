import { Component, Input, OnInit, forwardRef } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, NG_VALIDATORS, FormControl, ValidatorFn } from '@angular/forms';
import { AbstractInput } from './abstract-input.component';
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
    };
}

@Component({
    moduleId: module.id,
    selector: 'number-input',
    templateUrl: 'number-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [CHILD_FORM_VALUE_ACCESSOR, CHILD_FORM_VALIDATORS]
})
export class NumberInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() public step: string = '1';
    @Input() public min: string = '';
    @Input() public max: string = '';

    private validator: ValidatorFn;

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        let maxNumber: number = MiscUtils.stringToNumber(this.max);
        let minNumber: number = MiscUtils.stringToNumber(this.min);
        this.validator = validatorFnFactory(minNumber, maxNumber);
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    validate(c: FormControl) {
        return this.validator(c);
    }
}
