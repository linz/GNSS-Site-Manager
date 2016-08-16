import {Component, OnInit} from '@angular/core';
import {NameListService, ServiceWorkerService} from '../index';
import {Subscription} from 'rxjs';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  private cacheItems: Array<string> = [];
  private numberCacheItems: number = 0;

  constructor(private serviceWorkerService: ServiceWorkerService, public nameListService: NameListService) {
  }

  ngOnInit() {
    this.setupSubscriptions();
    this.updateCacheList();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCache$.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache=() => {
    this.serviceWorkerService.clearCacheService().then((data: string) => {
      console.debug('toolbar.component clearCache() success: ', data);
      // Force a reloading of the cache
      self.location.reload();
    }, (error: Error) => {
      throw new Error('Error in clearCache: '+ error.message);
    });
  };

  updateCacheList=() => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
      this.numberCacheItems = this.cacheItems.length;
    }, (error: Error) => {
      console.warn('Error in updateCacheList: '+ error.message);
    }).catch((error: any) => {
      console.error("Caught error in updateCacheList:", error);
    });
  };

}
