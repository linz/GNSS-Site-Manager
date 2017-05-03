import { AbstractControl, FormGroup } from '@angular/forms';

export abstract class AbstractGnssControls {
    private superForm: FormGroup;

    protected setForm(form: FormGroup) {
        this.superForm = form;
    }

    protected getErrorReport(controlId: string) {
        let errString: string = '';
        let control: AbstractControl;
        // Force an error as this field should have been set
        control = this.superForm.controls[controlId];
        if (!control) {
            console.warn('Control "' + controlId + '" doesnt exist on form.');
            return errString;
        }
        if (control.errors) {
            console.log('error report - control: ', controlId);
            for (let e of Object.keys(control.errors)) {
                console.log(e + ' -> ', control.errors[e]);
                errString += e;
                errString += ': ';
                errString += JSON.stringify(control.errors[e]);
            }
        }
        return errString;
    }

    protected isDirty(controlId: string): boolean {
        let control: AbstractControl;
        let valid: boolean = true;
        // Force an error as this field should have been set
        control = this.superForm.controls[controlId];
        if (!control || !control.errors) {
            valid = true;
        } else {
            valid = control.dirty;
        }
        console.warn('  isValid Control "' + controlId + ': '+ valid + ' - ', control);
        return valid;
    }

    protected isValid(controlId: string): boolean {
        let control: AbstractControl;
        let valid: boolean = true;
        // Force an error as this field should have been set
        control = this.superForm.controls[controlId];
        if (!control || !control.errors) {
            valid = true;
        } else {
            valid = control.valid;  //(Object.keys(control.errors).length === 0);
        }
        console.warn('  isValid Control "' + controlId + ': '+ valid + ' - ', control);
        return valid;
    }

    protected isInValid(controlId: string): boolean {
        let valid: boolean = this.isValid(controlId);
        // console.debug(`isInValid for ${controlId} - ${! valid}`);
        return !valid;
    }
}
