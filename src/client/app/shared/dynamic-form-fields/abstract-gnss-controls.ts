import { AbstractControl, FormGroup } from '@angular/forms';
import { Input } from '@angular/core';

export const validDatetimeFormat: RegExp = /^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2]\d|3[0-1]) ([0-1]\d|2[0-3]):([0-5]\d):([0-5]\d)$/g;
export const validDatetimeFormatHuman: string = 'YYYY-MM-DD hh:mm:ss';

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
            // console.log('error report - control: ', controlId);
            for (let e of Object.keys(control.errors)) {
                // console.log(e + ' -> ', control.errors[e]);
                if (errString.length > 0) {
                    errString += ", ";
                }
                if (e === 'maxlength') {
                    errString += 'Maximum length exceeded: ' + control.errors[e].requiredLength;
                } else if (e === 'minlength') {
                    errString += 'Minimum length not reached: ' + control.errors[e].requiredLength;
                } else if (e === 'pattern') {
                    let pat: string;
                    if (control.errors[e].requiredPattern === validDatetimeFormat.toString()) {
                        pat = validDatetimeFormatHuman;
                    } else {
                        pat = control.errors[e].requiredPattern.toString();
                    }
                    errString += 'pattern required: ' + pat;
                } else if (e === 'required') {
                    errString += 'Field required';
                } else if (e === 'outside_range') {
                    errString += 'Outside range: '+control.errors[e];
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
        // console.warn('  isDirty Control "' + controlId + '": '+ dirty + ' - ', control);
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
        // console.warn('  isValid Control "' + controlId + '": '+ valid + ' - ', control);
        return valid;
    }

    protected isInvalid(controlId: string): boolean {
        let valid: boolean = this.isValid(controlId);
        return !valid;
    }
}
