import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';
import { GlobalService, CorsSiteService } from '../shared/index';

/**
 * This class represents the SiteInfoComponent for viewing and editing detailed information about site/receiver/antenna.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-site-info',
  templateUrl: 'site-info.component.html',
})
export class SiteInfoComponent implements OnInit, OnDestroy {
  public isLoading: boolean = false;
  public siteInfo: any = null;
  public site: any = null;
  public siteLocation: any = null;
  public siteOwner: any = null;
  public metadataCustodian: any = null;
  public receivers: Array<any> = [];
  public antennas: Array<any> = [];
  public errorMessage: string;
  public siteInfoTab: any = null;

  public siteInfoForm: FormGroup = null;
  public submitted: boolean = false;

  public status: any = {
    oneAtATime: false,
    isSiteInfoGroupOpen: true,
    isSiteMediaOpen: false,
    isSiteOwnerOpen: false,
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
   * @param {CorsSiteService} corsSiteService - The injected CorsSiteService.
   */
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public globalService: GlobalService,
    public corsSiteService: CorsSiteService
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
    this.isLoading =  true;
    this.siteInfoTab = this.route.params.subscribe(params => {
      let siteId = +params['id'];
      this.corsSiteService.getSiteById(siteId).subscribe(
        (responseJson: any) => {
          // MODIFICATION for Jsonix change
          // this.site = responseJson1._embedded.corsSites[0];
          this.siteInfo = responseJson;
          this.site = this.siteInfo.siteIdentification;
          this.siteLocation = this.siteInfo.siteLocation;
          this.siteOwner = this.siteInfo.siteContact[0].ciResponsibleParty;
          this.metadataCustodian = this.siteInfo.siteMetadataCustodian.ciResponsibleParty;
          this.setGnssReceivers(this.siteInfo.gnssReceivers);
          this.setGnssAntennas(this.siteInfo.gnssAntennas);
          this.globalService.setSelectedSiteId(this.site.fourCharacterID);
          this.isLoading =  false;
        },
        (error1: Error) =>  {
          this.errorMessage = <any>error1;
          this.isLoading =  false;
        }
      );
    });
  }

  /**
   * Clear all variables/arrays
   */
  public ngOnDestroy() {
    this.isLoading =  false;
    this.siteInfo = null;
    this.site = null;
    this.siteLocation = null;
    this.siteOwner = null;
    this.metadataCustodian = null;
    this.status = null;
    this.receivers.length = 0;
    this.antennas.length = 0;
    this.errorMessage = '';
    this.globalService.selectedSiteId = null;
    this.siteInfoTab.unsubscribe();
  }

  public save() {
    this.submitted = true;
    //this.siteInfoForm.pristine = true;
    console.log( this.siteInfo );
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
   * Update the isOpen flags for all previous GNSS receivers,sko
   */
  public togglePrevReceivers(flag: boolean) {
    for (let i = 1; i < this.status.isReceiversOpen.length; i ++) {
      this.status.isReceiversOpen[i] = flag;
    }
  }

  /**
   * Update the isOpen flags for all previous GNSS antennas
   */
  public togglePrevAntennas(flag: boolean) {
    for (let i = 1; i < this.status.isAntennasOpen.length; i ++) {
      this.status.isAntennasOpen[i] = flag;
    }
  }

  /**
   * Returns true if all previous GNSS receivers are open, otherwise returns false
   */
  public arePrevReceiversOpen() {
    for (let i = 1; i < this.status.isReceiversOpen.length; i ++) {
      if (!this.status.isReceiversOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS receivers are closed, otherwise returns false
   */
  public arePrevReceiversClosed() {
    for (let i = 1; i < this.status.isReceiversOpen.length; i ++) {
      if (this.status.isReceiversOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS antennas are open, otherwise returns false
   */
  public arePrevAntennasOpen() {
    for (let i = 1; i < this.status.isAntennasOpen.length; i ++) {
      if (!this.status.isAntennasOpen[i]) {
        return false;
      }
    }
    return true;
  }

  /**
   * Returns true if all previous GNSS antennas are closed, otherwise returns false
   */
  public arePrevAntennasClosed() {
    for (let index = 1; index < this.status.isAntennasOpen.length; index ++) {
      if (this.status.isAntennasOpen[index]) {
        return false;
      }
    }
    return true;
  }

  private setGnssReceivers(gnssReceivers: any) {
    this.status.isReceiversOpen = [];
    let currentReceiver: any = null;
    for (let receiverObj of gnssReceivers) {
      let receiver = receiverObj.gnssReceiver;
      if ( !receiver.dateRemoved.value || receiver.dateRemoved.value.length === 0 ) {
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

  private setGnssAntennas(gnssAntennas: any) {
    this.status.isAntennasOpen = [];
    let currentAntenna: any = null;
    for (let antennaObj of gnssAntennas) {
      let antenna = antennaObj.gnssAntenna;
      if ( !antenna.dateRemoved.value || antenna.dateRemoved.value.length === 0 ) {
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

  private compareDateInstalled(obj1: any, obj2: any) {
    if (obj1 === null || obj1.dateInstalled === null || obj1.dateInstalled.value === null || obj1.dateInstalled.value.length === 0)
      return 0;
    if (obj2 === null || obj2.dateInstalled === null || obj2.dateInstalled.value === null || obj2.dateInstalled.value.length === 0)
      return 0;

    if (obj1.dateInstalled.value[0] < obj2.dateInstalled.value[0])
      return 1;
    if (obj1.dateInstalled.value[0] > obj2.dateInstalled.value[0])
      return -1;
    return 0;
  }
}
