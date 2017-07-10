import { Component, Input, OnInit } from '@angular/core';
import { Validators } from '@angular/forms';
import { CustomValidators } from 'ng2-validation';
import { AbstractInput } from './abstract-input.component';

@Component({
    moduleId: module.id,
    selector: 'number-input',
    templateUrl: 'number-input.component.html',
    styleUrls: ['form-input.component.css']
})
export class NumberInputComponent extends AbstractInput implements OnInit {
    @Input() public step: number = 1;
    @Input() public min: number = null;
    @Input() public max: number = null;

    constructor() {
        super();
    }

    ngOnInit() {
        super.ngOnInit();
        this.addValidatorsToFormControl();
    }

    public addValidatorsToFormControl() {
        let validators: any = [];
        if (this.required) {
            validators.push(Validators.required);
        }
        validators.push(CustomValidators.number);

        if (this.min && this.max) {
            validators.push(CustomValidators.range([this.min, this.max]));
        } else if (this.min) {
            validators.push(CustomValidators.min(this.min));
        } else if (this.max) {
            validators.push(CustomValidators.max(this.max));
        }

        setTimeout( () => {
            this.formControl.setValidators(validators);
        });
    }
}
