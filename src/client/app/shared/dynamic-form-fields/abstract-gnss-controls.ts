import { AbstractControl, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

export abstract class AbstractGnssControls {
    @Input() controlName: string;
    @Input() form: FormGroup;

    private superForm: FormGroup;

    protected setForm(form: FormGroup) {
        this.superForm = form;
    }

    protected getErrorReport(controlId: string) {
        if (! controlId) {
            controlId = this.controlName;
        }
        let errString: string = '';
        let control: AbstractControl;
        // Force an error as this field should have been set
        control = this.superForm.controls[controlId];
        if (!control) {
            console.warn('Control "' + controlId + '" doesnt exist on form.');
            return errString;
        }
        if (control.errors) {
            for (let e of Object.keys(control.errors)) {
                if (errString.length > 0) {
                    errString += ', ';
                }
                if (e === 'maxlength') {
                    errString += 'Maximum length exceeded: ' + control.errors[e].requiredLength;
                } else if (e === 'minlength') {
                    errString += 'Minimum length not reached: ' + control.errors[e].requiredLength;
                } else if (e === 'pattern') {
                    errString += 'pattern required: ' + control.errors[e].requiredPattern.toString();
                } else if (e === 'required') {
                    errString += 'Field required';
                } else if (e === 'outside_range') {
                    errString += 'Outside range: '+control.errors[e];
                } else if (e === 'invalid_datetime_format') {
                    errString += control.errors[e];
                } else {
                    errString += e;
                    errString += JSON.stringify(control.errors[e]);
                }
            }
        }
        return errString;
    }

    protected isDirty(controlId: string): boolean {
        let control: AbstractControl;
        let dirty: boolean = true;
        control = this.superForm.controls[controlId];
        if (!control) {
            dirty = false;
        } else {
            dirty = control.dirty;
        }
        return dirty;
    }

    protected isValid(controlId: string): boolean {
        let control: AbstractControl;
        let valid: boolean = true;
        control = this.superForm.controls[controlId];
        if (!control) {
            valid = true;
        } else {
            valid = control.valid;
        }
        return valid;
    }

    protected isInvalid(controlId: string): boolean {
        let valid: boolean = this.isValid(controlId);
        return !valid;
    }

    protected ignoreEvent(event: UIEvent) {
        event.stopPropagation();
    }
}
