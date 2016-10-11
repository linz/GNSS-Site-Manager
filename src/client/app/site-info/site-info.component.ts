import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { GlobalService, SiteLogService } from '../shared/index';


/**
 * This class represents the SiteInfoComponent for viewing and editing the details of site/receiver/antenna.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-site-info',
  templateUrl: 'site-info.component.html'
})
export class SiteInfoComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public siteLogOrigin: any = {};
  public siteLogModel: any = {
    gnssReceivers: [],
    gnssAnttenas: []
  };
  public site: any = null;
  public siteLocation: any = null;
  public siteContact: any = null;
  public metadataCustodian: any = null;
  public receivers: Array<any> = [];
  public antennas: Array<any> = [];
  public errorMessage: string;
  public siteInfoTab: any = null;

  public siteInfoForm: FormGroup = null;
  public submitted: boolean = false;
  public hasNewAntenna: boolean = false;
  public hasNewReceiver: boolean = false;

  public status: any = {
    oneAtATime: false,
    isSiteInfoGroupOpen: true,
    isSiteMediaOpen: false,
    isSiteContactOpen: false,
    isMetaCustodianOpen: false,
    isReceiverGroupOpen: false,
    isReceiversOpen: [],
    isAntennaGroupOpen: false,
    isAntennasOpen: []
  };

  /**
   * Creates an instance of the SiteInfoComponent with the injected Router/ActivatedRoute/CorsSite Services.
   *
   * @param {Router} router - The injected Router.
   * @param {ActivatedRoute} route - The injected ActivatedRoute.
   * @param {GlobalService} globalService - The injected GlobalService.
   * @param {SiteLogService} siteLogService - The injected SiteLogService.
   */
  constructor(
      public router: Router,
      public route: ActivatedRoute,
      public globalService: GlobalService,
      public siteLogService: SiteLogService
  ) {}

  /**
   * Initialise all data on loading the site-info page
   */
  public ngOnInit() {
    this.loadSiteInfoData();
  }

  /**
   * Retrieve relevant site/setup/log information from DB based on given Site Id
   */
  public loadSiteInfoData() {
    // Do not allow direct access to site-info page
    let siteId: string = this.globalService.getSelectedSiteId();
    if (!siteId) {
      this.goBack();
    }

    this.isLoading =  true;
    this.submitted = false;
    this.hasNewAntenna = false;
    this.hasNewReceiver = false;
    this.receivers.length = 0;
    this.antennas.length = 0;
    this.status.isReceiversOpen.length = 0;
    this.status.isAntennasOpen.length = 0;

    this.siteInfoTab = this.route.params.subscribe(() => {
      this.siteLogService.getSiteLogByFourCharacterIdUsingGeodesyML(siteId).subscribe(
          (responseJson: any) => {
            this.siteLogModel = responseJson['geo:siteLog'];
            this.backupSiteLogJson();
            this.site = this.siteLogModel.siteIdentification;
            this.siteLocation = this.siteLogModel.siteLocation;
            if (this.siteLogModel.siteContact) {
              this.siteContact = this.siteLogModel.siteContact[0].ciResponsibleParty;
              if (!this.siteContact.positionName) {
                this.siteContact.positionName = {value: ''};
              }
              if (!this.siteContact.contactInfo.ciContact.address.ciAddress) {
                this.siteContact.contactInfo.ciContact.address.ciAddress = {
                  deliveryPoint: [{
                    characterString: {'gco:CharacterString': ''}
                  }],
                  electronicMailAddress: [{
                    characterString: {'gco:CharacterString': ''}
                  }]
                };
              }
              if(!this.siteContact.contactInfo.ciContact.phone.ciTelephone.voice) {
                this.siteContact.contactInfo.ciContact.phone.ciTelephone.voice = [{
                  characterString: {'gco:CharacterString': ''}
                }];
              }
            }
            if (this.siteLogModel.siteMetadataCustodian) {
              this.metadataCustodian = this.siteLogModel.siteMetadataCustodian.ciResponsibleParty;
              if(!this.metadataCustodian.contactInfo.ciContact) {
                this.metadataCustodian.contactInfo.ciContact = {
                  address: { ciAddress: { id: '' } }
                };
              }
            }
            this.setGnssReceivers(this.siteLogModel.gnssReceivers);
            this.setGnssAntennas(this.siteLogModel.gnssAntennas);
            this.isLoading =  false;
          },
          (error: Error) =>  {
            this.errorMessage = <any>error;
            this.isLoading =  false;
            this.siteLogModel = {
              gnssReceivers: [],
              gnssAnttenas: []
            };
          }
      );
    });
  }

  /**
   * Clear all variables/arrays
   */
  public ngOnDestroy() {
    this.isLoading =  false;
    this.siteLogModel = null;
    this.site = null;
    this.siteLocation = null;
    this.siteContact = null;
    this.metadataCustodian = null;
    this.status = null;
    this.receivers.length = 0;
    this.antennas.length = 0;
    this.errorMessage = '';
    this.globalService.selectedSiteId = null;
    this.siteInfoTab.unsubscribe();
  }


  /**
   * Remove the new current receiver from the receiver list and restore the old current receiver
   */
  public removeNewReceiver() {
    this.siteLogModel.gnssReceivers.shift();
    this.receivers.shift();
    this.status.isReceiversOpen.shift();
    this.hasNewReceiver = false;
    if (this.receivers != null && this.receivers.length > 0) {
      this.status.isReceiversOpen[0] = true;
      this.receivers[0].dateRemoved.value[0] = '';
    }
  }

  /**
   * Add a new empty antenna as current one and push the 'old' current antenna into previous list
   */
  public addNewAntenna() {
    let presentDT = this.getPresentDateTime();
    if (!this.antennas) {
      this.antennas = [];
    }

    // Assign present date/time as default value to dateRemoved if it is empty
    if (this.antennas != null && this.antennas.length > 0) {
      this.status.isAntennasOpen[0] = false;
      let currentAntenna: any = this.antennas[0];
      if (!currentAntenna.dateRemoved.value[0] ) {
        currentAntenna.dateRemoved.value[0] = presentDT;
      }
    }

    // Create a new empty antenna with present date/time as default value to dateInstalled
    let newAntenna = {
      antennaType: {
        codeListValue: '',
        value: ''
      },
      serialNumber: '',
      antennaReferencePoint: {
        value: ''
      },
      markerArpUpEcc: '',
      markerArpNorthEcc: '',
      markerArpEastEcc: '',
      alignmentFromTrueNorth: '',
      antennaRadomeType: {
        value: ''
      },
      radomeSerialNumber: '',
      antennaCableType: '',
      antennaCableLength: '',
      dateInstalled: {
        value: [ presentDT ]
      },
      dateRemoved: {
        value: ['']
      }
    };

    // Add the new antenna as current one and open it by default
    this.antennas.unshift(newAntenna);
    this.status.isAntennasOpen.unshift(true);
    this.status.isAntennaGroupOpen = true;
    this.hasNewAntenna = true;

    // Clone from one of GNSS Antenna objects so that the "new" antenna object can be saved
    let antennaObj: any = {};
    if ( this.siteLogModel.gnssAntennas && this.siteLogModel.gnssAntennas.length > 0 ) {
      antennaObj = (JSON.parse(JSON.stringify( this.siteLogModel.gnssAntennas[0] )));
    }
    antennaObj.gnssAntenna = newAntenna;
    this.siteLogModel.gnssAntennas.unshift(antennaObj);
  }

  /**
   * Remove the new current antenna from the antenna list and restore the old current antenna
   */
  public removeNewAntenna() {
    this.siteLogModel.gnssAntennas.shift();
    this.antennas.shift();
    this.status.isAntennasOpen.shift();
    this.hasNewAntenna = false;
    if (this.antennas != null && this.antennas.length > 0) {
      this.status.isAntennasOpen[0] = true;
      this.antennas[0].dateRemoved.value[0] = '';
    }
  }

  /**
   * Save changes made back to siteLog XML
   */
  public save(form: any) {
    this.isLoading = true;
    this.submitted = true;
    this.hasNewAntenna = false;
    this.hasNewReceiver = false;
    // add root element before saving
    let siteLogJson: any = { 'geo:siteLog': this.siteLogModel };
    this.siteLogService.saveSiteLog(siteLogJson).subscribe(
        (responseJson: any) => {
          if (form)form.pristine = true;
          this.isLoading = false;
          this.backupSiteLogJson();
          console.log('Done in saving site log data: ', responseJson);
        },
        (error: Error) =>  {
          this.isLoading = false;
          this.errorMessage = <any>error;
          console.log('Error in saving changes: ' + this.errorMessage);
        }
    );
  }

  /**
   * Close the site-info page and go back to the default home page (select-site tab)
   */
  public goBack() {
    this.isLoading =  false;
    this.globalService.selectedSiteId = null;
    let link = ['/'];
    this.router.navigate(link);
  }

  public backupSiteLogJson() {
    this.siteLogOrigin = JSON.parse(JSON.stringify( this.siteLogModel ));
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

  /**
   * Update the isOpen flags for all previous GNSS antennas
   */
  public togglePrevAntennas(flag: boolean) {
    if(this.status.isAntennasOpen == null) {
      throw new Error("status.isAntennasOpen is null");
    }
    for (let i = 1; i < this.status.isAntennasOpen.length; i ++) {
      this.status.isAntennasOpen[i] = flag;
    }
  }

  /**
   * Returns true if all previous GNSS antennas are closed, otherwise returns false
   */
  public arePrevAntennasClosed() {
    if(this.status.isAntennasOpen == null) {
      throw new Error("status.isAntennasOpen is null");
    }
    for (let index = 1; index < this.status.isAntennasOpen.length; index ++) {
      if (this.status.isAntennasOpen[index]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Get present date and time string in format of "yyyy-mm-ddThh:mm:ss.sssZ"
   */
  private getPresentDateTime() {
    return new Date().toISOString();
  }

  /**
   * Set current and previous receivers, and their show/hide flags
   */
  private setGnssReceivers(gnssReceivers: any) {
    this.status.isReceiversOpen = [];
    let currentReceiver: any = null;
    for (let receiverObj of gnssReceivers) {
      let receiver = receiverObj.gnssReceiver;
      let dateRemoved: string = ( receiver.dateRemoved && receiver.dateRemoved.value.length > 0 )
          ? receiver.dateRemoved.value[0] : null;
      if ( !dateRemoved ) {
        receiver.dateRemoved = {value: ['']};
        currentReceiver = receiver;
      } else {
        this.receivers.push(receiver);
        this.status.isReceiversOpen.push(false);
      }
    }
    // Sort by dateInstalled for all previous receivers
    this.receivers.sort(this.compareDateInstalled);

    // Current receiver (even null) are the first item in the arrays and open by default
    this.receivers.unshift(currentReceiver);
    this.status.isReceiversOpen.unshift(true);
  }

  /**
   * Set current and previous antennas, and their show/hide flags
   */
  private setGnssAntennas(gnssAntennas: any) {
    this.status.isAntennasOpen = [];
    let currentAntenna: any = null;
    for (let antennaObj of gnssAntennas) {
      let antenna = antennaObj.gnssAntenna;
      let dateRemoved: string = ( antenna.dateRemoved && antenna.dateRemoved.value.length > 0 )
          ? antenna.dateRemoved.value[0] : null;
      if ( !dateRemoved ) {
        antenna.dateRemoved = {value: ['']};
        currentAntenna = antenna;
      } else {
        this.antennas.push(antenna);
        this.status.isAntennasOpen.push(false);
      }
    }
    // Sort by dateInstalled for all previous antennas
    this.antennas.sort(this.compareDateInstalled);

    // Current antenna (even null) are the first item in the arrays and open by default
    this.antennas.unshift(currentAntenna);
    this.status.isAntennasOpen.unshift(true);
  }

  /**
   * Sort receivers/antennas based on their Date_Installed values in ascending order
   */
  private compareDateInstalled(obj1: any, obj2: any) {
    if (obj1 === null || obj1.dateInstalled === null
        || obj1.dateInstalled.value === null
        || obj1.dateInstalled.value.length === 0)
      return 0;
    if (obj2 === null || obj2.dateInstalled === null
        || obj2.dateInstalled.value === null
        || obj2.dateInstalled.value.length === 0)
      return 0;

    if (obj1.dateInstalled.value[0] < obj2.dateInstalled.value[0])
      return 1;
    if (obj1.dateInstalled.value[0] > obj2.dateInstalled.value[0])
      return -1;
    return 0;
  }
}
