import {Component} from '@angular/core';
import {NameListService, ServiceWorkerService} from '../index';

/**
 * This class represents the toolbar component.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-toolbar',
  templateUrl: 'toolbar.component.html',
  styleUrls: ['toolbar.component.css']
})
export class ToolbarComponent {
  constructor(private serviceWorkerService: ServiceWorkerService, public nameListService: NameListService) {
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache() {
    // var _this = this;
    let success: Function = function () {
      //   // _this.updateCacheList();
      console.debug('ToolbarComponent.clearCache - success');
      self.location.reload();
    };
    console.debug('ToolbarComponent.clearCache');
    // THis service call will use subscriptions to allow observing clients to update their content based on this change
    this.serviceWorkerService.clearCacheService(success, undefined);
  }
}
