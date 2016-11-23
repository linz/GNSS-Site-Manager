import {Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MiscUtilsService, JsonCheckService, ServiceWorkerService } from '../shared/index';

/**
 * This class represents the FrequencyStandardComponent for viewing and editing frequency standard details.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-frequency-standard',
  templateUrl: 'frequency-standard.component.html',
})
export class FrequencyStandardComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public errorMessage: string;
  private cacheItems: Array<string> = [];
  public hasNewFrequencyStd: boolean = false;
  @Input() status: any;
  @Input() frequencyStandards: any;
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

  /**
   * Returns true if all previous frequency standards are open, otherwise returns false
   */
  public arePrevFrequencyStdsOpen() {
    for (let i = 1; i < this.status.isFrequencyStdsOpen.length; i ++) {
      if (!this.status.isFrequencyStdsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous frequency standards are closed, otherwise returns false
   */
  public arePrevFrequencyStdsClosed() {
    for (let i = 1; i < this.status.isFrequencyStdsOpen.length; i ++) {
      if (this.status.isFrequencyStdsOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Update the isOpen flags for all previous frequency standards,sko
   */
  public togglePrevFrequencyStds(flag: boolean) {
    for (let i = 1; i < this.status.isFrequencyStdsOpen.length; i ++) {
      this.status.isFrequencyStdsOpen[i] = flag;
    }
  }

  /**
   * Add a new empty frequency standard as current one and push the 'old' current frequency standard into previous list
   */
  public addNewFrequencyStandard() {
    let presentDT = this.miscUtilsService.getPresentDateTime();
    if (!this.frequencyStandards) {
      this.frequencyStandards = [];
    }

    // Assign present date/time as default value to endDate if it is empty
    if (this.frequencyStandards.length > 0) {
      this.status.isFrequencyStdsOpen[0] = false;
      if (!this.frequencyStandards[0].validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] ) {
        this.frequencyStandards[0].validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
      }
    }

    // Create a new empty frequency standard with present date/time as default value to dateInstalled
    let newFrequencyStd = this.jsonCheckService.getNewFrequencyStandard();

    // Clone from one of Frequency Standard objects so that the "new" frequency standard object can be saved
    let frequencyStdObj: any = {};
    if ( this.siteLogModel.frequencyStandards && this.siteLogModel.frequencyStandards.length > 0 ) {
      frequencyStdObj = this.miscUtilsService.cloneJsonObj(this.siteLogModel.frequencyStandards[0]);
    }

    // Keep a copy of the frequency standard object as the original one for comparison
    let frequencyStdObjCopy: any = this.miscUtilsService.cloneJsonObj(frequencyStdObj);
    frequencyStdObjCopy.frequencyStandard = this.miscUtilsService.cloneJsonObj(newFrequencyStd);
    if (!this.siteLogOrigin.frequencyStandards) {
      this.siteLogOrigin.frequencyStandards = [];
    }
    this.siteLogOrigin.frequencyStandards.unshift(frequencyStdObjCopy);

    newFrequencyStd.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;
    frequencyStdObj.frequencyStandard = newFrequencyStd;
    if (!this.siteLogModel.frequencyStandards) {
      this.siteLogModel.frequencyStandards = [];
    }
    this.siteLogModel.frequencyStandards.unshift(frequencyStdObj);

    // Add the new frequency standard as current one and open it by default
    this.frequencyStandards.unshift(newFrequencyStd);
    this.status.isFrequencyStdsOpen.unshift(true);
    this.status.isFrequencyStdGroupOpen = true;
    this.status.hasNewFrequencyStd = true;
  }

  /**
   * Remove the new current frequency standard from the frequency standard list and restore the old current frequency standard
   */
  public removeNewFrequencyStd() {
    this.siteLogModel.frequencyStandards.shift();
    this.siteLogOrigin.frequencyStandards.shift();
    this.frequencyStandards.shift();
    this.status.isFrequencyStdsOpen.shift();
    this.status.hasNewFrequencyStd = false;
    if (this.frequencyStandards !== null && this.frequencyStandards.length > 0) {
      this.status.isFrequencyStdsOpen[0] = true;
      this.frequencyStandards[0].validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = '';
    }
  }
}
