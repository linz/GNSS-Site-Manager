import { Component, Input, forwardRef, OnInit } from '@angular/core';
import { ControlValueAccessor, NG_VALUE_ACCESSOR, Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'url-input',
    templateUrl: 'text-input.component.html',
    styleUrls: ['form-input.component.css'],
    providers: [{
        provide: NG_VALUE_ACCESSOR,
        useExisting: forwardRef(() => UrlInputComponent),
        multi: true
    }]
})
export class UrlInputComponent extends AbstractInput implements ControlValueAccessor, OnInit {
    @Input() readonly: string = null;

    propagateChange: Function = (_: any) => { };
    propagateTouch: Function = () => { };

    constructor() {
        super();
    }

   /**
    * Initialize relevant variables when the directive is instantiated
    */
    ngOnInit() {
        super.ngOnInit();
        this.addValidatorsToFormControl();
    }

    public addValidatorsToFormControl() {
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        validators.push(CustomValidators.url);
        setTimeout( () => {
            this.formControl.setValidators(validators);
        });
    }

    writeValue(value: string) {}

    registerOnChange(fn: Function) {
        this.propagateChange = fn;
    }

    registerOnTouched(fn: Function) {
        this.propagateTouch = fn;
    }

    public getReadonlyAttribute(): string {
        return this.readonly;
    }
}
