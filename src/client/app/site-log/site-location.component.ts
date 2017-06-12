import { Component, OnInit, Input, ChangeDetectorRef } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl } from '@angular/forms';
import { MiscUtils } from '../shared/global/misc-utils';
import { DialogService } from '../shared/index';
import { UserAuthService } from '../shared/global/user-auth.service';
import { SiteLogService, ApplicationState, ApplicationSaveState } from '../shared/site-log/site-log.service';
import { AbstractBaseComponent } from '../shared/abstract-groups-items/abstract-base.component';
import { SiteLocationViewModel } from './site-location-view-model';

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
export class SiteLocationComponent extends AbstractBaseComponent implements OnInit {

    public miscUtils: any = MiscUtils;
    public isOpen: boolean = false;
    public isNew: boolean = false;
    public isDeleted: boolean = false;

    @Input('parentForm') parentForm: FormGroup;

    @Input()
    set siteLogModel(siteLogModel: any) {
        if (siteLogModel && Object.keys(siteLogModel).length > 0) {
            this.siteLocation = siteLogModel.siteLocation;
            this.siteLocationForm.setValue(this.siteLocation);
        }
    }

    private siteLocationForm: FormGroup;
    private cartesianPositionForm: FormGroup;
    private geodeticPositionForm: FormGroup;
    private siteLocation: SiteLocationViewModel;

    constructor(protected userAuthService: UserAuthService,
                protected siteLogService: SiteLogService,
                protected dialogService: DialogService,
                protected formBuilder: FormBuilder,
                protected changeDetectionRef: ChangeDetectorRef) {
        super(userAuthService);
    }

    ngOnInit() {
        this.setupForm();
        this.siteLogService.getApplicationStateSubscription().subscribe((applicationState: ApplicationState) => {
            if (applicationState.applicationSaveState === ApplicationSaveState.saved) {
                this.isNew = false;
                this.isDeleted = false;
            }
        });
    }

    getItemName(): string {
        return 'Site Location';
    }

    getControlName(): string {
        return 'siteLocation';
    }

    public isFormDirty(): boolean {
        return this.siteLocationForm && this.siteLocationForm.dirty;
    }

    public isFormInvalid(): boolean {
        return this.siteLocationForm && this.siteLocationForm.invalid;
    }


    public isDeleteDisabled(): boolean {
        if (this.isNew) {
            return false;
        }
        return !super.isEditable() || this.isDeleted;
    }

    public getRemoveOrDeletedText(): string {
        return this.isNew ? 'Cancel' : 'Delete';
    }

    public addNew(event: UIEvent): void {
        event.preventDefault();
        this.isNew = true;
        this.isOpen = true;
        this.siteLocation = new SiteLocationViewModel();
        setTimeout(() => {
            if (this.siteLocationForm) {
                this.siteLocationForm.markAsDirty();
            }
        });
    }

    /**
     * Remove an item from the UI and delete if it is an existing record.
     */
    public removeItem(): boolean {

        if (this.isNew) {
            this.cancelNew();
        } else {
            this.dialogService.confirmDeleteDialog(
                this.getItemName(),
                (deleteReason : string) => {  // ok callback
                    this.deleteItem(deleteReason);
                },
                () => {  // cancel callback
                    console.log('delete cancelled by user');
                }
            );
        }
        return false;
    }

    public cancelNew() {
        this.siteLocation = null;
        this.isNew = false;
        if (this.siteLocationForm) {
            this.siteLocationForm.markAsPristine();
            this.parentForm.removeControl(this.getControlName());
        }
    }

    /**
     *  Mark an item for deletion with the given reason.
     */
    private deleteItem(deleteReason : string | null): void {
        this.isDeleted = true;
        let date: string = MiscUtils.getUTCDateTime();
        this.siteLocation.dateDeleted = date;
        this.siteLocation.deletedReason = deleteReason;
        if (this.siteLocationForm.controls['dateDeleted']) {
            this.siteLocationForm.controls['dateDeleted'].setValue(date);
        }
        if (this.siteLocationForm.controls['deletedReason']) {
            this.siteLocationForm.controls['deletedReason'].setValue(deleteReason);
        }
        this.siteLocationForm.markAsDirty();
        this.siteLocationForm.disable();
    }

    private setupForm() {
        this.cartesianPositionForm = this.formBuilder.group({
            x: ['', Validators.required],
            y: ['', Validators.required],
            z: ['', Validators.required]
        });
        this.cartesianPositionForm.valueChanges.subscribe(
            (change: any) => this.handleLocationPositionGroupChange(change, this.cartesianPositionForm)
        );
        this.geodeticPositionForm = this.formBuilder.group({
            lat: [''],
            lon: [''],
            height: ['']
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
            objectMap: [''],
            dateDeleted: [''],
            dateInserted: [''],
            deletedReason: ['']
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
        itemControl.clearValidators();
    }

    private addRequiredValidator(itemControl: AbstractControl, controlName: string) {
        itemControl.setValidators(Validators.required);
    }
}
