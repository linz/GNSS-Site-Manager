import { Component, OnInit, OnDestroy, ViewChild, ChangeDetectorRef } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { User } from 'oidc-client';
import { ConstantsService, DialogService, MiscUtils,
         SiteLogService, JsonDiffService, JsonCheckService } from '../shared/index';
import { SiteLogViewModel, ViewSiteLog } from '../shared/json-data-view-model/view-model/site-log-view-model';
import { UserAuthService } from '../shared/global/user-auth.service';
import { ResponsiblePartyType } from '../responsible-party/responsible-party2-group.component';
import { FormBuilder, FormGroup } from '@angular/forms';
import * as _ from 'lodash';

/**
 * This class represents the SiteInfoComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-site-info',
  templateUrl: 'site-info.component.html'
})
export class SiteInfoComponent implements OnInit, OnDestroy {
    public siteInfoForm: FormGroup;                 // model driven forms
    // public formIsDirty: boolean = false;    // Necessary as need to compose dirty of template and model forms

    // private SITE_CONTACT: ResponsiblePartyType = ResponsiblePartyType.siteContact;
    private responsiblePartyType: any = ResponsiblePartyType;

    private siteId: string;
  private isLoading: boolean = false;
  private siteLogOrigin: ViewSiteLog;
  private siteLogModel: ViewSiteLog;
  private siteIdentification: any = null;
  private siteLocation: any = {};
  private siteContacts: Array<any> = [];
  private siteMetadataCustodian: any = {};
  private siteDataCenters: Array<any> = [];
  private siteDataSource: any = {};
  private errorMessage: string;
  private siteInfoTab: any = null;
  private submitted: boolean = false;
  public miscUtils: any = MiscUtils;
  public siteContactName: string = ConstantsService.SITE_CONTACT;
  public siteMetadataCustodianName: string = ConstantsService.SITE_METADATA_CUSTODIAN;
  public siteDataCenterName: string = ConstantsService.SITE_DATA_CENTER;
  public siteDataSourceName: string = ConstantsService.SITE_DATA_SOURCE;
  public hasEditRole: boolean = false;

  private status: any = {
    oneAtATime: false,
    isSiteInfoGroupOpen: true,
    isSiteMediaOpen: false,
    isMetaCustodianOpen: false,
    hasNewSiteContact: false,
    hasNewSiteMetadataCustodian: false,
    hasNewSiteDataCenter: false,
    hasNewSiteDataSource: false,
  };

  private errorMessage: string;
  private siteInfoTab: any = null;
  private authSubscription: Subscription;
  private submitted: boolean = false;

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
              private _changeDetectionRef : ChangeDetectorRef) {
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

    private setupForm() {
        this.siteInfoForm = this.formBuilder.group({
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
                console.log('form dirty - no');
            }
        });
  }

  /**
   * Retrieve relevant site/setup/log information from DB based on given Site Id
   */
  public loadSiteInfoData() {
    // Do not allow direct access to site-info page
    if (!this.siteId) {
      this.goToHomePage();
    }

    this.isLoading = true;
    this.submitted = false;

    this.siteInfoTab = this.route.params.subscribe(() => {
      this.siteLogService.getSiteLogByFourCharacterIdUsingGeodesyML(this.siteId).subscribe(
        (responseJson: any) => {
          this.siteLogModel = this.jsonCheckService.getValidSiteLog(responseJson.siteLog);//['geo:siteLog']);

          this.backupSiteLogJson();
          this.isLoading = false;
            this.siteLogService.sendFormModifiedStateMessage(false);
          this.dialogService.showSuccessMessage('Site log info loaded successfully for ' + this.siteId);
        },
        (error: Error) =>  {
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
    this.isLoading =  false;
    this.hasEditRole = false;
    this.siteId = null;
    this.siteLogModel = null;
    this.siteIdentification = null;
    this.siteLocation = null;
    this.siteContacts.length = 0;
    this.siteMetadataCustodian = null;
    this.siteDataCenters.length = 0;
    this.siteDataSource = null;
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
      // update a copy of the original data with changes from the form and diff that
      // let siteLogOriginClone: ViewSiteLog = _.cloneDeep(this.siteLogOrigin);
      console.log(' siteLog before form merge: ', this.siteLogModel);
      console.log(' formValue before merge and reverse: ', formValue);
      let formValueClone: any =_.cloneDeep(formValue);
      this.reverseArrays(formValueClone);
      console.log(' formValue before merge and after reverse: ', formValueClone);
      _.merge(this.siteLogModel, formValueClone);
      console.log(' siteLog after form merge: ', this.siteLogModel);
      console.log(' siteLogOrigin: ', this.siteLogOrigin);

    let diffMsg: string = this.jsonDiffService.getJsonDiffHtml(this.siteLogOrigin, this.siteLogModel);

    if ( diffMsg === null || diffMsg.trim() === '') {
      this.dialogService.showLogMessage('No changes have been made for ' + this.siteId + '.');
        this.siteLogService.sendFormModifiedStateMessage(false);
        return;
    }

    // let that: any = this;

    this.dialogService.confirmSaveDialog(diffMsg, () => {
      // function() {
        this.isLoading = true;
        this.submitted = true;
        this.status.hasNewSiteContact = false;
        this.status.hasNewSiteMetadataCustodian = false;
        this.status.hasNewSiteDataCenter = false;
        this.status.hasNewSiteDataSource = false;
        let siteLogViewModel: SiteLogViewModel  = new SiteLogViewModel();
        siteLogViewModel.siteLog=this.siteLogModel;
        this.siteLogService.saveSiteLog(siteLogViewModel).subscribe(
          (responseJson: any) => {
            //if (form)form.pristine = true;  // Note: pristine has no setter method in ng2-form!
            this.isLoading = false;
              this.siteLogService.sendFormModifiedStateMessage(false);
              this.backupSiteLogJson();
            this.dialogService.showSuccessMessage('Done in saving SiteLog data for '+this.siteId);
          },
          (error: Error) =>  {
            this.isLoading = false;
            this.errorMessage = <any>error;
            console.error(error);
            this.dialogService.showErrorMessage('Error in saving SiteLog data for '+this.siteId);
          }
        );
      },
      () => {
        this.dialogService.showLogMessage('Cancelled in saving SiteLog data for '+this.siteId);
        this.isLoading = false;
      }
    );
  }

    /**
     * The array items in the form data (eg. gnssAntennas) is ordered newest to oldest (newest at the top in the view)
     * but we need them the other way around so can be merged with SiteLogModel.
     * @param formValue
     */
    private reverseArrays(formValue: any) {
        let items: string[] = Object.keys(formValue);
        for (let item of items) {
            if (Array.isArray(formValue[item])) {
                formValue[item].reverse();
            }
        }
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
    let msg: string = 'You have made changes to the "' + this.siteId + '" Site Log. '
                    + 'Close the page will lose any unsaved changes.';
    let that: any = this;
    return new Promise<boolean>((resolve, reject) => {
        this.dialogService.confirmCloseDialog(msg,
          function() {
            that.dialogService.showLogMessage('Site Info page closed without saving changes made.');
            resolve(true);
          },
          function() {
            resolve(false);
          }
        );
    });
  }

  public backupSiteLogJson() {
    this.siteLogOrigin = MiscUtils.cloneJsonObj(this.siteLogModel);
    console.log('siteLogOrigin: ', this.siteLogOrigin);
  }

  private setupAuthSubscription(): Subscription {
    return this.userAuthService.userLoadededEvent.subscribe((user: User) => {
        this.hasEditRole = this.userAuthService.hasAuthorityToEditSite(this.siteId);
    });
  }

  public isFormModified(): boolean {
      // console.debug('isFormModified - controls: ', this.siteInfoForm.controls);
      // console.debug('  dirty?: ', this.siteInfoForm.dirty)
      // // console.debug('  and humiditySensorItemComponent?: ', this.humiditySensorGroupComponent.maybeDirty);
      return false; //this.siteInfoForm.dirty;
  }

  public newSave(form: FormGroup) {
      console.log('newSave: ', form);
      this.save(form.value);
  }
}
