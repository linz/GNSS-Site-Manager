import { Component, OnInit, Input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MiscUtils } from '../shared/global/misc-utils';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents the SiteLocation sub-component under the SiteInformation Component.
 *
 * Main fields of Site Location (from https://igscb.jpl.nasa.gov/igscb/station/general/blank.log):
 *     City or Town             :
 *     State or Province        :
 *     Country                  :
 *     Tectonic Plate           :
 *     Approximate Position (ITRF)
 *       X coordinate (m)       :
 *       Y coordinate (m)       :
 *       Z coordinate (m)       :
 *       Latitude (N is +)      : (+/-DDMMSS.SS)
 *       Longitude (E is +)     : (+/-DDDMMSS.SS)
 *       Elevation (m,ellips.)  : (F7.1)
 *     Additional Information   : (multiple lines)
 *
 */
@Component({
    moduleId: module.id,
    selector: 'site-location',
    templateUrl: 'site-location.component.html'
})
export class SiteLocationComponent implements OnInit {
    @Input('parentForm') parentForm: FormGroup;

    status: any = {
        isSiteLocationGroupOpen: false
    };

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel && Object.keys(siteLogModel).length > 0) {
            this.siteLocation = siteLogModel.siteLocation;
            this.siteLocationForm.setValue(this.siteLocation);
        }
    }

    public miscUtils: any = MiscUtils;

    private siteLocationForm: FormGroup;
    private cartesianPositionForm: FormGroup;
    private geodeticPositionForm: FormGroup;

    private siteLocation: any;

    constructor(private userAuthService: UserAuthService,
                private formBuilder: FormBuilder) {
    }

    ngOnInit() {
        this.setupForm();
    }

    public isFormDirty(): boolean {
        return this.siteLocationForm ? this.siteLocationForm.dirty : false;
    }

    public isFormInvalid(): boolean {
        return this.siteLocationForm.invalid;
    }

    private setupForm() {
        this.cartesianPositionForm = this.formBuilder.group({
            cartesianPositionX: ['', Validators.required],
            cartesianPositionY: ['', Validators.required],
            cartesianPositionZ: ['', Validators.required]
        });
        this.cartesianPositionForm.valueChanges.subscribe(
            (change: any) => this.handleLocationPositionGroupChange(change, this.cartesianPositionForm)
        );
        this.geodeticPositionForm = this.formBuilder.group({
            geodeticPositionLat: [''],
            geodeticPositionLong: [''],
            geodeticPositionHeight: ['']
        });
        this.geodeticPositionForm.valueChanges.subscribe(
            (change: any) => this.handleLocationPositionGroupChange(change, this.geodeticPositionForm)
        );
        this.siteLocationForm = this.formBuilder.group({
            city: ['', [Validators.maxLength(100)]],
            state: ['', [Validators.maxLength(100)]],
            countryCodeISO: ['', [Validators.maxLength(10)]],
            cartesianPosition: this.cartesianPositionForm,
            geodeticPosition: this.geodeticPositionForm,
            tectonicPlate: ['', [Validators.maxLength(100)]],
            notes: ['', [Validators.maxLength(2000)]],
        });
        if (this.userAuthService.hasAuthorityToEditSite()) {
            this.siteLocationForm.enable();
        } else {
            this.siteLocationForm.disable();
        }
        this.parentForm.addControl('siteLocation', this.siteLocationForm);
    }

    /**
     * The groups we have here are all or nothing.  The validators.required is set on each field in Geodetic Position and
     * cartesian Position but when no fields have a value then the group is optional.
     *
     * @param groupItems - the group items values that come from an OnChange subscription
     * @param positionGroup - the FormGroup that holds the items
     */
    private handleLocationPositionGroupChange(groupItems: any, positionGroup: FormGroup) {
        console.debug('location item change: ', groupItems);
        let someFieldHasValue: boolean = false;
        Object.keys(groupItems).forEach((key) => {
            if (groupItems[key]) {
                someFieldHasValue = true;
            }
        });

        // If any group Item form field has a value then all are required
        Object.keys(groupItems).forEach((key) => {
            let itemControl: AbstractControl = positionGroup.controls[key];
            if (!itemControl) {
                throw new Error(`Control for group item: ${key} doesnt exist in positionGroup: ${positionGroup}`);
            }
            if (someFieldHasValue) {
                if (!itemControl.validator) {
                    this.addRequiredValidator(itemControl, key);
                    itemControl.updateValueAndValidity();
                }
            } else {
                if (itemControl.validator) {
                    this.removeRequiredValidator(itemControl, key);
                    itemControl.updateValueAndValidity();
                }
            }
        });
    }

    private removeRequiredValidator(itemControl: AbstractControl, controlName: string) {
        console.debug(`Location - remove required validator from: ${controlName}`);
        itemControl.clearValidators();
    }

    private addRequiredValidator(itemControl: AbstractControl, controlName: string) {
        console.debug(`Location - add required validator to: ${controlName}`);
        itemControl.setValidators(Validators.required);
    }
}

