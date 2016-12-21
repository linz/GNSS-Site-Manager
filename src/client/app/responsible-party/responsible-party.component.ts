import {Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ConstantsService, MiscUtilsService, JsonCheckService, ServiceWorkerService } from '../shared/index';

/**
 * This class represents the ResponsiblePartyComponent for viewing and editing Responsible Parties for Site Owner, Site
 * Contact, Site Metadata Custodian, Site Data Center and Site Data Source information.
 *
 * Please note that:
 *     Site Contact and Site Data Center: 0 ~ many responsible parties;
 *     Site Metadata Custodian: exactly 1 responsible party;
 *     Site Owner and Data Source: 0 ~ 1 responsible party.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-responsible-party',
  templateUrl: 'responsible-party.component.html',
})
export class ResponsiblePartyComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public errorMessage: string;
  private cacheItems: Array<string> = [];
  private isPartyGroupOpen: boolean = false;
  public miscUtilsService: any = MiscUtilsService;
  @Input() partyName: string;
  @Input() responsibleParties: any;
  @Input() dataModel: any;
  @Input() dataModelCopy: any;
  @Input() status: any;

  constructor(private jsonCheckService: JsonCheckService,
              private serviceWorkerService: ServiceWorkerService) { }

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.setupSubscriptions();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Component method to retrieve the list of URLs cached in the Service Worker and to update the this.cacheItem array
   */
  updateCacheList = (): void => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  };

  /**
   * Add a new empty responsible party
   */
  public addNewResponsibleParty() {
    if ((this.partyName === ConstantsService.SITE_METADATA_CUSTODIAN
         || this.partyName === ConstantsService.SITE_DATA_SOURCE)
         && this.responsibleParties.length > 0) {
      return;
    }

    if (this.partyName === ConstantsService.SITE_CONTACT) {
      this.status.hasNewSiteContact = true;
    } else if (this.partyName === ConstantsService.SITE_METADATA_CUSTODIAN) {
      this.status.hasNewSiteMetadataCustodian = true;
    } else if (this.partyName === ConstantsService.SITE_DATA_CENTER) {
      this.status.hasNewSiteDataCenter = true;
    } else if (this.partyName === ConstantsService.SITE_DATA_SOURCE) {
      this.status.hasNewSiteDataSource = true;
    }
    this.isPartyGroupOpen = true;

    let newResponsibleParty = MiscUtilsService.cloneJsonObj(this.jsonCheckService.getNewResponsibleParty());
    this.responsibleParties.unshift(newResponsibleParty);

    // back up for comparison
    if (this.partyName === ConstantsService.SITE_METADATA_CUSTODIAN ||
        this.partyName === ConstantsService.SITE_DATA_SOURCE) {
      this.dataModel['ciResponsibleParty'] = newResponsibleParty;
      this.dataModelCopy['ciResponsibleParty'] = MiscUtilsService.cloneJsonObj(newResponsibleParty);
    } else {
      let newObj: any = {'ciResponsibleParty': newResponsibleParty};
      this.dataModel.unshift(newObj);
      this.dataModelCopy.unshift(MiscUtilsService.cloneJsonObj(newObj));
    }
  }

  /**
   * Remove the new Responsible Party
   */
  public removeNewResponsibleParty() {
    this.responsibleParties.shift();
    if (this.partyName === ConstantsService.SITE_CONTACT) {
      this.dataModel.shift();
      this.dataModelCopy.shift();
      this.status.hasNewSiteContact = false;
    } else if (this.partyName === ConstantsService.SITE_METADATA_CUSTODIAN) {
      this.dataModel['ciResponsibleParty'] = null;
      this.dataModelCopy['ciResponsibleParty'] = null;
      this.status.hasNewSiteMetadataCustodian = false;
    } else if (this.partyName === ConstantsService.SITE_DATA_CENTER) {
      this.dataModel.shift();
      this.dataModelCopy.shift();
      this.status.hasNewSiteDataCenter = false;
    } else if (this.partyName === ConstantsService.SITE_DATA_SOURCE) {
      this.dataModel['ciResponsibleParty'] = null;
      this.dataModelCopy['ciResponsibleParty'] = null;
      this.status.hasNewSiteDataSource = false;
    }
  }

  /**
   * Returns a boolean value on whether to enable or disable the "Add New ..." button.
   */
  public isToEnableAddNewButton(): boolean {
    if (this.partyName === ConstantsService.SITE_CONTACT) {
      return this.status.hasNewSiteContact;
    } else if (this.partyName === ConstantsService.SITE_DATA_CENTER) {
      return this.status.hasNewSiteDataCenter;
    } else if (this.partyName === ConstantsService.SITE_DATA_SOURCE) {
      return this.status.hasNewSiteDataSource;
    } else {
      return false;
    }
  }

  /**
   * Returns a boolean value on whether to show or hide the "Add New ..." button on UI.
   */
  public isToShowAddNewButton(): boolean {
    if (this.partyName === ConstantsService.SITE_CONTACT ||
        this.partyName === ConstantsService.SITE_DATA_CENTER) {
      return true;
    } else if (this.partyName === ConstantsService.SITE_DATA_SOURCE ||
               this.partyName === ConstantsService.SITE_METADATA_CUSTODIAN) {
      return (this.responsibleParties === null || this.responsibleParties.length === 0);
    } else {
      return false;
    }
  }

  /**
   * Returns a boolean value on whether to show or hide the "Remove" button on UI.
   */
  public isToShowRemoveButton(index: number): boolean {
    // Only allow to remove a new responsible party which is the first item in an array
    if (index > 0) {
      return false;
    } else if (this.partyName === ConstantsService.SITE_CONTACT) {
      return this.status.hasNewSiteContact;
    } else if (this.partyName === ConstantsService.SITE_DATA_CENTER) {
      return this.status.hasNewSiteDataCenter;
    } else if (this.partyName === ConstantsService.SITE_DATA_SOURCE) {
      if (this.responsibleParties === null || this.responsibleParties.length === 0) {
        return false;
      } else {
        return this.status.hasNewSiteDataSource;
      }
    } else if (this.partyName === ConstantsService.SITE_METADATA_CUSTODIAN) {
      return false;
    } else {
      return false;
    }
  }

  /**
   * Returns a simplified responsible party name with order index for Site Contact and Site Data Center
   * if there are more than one responsible party in a section block.
   */
  public getSimplePartyNameInOrder(index: number): string {
    if (this.responsibleParties.length > 1 ) {
      if (this.partyName === ConstantsService.SITE_CONTACT) {
        return 'Contact ' + (index + 1);
      } else if (this.partyName === ConstantsService.SITE_DATA_CENTER) {
        return 'Data Center ' + (index + 1);
      }
    }
    return '';
  }
}
