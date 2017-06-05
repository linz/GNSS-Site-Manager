import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
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
    private cartesianPosition: FormGroup;
    private geodeticPosition: FormGroup;

    private siteLocation: any;

    constructor(private userAuthService: UserAuthService,
                private formBuilder: FormBuilder,
                private changeDetectionRef: ChangeDetectorRef) {
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
        this.cartesianPosition = this.formBuilder.group({
            cartesianPosition_x: [''],
            cartesianPosition_y: [''],
            cartesianPosition_z: ['']
        });
        this.geodeticPosition =  this.formBuilder.group({
            geodeticPosition_lat: [''],
            geodeticPosition_long: [''],
            geodeticPosition_height: ['']
        });
        this.siteLocationForm = this.formBuilder.group({
            city: ['', [Validators.maxLength(100)]],
            state: ['', [Validators.maxLength(100)]],
            countryCodeISO: ['', [Validators.maxLength(10)]],
            cartesianPosition: this.cartesianPosition,
            geodeticPosition: this.geodeticPosition,
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
}

