import { Component, OnInit, Input } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { MiscUtilsService, JsonCheckService, ServiceWorkerService } from '../shared/index';

/**
 * This class represents the EpisodicEffectComponent for viewing and editing episodic effect details.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-episodic-effect',
  templateUrl: 'episodic-effect.component.html',
})


export class EpisodicEffectComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public errorMessage: string;
  private cacheItems: Array<string> = [];
  public hasNewEpisodicEffect: boolean = false;
  @Input() status: any;
  @Input() episodicEffects: any;
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
  public arePreviousEpisodicEffectsOpen() {
    for (let i = 1; i < this.status.isEpisodicEffectOpen.length; i ++) {
      if (!this.status.isEpisodicEffectOpen[i]) {
        return false;
      }
    }
    return true;
  }


  /**
   * Returns true if all previous frequency standards are closed, otherwise returns false
   */
  public arePreviousEpisodicEffectsClosed() {
    for (let i = 1; i < this.status.isEpisodicEffectOpen.length; i ++) {
      if (this.status.isEpisodicEffectOpen[i]) {
        return false;
      }
    }
    return true;
  }


  /**
   * Update the isOpen flags for all previous frequency standards,sko
   */
  public togglePreviousEpisodicEffects(flag: boolean) {
    for (let i = 1; i < this.status.isEpisodicEffectOpen.length; i ++) {
      this.status.isEpisodicEffectOpen[i] = flag;
    }
  }

  /**
   * Add a new empty frequency standard as current one and push the 'old' current frequency standard into previous list
   */
  public addNewEpisodicEffect() {
    let presentDT = this.miscUtilsService.getPresentDateTime();
    if (!this.episodicEffects) {
      this.episodicEffects = [];
    }

    // Assign present date/time as default value to endDate if it is empty
    if (this.episodicEffects.length > 0) {
      this.status.isEpisodicEffectOpen[0] = false;
      if (!this.episodicEffects[0].validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] ) {
        this.episodicEffects[0].validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = presentDT;
      }
    }

    // Create a new empty frequency standard with present date/time as default value to dateInstalled
    let newEpisodicEffect = this.jsonCheckService.getNewEpisodicEffect();

    // Clone from one of Frequency Standard objects so that the "new" frequency standard object can be saved
    let oneEpisodicEffectSet: any = {};
    if ( this.siteLogModel.localEpisodicEventsSet && this.siteLogModel.localEpisodicEventsSet.length > 0 ) {
      oneEpisodicEffectSet = this.miscUtilsService.cloneJsonObj(this.siteLogModel.localEpisodicEventsSet[0]);
    }

    // Keep a copy of the frequency standard object as the original one for comparison
    let episodicEffectBackup: any = this.miscUtilsService.cloneJsonObj(oneEpisodicEffectSet);
    episodicEffectBackup.localEpisodicEvents = this.miscUtilsService.cloneJsonObj(newEpisodicEffect);
    if (!this.siteLogOrigin.localEpisodicEventsSet) {
      this.siteLogOrigin.localEpisodicEventsSet = [];
    }
    this.siteLogOrigin.localEpisodicEventsSet.unshift(episodicEffectBackup);

    newEpisodicEffect.validTime.abstractTimePrimitive['gml:TimePeriod'].beginPosition.value[0] = presentDT;
    oneEpisodicEffectSet.localEpisodicEvents = newEpisodicEffect;
    if (!this.siteLogModel.localEpisodicEventsSet) {
      this.siteLogModel.localEpisodicEventsSet = [];
    }
    this.siteLogModel.localEpisodicEventsSet.unshift(oneEpisodicEffectSet);

    // Add the new episodic effect as current one and open it by default
    this.episodicEffects.unshift(newEpisodicEffect);
    this.status.isEpisodicEffectOpen.unshift(true);
    this.status.isEpisodicEffectGroupOpen = true;
    this.status.hasNewEpisodicEffect = true;
  }

  /**
   * Remove the new current frequency standard from the frequency standard list and restore the old current frequency standard
   */
  public removeNewEpisodicEffect() {
    this.siteLogModel.localEpisodicEventsSet.shift();
    this.siteLogOrigin.localEpisodicEventsSet.shift();
    this.episodicEffects.shift();
    this.status.isEpisodicEffectOpen.shift();
    this.status.hasNewEpisodicEffect = false;
    if (this.episodicEffects !== null && this.episodicEffects.length > 0) {
      this.status.isEpisodicEffectOpen[0] = true;
      this.episodicEffects[0].validTime.abstractTimePrimitive['gml:TimePeriod'].endPosition.value[0] = '';
    }
  }
}
