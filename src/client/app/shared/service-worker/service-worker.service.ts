import {Injectable, NgZone} from '@angular/core';
import {BehaviorSubject} from 'rxjs/BehaviorSubject';

/**
 * This class provides the service for the application's service worker that is global to the browser.
 */
@Injectable()
export class ServiceWorkerService {
  // Setup Observables (BehaviorSubject's to be specific) to communicate between components
  private clearCacheFlag = new BehaviorSubject<boolean>(false);
  // Observable
  public clearCache$ = this.clearCacheFlag.asObservable();

  /**
   *
   * @returns {Promise<any>} that may contain a message about the operation
   */
  clearCacheService(): Promise<string> {
    let promise: Promise<string> = this.postMessage('clear_cache');

    promise.then(() => {
      this.clearCacheFlag.next(true);
    });
    return promise;
  }

  /**
   *
   * @returns {Promise<any>} that contains an array of items in the cache
   */
  getCacheList(): Promise<string[]> {
    return this.postMessage('get_cache');
  }

  /**
   * Generic method to post messages to the service worker and return a promise to the caller
   * @param operation to be performed
   * @param message is the optional message to be sent with that operation
   * @returns {Promise<T>} that is appropriate to the client of this method
   */
  postMessage(operation: string, message?: string): Promise<any> {
    let messageObject = {operation: operation, message: message} as MessageObject;
    return new Promise(function (resolve: any, reject: any) {
      if ('serviceWorker' in navigator && navigator.serviceWorker
        && 'controller' in navigator.serviceWorker
        && navigator.serviceWorker.controller) {
        var messageChannel = new MessageChannel();
        messageChannel.port1.onmessage = function (event: MessageEvent) {
          if (event.data.error) {
            reject(event.data.error);
          } else {
            resolve(event.data);
          }
        };

        // This sends the message data as well as transferring messageChannel.port2 to the service worker.
        // The service worker can then use the transferred port to reply via postMessage(), which
        // will in turn trigger the onmessage handler on messageChannel.port1.
        navigator.serviceWorker.controller.postMessage(messageObject,
          [messageChannel.port2]);
      } else {
        console.log('postMessage: service worker not ready');
      }
    });
  }
}
