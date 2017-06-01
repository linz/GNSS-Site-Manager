import { Component, OnInit, OnDestroy, HostListener } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subject } from 'rxjs/Subject';
import { User } from 'oidc-client';
import * as _ from 'lodash';

import { DialogService, MiscUtils, SiteLogService } from '../shared/index';
import { SiteLogViewModel }  from '../shared/json-data-view-model/view-model/site-log-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ResponsiblePartyType, ResponsiblePartyGroupComponent } from '../responsible-party/responsible-party-group.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import { GnssReceiversGroupComponent } from '../gnss-receiver/gnss-receivers-group.component';
import { FrequencyStandardGroupComponent } from '../frequency-standard/frequency-standard-group.component';
import { GnssAntennaGroupComponent } from '../gnss-antenna/gnss-antenna-group.component';
import { HumiditySensorsGroupComponent } from '../humidity-sensor/humidity-sensors-group.component';
import { PressureSensorsGroupComponent } from '../pressure-sensor/pressure-sensors-group.component';
import { LocalEpisodicEffectsGroupComponent } from '../local-episodic-effect/local-episodic-effects-group.component';
import { SurveyedLocalTiesGroupComponent } from '../surveyed-local-tie/surveyed-local-ties-group.component';
import { TemperatureSensorsGroupComponent } from '../temperature-sensor/temperature-sensors-group.component';
import { WaterVaporSensorsGroupComponent } from '../water-vapor-sensor/water-vapor-sensors-group.component';
import { ApplicationSaveState } from '../shared/site-log/site-log.service';
import { RadioInterferenceGroupComponent } from '../radio-interference/radio-interference-group.component';
import { SignalObstructionGroupComponent } from '../signal-obstruction/signal-obstruction-group.component';

/**
 * This class represents the SiteLogComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
    moduleId: module.id,
    selector: 'sd-site-log',
    templateUrl: 'site-log.component.html'
})
export class SiteLogComponent implements OnInit, OnDestroy {
    public miscUtils: any = MiscUtils;

    // the master form that contains all the other forms
    public siteLogForm: FormGroup;

    public siteInformationForm: FormGroup;
    public responsiblePartyType: any = ResponsiblePartyType;    // Used in template
    public siteLogModel: SiteLogViewModel;

    private siteId: string;
    private isLoading: boolean = false;
    private reverting: boolean = false;
    private siteIdentification: any = null;
    private siteLocation: any = {};
    private siteContacts: Array<any> = [];
    private submitted: boolean = false;

    private unsubscribe: Subject<void> = new Subject<void>();

    /**
     * Creates an instance of the SiteLogComponent with the injected Router/ActivatedRoute/CorsSite Services.
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
                private userAuthService: UserAuthService,
                private formBuilder: FormBuilder) {
    }

    @HostListener('window:beforeunload', ['$event'])
    public onBeforeUnload($event: UIEvent): void {
        if (this.isFormDirty() && !this.reverting) {
            $event.returnValue = false;
        }
    }

    /**
     * Initialise all data on loading the site-log page
     */
    public ngOnInit() {
        this.route.params.forEach((params: Params) => {
            let id: string = params['id'];
            this.siteId = id;
        });

        this.setupAuthSubscription();
        this.setupForm();
        this.loadSiteLogData();
        this.setupSubscriptions();
    }

    /**
     * Retrieve relevant site/setup/log information from DB based on given Site Id
     */
    public loadSiteLogData() {
        // Do not allow direct access to site-log page
        if (!this.siteId) {
            this.goToHomePage();
        }

        console.log('---------> SiteLogComponent - Load ------------------------');
        this.isLoading = true;
        this.submitted = false;

        this.route.params.subscribe(() => {
            this.siteLogService.getSiteLogByFourCharacterIdUsingGeodesyML(this.siteId)
                .takeUntil(this.unsubscribe)
                .subscribe(
                    (response: SiteLogViewModel) => {
                        this.siteLogModel = response;
                        console.debug('loadSiteLogData - siteLogModel: ', this.siteLogModel);

                        this.isLoading = false;
                        this.siteLogService.sendApplicationStateMessage({
                            applicationFormModified: false,
                            applicationFormInvalid: false,
                            applicationSaveState: ApplicationSaveState.idle
                        });
                        this.dialogService.showSuccessMessage('Site log loaded successfully for ' + this.siteId);
                    },
                    (error: Error) => {
                        this.isLoading = false;
                        this.dialogService.showErrorMessage('No site log found for ' + this.siteId);
                    }
                );
        });
    }

    /**
     * Clear all variables/arrays
     */
    public ngOnDestroy() {
        this.unsubscribe.next();
        this.unsubscribe.complete();

        this.isLoading = false;
        this.siteId = null;
        this.siteLogModel = null;
        this.siteIdentification = null;
        this.siteLocation = null;
        this.siteContacts.length = 0;
    }

    /**
     * Save changes made back to siteLog XML
     */
    public save(formValue: any) {
        if (!formValue) {
            // Currently the toolbar save will pass null.  Just use siteLogForm
            if (this.siteLogForm.pristine) {
                return;
            }
            formValue = this.siteLogForm.value;
        }
        console.log('---------> SiteLogComponent - Save ------------------------');

        if (!this.userAuthService.hasAuthorityToEditSite()) {
            console.warn('Cannot save SiteLog - user deoes not have edit rights');
            this.dialogService.showErrorMessage('Cannot save SiteLog - user deoes not have edit rights');
            return;
        }
        this.dialogService.confirmSaveDialog(
            () => {

                this.removeDeletedItems();

                let formValueClone: any = _.cloneDeep(formValue);
                this.moveSiteInformationUp(formValueClone);

                /* Get the arrays in the form in the same order as the SiteLogModel */
                this.sortArrays(formValueClone);
                console.log(' formValue before merge and after reverse: ', formValueClone);

                _.merge(this.siteLogModel, formValueClone);

                if (!this.isFormDirty()) {
                    this.dialogService.showLogMessage('No changes have been made for ' + this.siteId + '.');
                    this.siteLogService.sendApplicationStateMessage({
                        applicationFormModified: false,
                        applicationFormInvalid: false,
                        applicationSaveState: ApplicationSaveState.saving
                    });
                    return;
                }

                this.isLoading = true;
                this.submitted = true;
                this.siteLogService.saveSiteLog(this.siteLogModel)
                    .takeUntil(this.unsubscribe)
                    .subscribe(
                        (responseJson: any) => {
                            this.isLoading = false;
                            this.siteLogForm.markAsPristine();
                            this.siteLogService.sendApplicationStateMessage({
                                applicationFormModified: false,
                                applicationFormInvalid: false,
                                applicationSaveState: ApplicationSaveState.saved
                            });
                            this.siteLogService.sendApplicationStateMessage({
                                applicationFormModified: false,
                                applicationFormInvalid: false,
                                applicationSaveState: ApplicationSaveState.idle
                            });
                            this.dialogService.showSuccessMessage('Done in saving SiteLog data for ' + this.siteId);
                        },
                        (error: Error) => {
                            this.isLoading = false;
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
     * Popup a dialog prompting users whether or not to save changes if any before closing the site-log page
     */
    public confirmCloseSiteLogPage(): Promise<boolean> {
        let msg: string = 'You have made changes to the ${this.siteId} Site Log. \
            Closing the page will lose any unsaved changes.';
        return new Promise<boolean>((resolve, reject) => {
        this.dialogService.confirmCloseDialog(msg,
            () => {
                this.dialogService.showLogMessage('Site Log page closed without saving changes made.');
                resolve(true);
            },
            () => {
                this.dialogService.showLogMessage('Close cancelled');
                resolve(false);
            }
        );
      });
    }

    /**
     * Shows a dialog prompting users to confirm reverting/reloading the page
     */
    public confirmRevert() {
        let msg: string = 'You have made changes to the Site Log. \
            Reverting will reload the page and will lose any unsaved changes.';

        this.dialogService.confirmRevertDialog(msg,
            () => {
                this.reverting = true;
                window.location.reload();
            },
            () => {
                this.dialogService.showLogMessage('Revert cancelled');
            }
        );
    }

    public isFormDirty(): boolean {
        return this.siteLogForm ? this.siteLogForm.dirty : false;
    }

    public isFormInvalid(): boolean {
        return this.siteLogForm.invalid;
    }

    public isSiteInformationFormDirty(): boolean {
        return this.siteInformationForm ? this.siteInformationForm.dirty : false;
    }

    public isSiteInformationFormInvalid(): boolean {
        return this.siteInformationForm.invalid;
    }

    private setupForm() {
        this.siteInformationForm = this.formBuilder.group({});
        this.siteLogForm = this.formBuilder.group({});
        this.siteLogForm.addControl('siteInformation', this.siteInformationForm);
    }

    private setupAuthSubscription() {
        this.userAuthService.userLoadedEvent
            .takeUntil(this.unsubscribe)
            .subscribe((_: User) => {
                if (this.userAuthService.hasAuthorityToEditSite()) {
                    this.siteLogForm.enable();
                } else {
                    this.siteLogForm.disable();
                }
            });
    }

    /**
     * Template and Model driven forms are handled differently and separately
     */
    private setupSubscriptions() {
        this.siteLogForm.valueChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.siteLogForm.dirty,
                    applicationFormInvalid: this.siteLogForm.invalid,
                    applicationSaveState: ApplicationSaveState.idle
                });
            });

        this.siteLogForm.statusChanges.debounceTime(500)
            .takeUntil(this.unsubscribe)
            .subscribe((value: any) => {
                this.siteLogService.sendApplicationStateMessage({
                    applicationFormModified: this.siteLogForm.dirty,
                    applicationFormInvalid: this.siteLogForm.invalid,
                    applicationSaveState: ApplicationSaveState.idle
                });
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
            case 'siteOwner':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteContacts':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteMetadataCustodian':
                return ResponsiblePartyGroupComponent.compare;
            case 'siteDataCenters':
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
            case 'radioInterferences':
                return RadioInterferenceGroupComponent.compare;
            case 'signalObstructions':
                return SignalObstructionGroupComponent.compare;
            default:
                throw new Error(`Unknown item - unable to return comparator for item ${itemName}`);
        }
    }

    /**
     * Sort the the array items (eg. gnssAntennas) in the form data
     * @param formValue
     */
    private sortArrays(formValue: any) {
        let items: string[] = Object.keys(formValue);
        for (let item of items) {
            if (Array.isArray(formValue[item])) {
                let comparator: any = this.returnAssociatedComparator(item);
                if (comparator) {
                    formValue[item].sort(comparator);
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
        this.moveSiteInformationUpSpecifically(formValue, 'siteOwner');
        this.moveSiteInformationUpSpecifically(formValue, 'siteContacts');
        this.moveSiteInformationUpSpecifically(formValue, 'siteMetadataCustodian');
        this.moveSiteInformationUpSpecifically(formValue, 'siteDataCenters');
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
        let keys: string[] = Object.keys(this.siteLogModel);
        for (let key of keys) {
            let item = (<any> this.siteLogModel)[key];
            if (Array.isArray(item)) {
                this.removeDeletedGroupItems(item);
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
}
