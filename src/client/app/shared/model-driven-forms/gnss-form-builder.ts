import { Injectable } from '@angular/core';
import { FormGroup, FormArray, Validators, AbstractControl, FormControl, FormBuilder } from '@angular/forms';

/**
 * Service to assist in making model drive forms.  I've asked the question of if there is an ETA for "getValidators():[]" at https://github.com/angular/angular/issues/13461.
 * If too far away then I will do work on this - put on hold for the moment.
 */
@Injectable()
export class GnssFormBuilder {

    /**
     * This creates a FormGroup to crate a Model Driven Form as in https://angular.io/docs/ts/latest/api/forms/index/FormGroup-class.html#!#controls-anchor.
     * The main motivation for this is to have access to the Validators to enable more control in the templates.  Angular 2 currently doesn't have a better
     * wat to do this - see https://github.com/angular/angular/issues/13461.
     */
    public formBuilder(formName: string, controlsConfig: { [key: string]: any; }): FormGroup {
        //this.formBuilder.group({
        return null;
    }
}
