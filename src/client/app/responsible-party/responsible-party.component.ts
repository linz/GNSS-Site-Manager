import {Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MiscUtilsService, JsonCheckService, ServiceWorkerService } from '../shared/index';

/**
 * This class represents the ResponsiblePartyComponent for viewing and editing siteContact and metadataCustodian information.
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
  @Input() partyName: string;
  @Input() responsibleParties: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;
  @Input() status: any;

  constructor(private miscUtilsService: MiscUtilsService,
              private jsonCheckService: JsonCheckService,
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
   * Add a new empty site contact
   */
  public addNewSiteContact() {
    if (!this.siteLogModel) {
      return;
    }

    let newSiteContact = this.jsonCheckService.getNewSiteContact();
    let siteContactObj: any = {};
    siteContactObj.siteContact = newSiteContact;
    this.siteLogModel.siteContact.unshift(siteContactObj);
    if (!this.responsibleParties) {
      this.responsibleParties = [];
    }
    this.responsibleParties.unshift(newSiteContact);
    this.status.hasNewSiteContact = true;
    this.isPartyGroupOpen = true;

    // Add a copy of the new SiteContact to the original model for tracking any changes to be made
    this.siteLogOrigin.siteContact.unshift(this.miscUtilsService.cloneJsonObj(siteContactObj));
  }

  /**
   * Remove the new SiteContact from the site contacts list
   */
  public removeNewSiteContact() {
    if (!this.siteLogModel) {
      return;
    }
    this.siteLogModel.siteContact.shift();
    this.siteLogOrigin.siteContact.shift();
    this.responsibleParties.shift();
    this.status.hasNewSiteContact = false;
  }

  public hasNewResponsibleParty(): boolean {
    if (!this.siteLogModel) {
      return false;
    }
    return this.status.hasNewSiteContact;
  }

  /**
   * Returns the date string (YYYY-MM-DD) from the date-time string (YYYY-MM-DDThh:mm:ssZ)
   */
  public getDate(datetime: string) {
    if ( datetime === null || typeof datetime === 'undefined') {
      return '';
    } else if (datetime.length < 10) {
      return datetime;
    }
    return datetime.substring(0, 10);
  }
}
