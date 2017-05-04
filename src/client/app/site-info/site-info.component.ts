import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'oidc-client';
import {
    ConstantsService, DialogService, MiscUtils,
    SiteLogService, JsonDiffService, JsonCheckService
} from '../shared/index';
import { SiteLogViewModel, ViewSiteLog } from '../shared/json-data-view-model/view-model/site-log-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ResponsiblePartyType, ResponsiblePartyGroupComponent } from '../responsible-party/responsible-party-group.component';
import { FormBuilder, FormGroup, FormArray, FormControl } from '@angular/forms';
import * as _ from 'lodash';
import { GnssReceiversGroupComponent } from '../gnss-receiver/gnss-receivers-group.component';
import { FrequencyStandardGroupComponent } from '../frequency-standard/frequency-standard-group.component';
import { GnssAntennaGroupComponent } from '../gnss-antenna/gnss-antenna-group.component';
import { HumiditySensorsGroupComponent } from '../humidity-sensor/humidity-sensors-group.component';
import { PressureSensorsGroupComponent } from '../pressure-sensor/pressure-sensors-group.component';
import { LocalEpisodicEffectsGroupComponent } from '../local-episodic-effect/local-episodic-effects-group.component';
import { SurveyedLocalTiesGroupComponent } from '../surveyed-local-tie/surveyed-local-ties-group.component';
import { TemperatureSensorsGroupComponent } from '../temperature-sensor/temperature-sensors-group.component';
import { WaterVaporSensorsGroupComponent } from '../water-vapor-sensor/water-vapor-sensors-group.component';
import { AbstractViewModel } from '../shared/json-data-view-model/view-model/abstract-view-model';

/**
 * This class represents the SiteInfoComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-site-info',
    templateUrl: 'site-info.component.html'
})
export class SiteInfoComponent implements OnInit, OnDestroy {
    public miscUtils: any = MiscUtils;
    public siteInfoForm: FormGroup;
    public siteInformationForm: FormGroup;
    public hasEditRole: boolean = false;
    public responsiblePartyType: any = ResponsiblePartyType;
    public siteLogOrigin: ViewSiteLog;
    public siteLogModel: ViewSiteLog;

    private siteId: string;
    private isLoading: boolean = false;
    private siteIdentification: any = null;
    private siteLocation: any = {};
    private siteContacts: Array<any> = [];
    private errorMessage: string;
    private siteInfoTab: any = null;
    private submitted: boolean = false;
    private status: any = {
        oneAtATime: false,
        isSiteInfoGroupOpen: true,
        isSiteMediaOpen: false,
        isMetaCustodianOpen: false,
    };

    private authSubscription: Subscription;

    /**
     * Creates an instance of the SiteInfoComponent with the injected Router/ActivatedRoute/CorsSite Services.
     *
     * @param {Router} router - The injected Router.
     * @param {ActivatedRoute} route - The injected ActivatedRoute.
     * @param {DialogService} dialogService - The injected DialogService.
     * @param {SiteLogService} siteLogService - The injected SiteLogService.
     * @param {JsonDiffService} jsonDiffService - The injected JsonDiffService.
     */
    constructor(private router: Router,
                private route: ActivatedRoute,
                private dialogService: DialogService,
                private siteLogService: SiteLogService,
                private jsonDiffService: JsonDiffService,
                private jsonCheckService: JsonCheckService,
                private userAuthService: UserAuthService,
                private formBuilder: FormBuilder,
                private _changeDetectionRef: ChangeDetectorRef) {
    }

    /**
     * Initialise all data on loading the site-info page
     */
    public ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id: string = params['id'];
            this.siteId = id;
        });

        this.authSubscription = this.setupAuthSubscription();
        this.hasEditRole = this.userAuthService.hasAuthorityToEditSite(this.siteId);
        this.setupForm();
        this.loadSiteInfoData();
        this.setupSubscriptions();
    }

    /**
     * Retrieve relevant site/setup/log information from DB based on given Site Id
     */
    public loadSiteInfoData() {
        // Do not allow direct access to site-info page
        if (!this.siteId) {
            this.goToHomePage();
        }

        console.log('---------> SiteInfoComponent - Load / Revert ------------------------');
        this.isLoading = true;
        this.submitted = false;

        this.siteInfoTab = this.route.params.subscribe(() => {
            this.siteLogService.getSiteLogByFourCharacterIdUsingGeodesyML(this.siteId).subscribe(
                (responseJson: any) => {
                    this.siteLogModel = responseJson.siteLog;
                    console.debug('loadSiteInfoData - siteLogModel: ', this.siteLogModel);

                    this.backupSiteLogJson();
                    this.isLoading = false;
                    this.siteLogService.sendFormModifiedStateMessage(false);
                    this.dialogService.showSuccessMessage('Site log info loaded successfully for ' + this.siteId);
                },
                (error: Error) => {
                    this.errorMessage = <any>error;
                    this.isLoading = false;
                    this.dialogService.showErrorMessage('No site log info found for ' + this.siteId);
                }
            );
        });
    }

    /**
     * Clear all variables/arrays
     */
    public ngOnDestroy() {
        this.isLoading = false;
        this.hasEditRole = false;
        this.siteId = null;
        this.siteLogModel = null;
        this.siteIdentification = null;
        this.siteLocation = null;
        this.siteContacts.length = 0;
        this.status = null;
        this.errorMessage = '';
        if (this.authSubscription) {
            this.authSubscription.unsubscribe();
        }

        // It seems that ngOnDestroy is called when the object is destroyed, but ngOnInit isn't called every time an
        // object is created.  Hence this field might not have been created.
        if (this.siteInfoTab !== undefined && this.siteInfoTab !== null) {
            this.siteInfoTab.unsubscribe();
        }
    }

    /**
     * Save changes made back to siteLog XML
     */
    public save(formValue: any) {
        if (!formValue) {
            // Currently the toolbar save will pass null.  Just use siteInfoForm
            if (this.siteInfoForm.pristine) {
                return;
            }
            if (this.siteInfoForm.invalid) {
                console.warn('Cannot save SiteLog - it is invalid');
                this.dialogService.showErrorMessage('Cannot save SiteLog - it is invalid');
                return;
            }
            formValue = this.siteInfoForm.value;
        }
        console.log('---------> SiteInfoComponent - Save ------------------------');
        let formValueClone: any = _.cloneDeep(formValue);
        this.moveSiteInformationUp(formValueClone);

        /* Get the arrays in the form in the same order as the SiteLogModel */
        this.sortArrays(formValueClone);
        console.log(' formValue before merge and after reverse: ', formValueClone);

        /* Apply any new values from the form to the SiteLogModel.  NOTE that when any new items were created
         an inital copy was added to the SiteLogModel and SiteLogOrigin.  And in the form model too of course. */
        _.merge(this.siteLogModel, formValueClone);

        let diffMsg: string = this.jsonDiffService.getJsonDiffHtml(this.siteLogOrigin, this.siteLogModel);

        if (diffMsg === null || diffMsg.trim() === '') {
            this.dialogService.showLogMessage('No changes have been made for ' + this.siteId + '.');
            this.siteLogService.sendFormModifiedStateMessage(false);
            return;
        }

        this.removeDeletedItems();

        this.dialogService.confirmSaveDialog(
            () => {
                this.isLoading = true;
                this.submitted = true;
                let siteLogViewModel: SiteLogViewModel = new SiteLogViewModel();
                siteLogViewModel.siteLog = this.siteLogModel;
                this.siteLogService.saveSiteLog(siteLogViewModel).subscribe(
                    (responseJson: any) => {
                        this.isLoading = false;
                        this.siteInfoForm.markAsPristine();
                        this.siteLogService.sendFormModifiedStateMessage(false);
                        this.backupSiteLogJson();
                        this.dialogService.showSuccessMessage('Done in saving SiteLog data for ' + this.siteId);
                    },
                    (error: Error) => {
                        this.isLoading = false;
                        this.errorMessage = <any>error;
                        console.error(error);
                        this.dialogService.showErrorMessage('Error in saving SiteLog data for ' + this.siteId);
                    }
                );
            },
            () => {
                this.dialogService.showLogMessage('Cancelled in saving SiteLog data for ' + this.siteId);
                this.isLoading = false;
            }
        );
    }

    /**
     * Navigate to the default home page (Select-Site tab)
     */
    public goToHomePage() {
        let link = ['/'];
        this.router.navigate(link);
        this.isLoading = false;
    }

    /**
     * Return true if any of the SiteLog data have been changed.
     *
     * TODO: we may use other methods to detect changes, e.g., the form.$dirty variable
     */
    public hasChanges(): boolean {
        return this.jsonDiffService.isDiff(this.siteLogOrigin, this.siteLogModel);
    }

    /**
     * Popup a dialog prompting users whether or not to save changes if any before closing the site-info page
     */
    public confirmCloseSiteInfoPage(): Promise<boolean> {
        let msg: string = `You have made changes to the ${this.siteId} Site Log. Close the page will lose any unsaved changes.`;
        let that: any = this;
        return new Promise<boolean>((resolve, reject) => {
            this.dialogService.confirmCloseDialog(msg,
                function () {
                    that.dialogService.showLogMessage('Site Info page closed without saving changes made.');
                    resolve(true);
                },
                function () {
                    resolve(false);
                }
            );
        });
    }

    public backupSiteLogJson() {
        this.siteLogOrigin = MiscUtils.cloneJsonObj(this.siteLogModel);
    }

    public isFormDirty(): boolean {
        return this.siteInfoForm ? this.siteInfoForm.dirty : false;
    }

    public isFormInvalid(): boolean {
        return this.siteInfoForm ? !this.siteInfoForm.valid : false;
    }

    public isSiteInformationFormDirty(): boolean {
        return this.siteInformationForm ? this.siteInformationForm.dirty : false;
    }

    public isSiteInformationFormInvalid(): boolean {
        return this.siteInformationForm ? !this.siteInformationForm.valid : false;
    }

    private setupForm() {
        this.siteInformationForm = this.formBuilder.group({});
        this.siteInfoForm = this.formBuilder.group({});
        this.siteInfoForm.addControl('siteInformation', this.siteInformationForm);
    }

    private setupAuthSubscription(): Subscription {
        return this.userAuthService.userLoadededEvent.subscribe((user: User) => {
            this.hasEditRole = this.userAuthService.hasAuthorityToEditSite(this.siteId);
        });
    }

    /**
     * Template and Model driven forms are handled differently and separately
     */
    private setupSubscriptions() {
        this.siteInfoForm.valueChanges.debounceTime(500).subscribe((value: any) => {
            if (this.siteInfoForm.dirty) {
                this.siteLogService.sendFormModifiedStateMessage(true);
                console.log('form dirty - yes: ', value);
            } else {
                this.siteLogService.sendFormModifiedStateMessage(false);
                console.log('form dirty - no: ', value);
            }
        });

        this.siteInfoForm.statusChanges.debounceTime(500).subscribe((value: any) => {
            console.debug('form status change: ', this.siteInfoForm);
            if (this.siteInfoForm.dirty) {
                this.siteLogService.sendFormModifiedStateMessage(true);
                console.log('form dirty - yes: ', value);
            } else {
                this.siteLogService.sendFormModifiedStateMessage(false);
                console.log('form dirty - no: ', value);
            }
        });
    }

    private  returnAssociatedComparator(itemName: string): any {
        switch (itemName) {
            case 'siteLocation':
                console.warn(`createComparator - ${itemName} does not have a comparator`);
                // And this should never get called as it isn't an array
                return null;
            case 'siteIdentification':
                console.warn(`createComparator - ${itemName} does not have a comparator`);
                // And this should never get called as it isn't an array
                return null;
            case 'siteContact':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteMetadataCustodian':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteDataSource':
                return ResponsiblePartyGroupComponent.compare;
            case 'gnssReceivers':
                return GnssReceiversGroupComponent.compare;
            case 'gnssAntennas':
                return GnssAntennaGroupComponent.compare;
            case 'frequencyStandards':
                return FrequencyStandardGroupComponent.compare;
            case 'humiditySensors':
                return HumiditySensorsGroupComponent.compare;
            case 'pressureSensors':
                return PressureSensorsGroupComponent.compare;
            case 'localEpisodicEffects':
                return LocalEpisodicEffectsGroupComponent.compare;
            case 'surveyedLocalTies':
                return SurveyedLocalTiesGroupComponent.compare;
            case 'temperatureSensors':
                return TemperatureSensorsGroupComponent.compare;
            case 'waterVaporSensors':
                return WaterVaporSensorsGroupComponent.compare;
            default:
                throw new Error(`Unknown item - unable to return comparator for item ${itemName}`);
        }
    }

    /**
     * The array items in the form data (eg. gnssAntennas) need to be sorted according to the app desired order
     * (see AbstractGroup / sortingDirectionAscending.  It will likely always be descending so that is how it is seen in the form.
     * @param formValue
     */
    private sortArrays(formValue: any) {
        let items: string[] = Object.keys(formValue);
        for (let item of items) {
            if (Array.isArray(formValue[item])) {
                let comparator: any = this.returnAssociatedComparator(item);
                if (comparator) {
                    formValue[item].sort(comparator);//this.compare);
                }
            }
        }
    }

    /**
     * Due to how we artifically nest SiteLocation and SiteIdentification under a SiteIdentificationForm, this data is not in the
     * same location as the SiteLogModel.  This method moves it up a level.
     *
     * @param formValue
     */
    private moveSiteInformationUp(formValue: any) {
        this.moveSiteInformationUpSpecifically(formValue, 'siteIdentification');
        this.moveSiteInformationUpSpecifically(formValue, 'siteLocation');
        this.moveSiteInformationUpSpecifically(formValue, 'siteContact');
        this.moveSiteInformationUpSpecifically(formValue, 'siteMetadataCustodian');
        this.moveSiteInformationUpSpecifically(formValue, 'siteDataSource');
        delete formValue.siteInformation;
    }

    private moveSiteInformationUpSpecifically(formValue: any, subObject: string) {
        if (formValue.siteInformation[subObject]) {
            formValue[subObject] = formValue.siteInformation[subObject];
            delete formValue.siteInformation[subObject];
        }
    }

    /**
     * When items are deleted they are given a dateRemoved, but aren't deleted until now (so they show up in the diff).
     */
    private removeDeletedItems() {
        let items: string[] = Object.keys(this.siteLogModel);
        for (let item of items) {
            if (Array.isArray(this.siteLogModel[item])) {
                this.removeDeletedGroupItems(this.siteLogModel[item]);
            }
        }
    }

    private removeDeletedGroupItems(siteLogModelGroupItems: any[]) {
        let i: number;
        for (i = siteLogModelGroupItems.length - 1; i >= 0; i--) {
            if (siteLogModelGroupItems[i].hasOwnProperty('dateDeleted')
                && siteLogModelGroupItems[i]['dateDeleted']
                && siteLogModelGroupItems[i]['dateDeleted'].length > 0) {
                siteLogModelGroupItems.splice(i, 1);
            }
        }
}
