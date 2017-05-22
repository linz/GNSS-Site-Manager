import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { MiscUtils } from '../shared/index';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { UserAuthService } from '../shared/global/user-auth.service';

/**
 * This class represents the SiteIdentification sub-component under the SiteInformation Component.
 *
 * Main fields of Site Identification (from https://igscb.jpl.nasa.gov/igscb/station/general/blank.log):
 * -----------------------------------------------------------------------------------------------------
 *      Site Name                :
 *      Four Character ID        : (A4)
 *      Monument Inscription     :
 *      IERS DOMES Number        : (A9)
 *      CDP Number               : (A4)
 *      Monument Description     : (PILLAR/BRASS PLATE/STEEL MAST/etc)
 *        Height of the Monument : (m)
 *        Monument Foundation    : (STEEL RODS, CONCRETE BLOCK, ROOF, etc)
 *        Foundation Depth       : (m)
 *      Marker Description       : (CHISELLED CROSS/DIVOT/BRASS NAIL/etc)
 *      Date Installed           : (CCYY-MM-DDThh:mmZ)
 *      Geologic Characteristic  : (BEDROCK/CLAY/CONGLOMERATE/GRAVEL/SAND/etc)
 *        Bedrock Type           : (IGNEOUS/METAMORPHIC/SEDIMENTARY)
 *        Bedrock Condition      : (FRESH/JOINTED/WEATHERED)
 *        Fracture Spacing       : (1-10 cm/11-50 cm/51-200 cm/over 200 cm)
 *        Fault zones nearby     : (YES/NO/Name of the zone)
 *          Distance/activity    : (multiple lines)
 *      Additional Information   : (multiple lines)
 * -----------------------------------------------------------------------------------------------------------
 */
@Component({
    moduleId: module.id,
    selector: 'site-identification',
    templateUrl: 'site-identification.component.html'
})
export class SiteIdentificationComponent implements OnInit {
    @Input('parentForm') parentForm: FormGroup;

    status: any = {
        isSiteIdentificationGroupOpen: false
    };

    @Input()
    set siteLogModel(siteLogModel: any) {
        // Avoid errors that occurs when this form is built before the data is loaded
        if (siteLogModel && Object.keys(siteLogModel).length > 0) {
            this._siteLogModel = siteLogModel;
            this.siteIdentification = siteLogModel.siteIdentification;
            this.siteIdentificationForm.setValue(this.siteIdentification);
            this.changeDetectionRef.detectChanges();
        }
    }

    private miscUtils: any = MiscUtils;

    private siteIdentificationForm: FormGroup;

    private _siteLogModel: any;
    private _originalSiteLogModel: any;

    private siteIdentification: any;
    private siteIdentificationOrig: any;

    get siteLogModel(): any {
        return this._siteLogModel;
    }

    @Input()
    set originalSiteLogModel(originalSiteLogModel: any) {
        this._originalSiteLogModel = originalSiteLogModel;
        this.siteIdentificationOrig = originalSiteLogModel &&
            Object.keys(originalSiteLogModel).length > 0 ? originalSiteLogModel.siteIdentification : {};
    }

    get originalSiteLogModel(): any {
        return this._originalSiteLogModel;
    }

    constructor(private userAuthService: UserAuthService,
                private formBuilder: FormBuilder,
                private changeDetectionRef: ChangeDetectorRef) {
    }

    ngOnInit() {
        this.setupForm();
    }

    public isFormDirty(): boolean {
        return this.siteIdentificationForm ? this.siteIdentificationForm.dirty : false;
    }

    public isFormInvalid(): boolean {
        return this.siteIdentificationForm.invalid;
    }

    private setupForm() {
        this.siteIdentificationForm = this.formBuilder.group({
            siteName: [''],//, [Validators.minLength(4), Validators.maxLength(100)]],
            fourCharacterID: [''],//, [Validators.required, Validators.minLength(4), Validators.maxLength(9)]],
            monumentInscription: [''],//, [Validators.maxLength(100)]],
            iersDOMESNumber: [''],//, [Validators.maxLength(100)]],
            cdpNumber: [''],//, [Validators.maxLength(100)]],
            monumentDescription: [''],//, [Validators.maxLength(100)]],
            heightOfTheMonument: '',
            monumentFoundation: [''],//, [Validators.maxLength(100)]],
            foundationDepth: '',
            markerDescription: [''],//, [Validators.maxLength(100)]],
            dateInstalled: [''],//, [Validators.maxLength(100)]],
            geologicCharacteristic: [''],//, [Validators.maxLength(100)]],
            bedrockType: [''],//, [Validators.maxLength(100)]],
            bedrockCondition: [''],//, [Validators.maxLength(100)]],
            fractureSpacing: [''],//, [Validators.maxLength(100)]],
            faultZonesNearby: [''],//, [Validators.maxLength(100)]],
            distanceActivity: [''],//, [Validators.maxLength(100)]],
            notes: [''],//, [Validators.maxLength(2000)]],
        });
        if (this.userAuthService.hasAuthorityToEditSite()) {
            this.siteIdentificationForm.enable();
        } else {
            this.siteIdentificationForm.disable();
        }
        this.parentForm.addControl('siteIdentification', this.siteIdentificationForm);
    }
}

