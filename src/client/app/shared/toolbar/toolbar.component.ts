import { Component, OnInit } from '@angular/core';
import { CORE_DIRECTIVES } from '@angular/common';
import { ROUTER_DIRECTIVES } from '@angular/router';
import { DROPDOWN_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { Subscription } from 'rxjs';
import { NameListService, ServiceWorkerService, GlobalService } from '../index';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  directives: [CORE_DIRECTIVES, ROUTER_DIRECTIVES, DROPDOWN_DIRECTIVES],
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  private cacheItems: Array<string> = [];

  constructor(private serviceWorkerService: ServiceWorkerService, public globalService: GlobalService,
              public nameListService: NameListService) {
  }

  ngOnInit() {
    this.setupSubscriptions();
    this.updateCacheList();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache = (): void => {
    this.serviceWorkerService.clearCache().then((data: string) => {
      console.debug('toolbar.component clearCacheObservable() success: ', data);
      // Force a reloading of the cache
      self.location.reload();
    }, (error: Error) => {
      throw new Error('Error in clearCacheObservable: ' + error.message);
    });
  };

  updateCacheList = (): void => {
    this.serviceWorkerService.getCacheList().then((data: string[]) => {
      this.cacheItems.length = 0;
      this.cacheItems = data;
    }).catch((error: any) => {
      console.error('Caught error in updateCacheList:', error);
    });
  };
}
