import { Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';

export abstract class AbstractGnssControls implements OnInit {
    @Input() form: FormGroup;
    @Input() controlName: string;
    @Input() required: boolean = false;
    @Input() label: string = '';

    public formControl: FormControl;

    constructor() { }

   /**
    * Initialize relevant variables when the directive is instantiated
    */
    ngOnInit() {
        this.checkPreConditions();
        this.formControl = <FormControl>this.form.controls[this.controlName];
    }

    protected getErrorReport() {
        let errString: string = '';
        if (!this.formControl) {
            console.warn('Control "' + this.controlName + '" doesnt exist on form.');
            return errString;
        }
        if (this.formControl.errors) {
            for (let e of Object.keys(this.formControl.errors)) {
                if (errString.length > 0) {
                    errString += ', ';
                }
                if (e === 'maxlength') {
                    errString += 'Maximum length exceeded: ' + this.formControl.errors[e].requiredLength;
                } else if (e === 'minlength') {
                    errString += 'Minimum length not reached: ' + this.formControl.errors[e].requiredLength;
                } else if (e === 'pattern') {
                    errString += 'pattern required: ' + this.formControl.errors[e].requiredPattern.toString();
                } else if (e === 'required') {
                    errString += 'Field required';
                } else if (e === 'outside_range') {
                    errString += 'Outside range: '+this.formControl.errors[e];
                } else if (e === 'invalid_datetime_format') {
                    errString += this.formControl.errors[e];
                } else {
                    errString += e;
                    errString += JSON.stringify(this.formControl.errors[e]);
                }
            }
        }
        return errString;
    }

    protected isDirty(): boolean {
        return this.formControl && this.formControl.dirty;
    }

    protected isValid(): boolean {
        return this.formControl && this.formControl.valid;
    }

    protected isInvalid(): boolean {
        return this.formControl && this.formControl.invalid;
    }

    protected ignoreEvent(event: UIEvent) {
        event.stopPropagation();
    }

    private checkPreConditions() {
        if (!this.controlName || this.controlName.length === 0) {
            console.error('FormInputComponent - controlName input is required');
        }
        if (!this.form) {
            console.error('FormInputComponent - form input is required');
        }
    }
}
