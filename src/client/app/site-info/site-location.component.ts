import { Component, OnInit, OnDestroy, ViewChild, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray, AbstractControl, FormControl } from '@angular/forms';
import { MiscUtils } from '../shared/global/misc-utils';
/**
 * This class represents the SiteInfoComponent & SiteIdentification for viewing and editing the details of site/receiver/antenna.
 */
@Component({
    moduleId: module.id,
    selector: 'site-location',
    templateUrl: 'site-location.component.html'
})
export class SiteLocationComponent implements OnInit, OnDestroy {
    @Input('siteInformationForm') siteInformationForm: FormGroup;

    status: any = {
        isSiteLocationGroupOpen: false
    };

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel && Object.keys(siteLogModel).length > 0) {
            this.siteLocation = siteLogModel.siteLocation;
            this.changeDetectionRef.detectChanges();
            this.patchForm();
        }
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        this.siteLocationOrig = originalSiteLogModel &&
        Object.keys(originalSiteLogModel).length > 0 ? originalSiteLogModel.siteLocation : {};
    }

    private miscUtils: any = MiscUtils;

    private siteLocationForm: FormGroup;

    private siteLocation: any;
    private siteLocationOrig: any;

    constructor(private formBuilder: FormBuilder, private changeDetectionRef: ChangeDetectorRef) {}

    ngOnInit() {
        this.setupForm();
        // patchForm is called from the setter in this form
    }

    ngOnDestroy() {

    }

    public isFormDirty(): boolean {
        return this.siteLocationForm ? this.siteLocationForm.dirty : false;
    }

    public isFormInvalid(): boolean {
        return this.siteLocationForm.invalid;
    }

    private setupForm() {
        this.siteLocationForm = this.formBuilder.group({
            city: ['', [Validators.maxLength(100)]],
            state: ['', [Validators.maxLength(100)]],
            countryCodeISO: ['', [Validators.maxLength(10)]],
            cartesianPosition_x: [''],
            cartesianPosition_y: [''],
            cartesianPosition_z: [''],
            geodeticPosition_lat: [''],
            geodeticPosition_long: [''],
            geodeticPosition_height: [''],
            tectonicPlate: ['', [Validators.maxLength(100)]],
            notes: ['', [Validators.maxLength(2000)]],
        });
        this.siteInformationForm.addControl('siteLocation', this.siteLocationForm);
    }

    private patchForm() {
        this.siteLocationForm.setValue(this.siteLocation);
    }
}

