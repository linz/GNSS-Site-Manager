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
  @Input() status: any;
  @Input() siteContacts: any;
  @Input() siteLogModel: any;
  @Input() siteLogOrigin: any;

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
    if (!this.siteContacts) {
      this.siteContacts = [];
    }

    // Clone from one of SiteContacts objects so that the "new" SiteContact object can be saved
    let siteContactObj: any = {};
    if ( this.siteLogModel.siteContact.length > 0 ) {
      siteContactObj = this.miscUtilsService.cloneJsonObj(this.siteLogModel.siteContact[0]);
    }

    // Assign a new SiteContact object to both original and backup models for comparison
    let newSiteContact = this.jsonCheckService.getNewSiteContact();
    let siteContactObjCopy: any = this.miscUtilsService.cloneJsonObj(siteContactObj);
    siteContactObjCopy.siteContact = this.miscUtilsService.cloneJsonObj(newSiteContact);
    this.siteLogOrigin.siteContact.unshift(siteContactObjCopy);
    siteContactObj.siteContact = this.miscUtilsService.cloneJsonObj(newSiteContact);
    this.siteLogModel.siteContact.unshift(siteContactObj);
    this.siteContacts.unshift(newSiteContact);
    this.status.hasNewSiteContact = true;
    this.status.isSiteContactGroupOpen = true;
  }

  /**
   * Remove the new SiteContact from the site contacts list
   */
  public removeNewSiteContact() {
    this.siteLogModel.siteContact.shift();
    this.siteLogOrigin.siteContact.shift();
    this.siteContacts.shift();
    this.status.hasNewSiteContact = false;
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
