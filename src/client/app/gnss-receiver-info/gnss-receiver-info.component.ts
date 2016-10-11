import {Component, OnInit, Input} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import { ServiceWorkerService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'gnss-receiever-info',
  templateUrl: 'gnss-receiver-info.component.html',
})
export class GnssReceiverInfoComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public errorMessage: string;
  private cacheItems: Array<string> = [];
  public hasNewReceiver: boolean = false;
  @Input() status: any;
  @Input() gnssReceivers: any;


  constructor(private serviceWorkerService: ServiceWorkerService) { }

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
   * Add a new empty receiver as current one and push the 'old' current receiver into previous list
   */
  public addNewReceiver() {
    let presentDT = new Date().toISOString();
    if (!this.gnssReceivers) {
      this.gnssReceivers = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.gnssReceivers.length > 0) {
      this.status.isReceiversOpen[0] = false;
      let currentReceiver: any = this.gnssReceivers[0];
      if (!currentReceiver.dateRemoved.value[0] ) {
        currentReceiver.dateRemoved.value[0] = presentDT;
      }
    }

    // Create a new empty receiver with present date/time as default value to dateInstalled
    let newReceiver = {
      receiverType: {
        value: ''
      },
      manufacturerSerialNumber: '',
      serialNumber: '',
      firmwareVersion: '',
      satelliteSystem: [
        {
          codeListValue: '',
          value: ''
        }
      ],
      elevationCutoffSetting: '',
      dateInstalled: {
        value: [ presentDT ]
      },
      dateRemoved: {
        value: ['']
      }
    };

    // Add the new receiver as current one and open it by default
    this.gnssReceivers.unshift(newReceiver);
    this.status.isReceiversOpen.unshift(true);
    this.status.isReceiverGroupOpen = true;
    this.hasNewReceiver = true;

    // Clone from one of GNSS Receiver objects so that the "new" receiver object can be saved
    let receiverObj: any = {};
    if ( this.gnssReceivers && this.gnssReceivers.length > 0 ) {
      receiverObj = JSON.parse(JSON.stringify( this.gnssReceivers[0] ));
    }
    receiverObj.gnssReceiver = newReceiver;
    this.gnssReceivers.unshift(receiverObj);
  }
}
