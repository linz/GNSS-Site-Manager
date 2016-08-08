import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * This class provides the service for the application's service worker that is global to the browser.
 */
@Injectable()
export class ServiceWorkerService {
  // Setup Observables (BehaviorSubject's to be specific) to communicate between components
  private _clearCacheFlag = new BehaviorSubject<boolean>(false);
  // Observable
  public clearCache$ = this._clearCacheFlag.asObservable();

  constructor(private _ngZone: NgZone) {

  }

  clearCacheService(successCallback: Function, failureCallback: Function) {
    var _this = this;
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      console.log('ClearCache: ');

      let messageChannel: MessageChannel = new MessageChannel();

      // Handler for receiving message reply from service worker - best way to synchronize
      messageChannel.port1.onmessage = function (event) {
        console.log('  msgChannel.port1.onmessage');
        if (event.data.error) {
          if (failureCallback) {
            failureCallback();
          } else {
            throw new Error('ERROR clearing cache');
          }
        } else {
          if (successCallback) {
            // Advise any Observers that the cache has been changed so they can retrieve the current list via getCacheList()
            _this._clearCacheFlag.next(true);
            successCallback();
          }
        }
      };
      navigator.serviceWorker.controller.postMessage({operation: 'clear_cache'}, [messageChannel.port2]);
    } else {
      console.log('ClearCache(): service worker not ready');
    }
  }

  getCacheList(successCallback: Function, failureCallback: Function) {
    let messageReplyHandler = (event: MessageEvent): any => {
      // Use the NGZone to force this code to run inside the Angular Zone or else the updates to the
      // variables aren't recognised (and thus aren't rendered).
      this._ngZone.run(() => {
        if (event.data.error) {
          if (failureCallback) {
            failureCallback(event);
          } else {
            throw new Error('ERROR updating cache list');
          }
        } else {
          if (successCallback) {
            successCallback(event);
          }
        }
      });
    };
    //
    if (navigator.serviceWorker && navigator.serviceWorker.controller) {
      console.log('Update Cache List: ');
      // var _this = this;

      let messageChannel: MessageChannel = new MessageChannel();

      // Handler for receiving message reply from service worker - best way to synchronize
      messageChannel.port1.onmessage = messageReplyHandler;

      navigator.serviceWorker.controller.postMessage({operation: 'get_cache'}, [messageChannel.port2]);

    } else {
      console.log('Update Cache List(): service worker not ready');
    }
  }
}
