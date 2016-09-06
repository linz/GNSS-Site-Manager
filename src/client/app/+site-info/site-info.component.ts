import { Component, OnInit, OnDestroy } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { GlobalService, CorsSiteService, CorsSetupService, SiteLogService } from '../shared/index';

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
  public site: any = null;
  public siteLocation: any = null;
  public siteOwner: any = null;
  public metadataCustodian: any = null;
  public receivers: Array<any> = [];
  public antennas: Array<any> = [];
  public errorMessage: string;
  public siteInfoTab: any = null;

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
   * @param {CorsSetupeService} corsSetupService - The injected CorsSetupService.
   * @param {SiteLogService} siteLogService - The injected SiteLogService.
   */
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public globalService: GlobalService,
    public corsSiteService: CorsSiteService,
    public corsSetupService: CorsSetupService,
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
    this.isLoading =  true;
    this.siteInfoTab = this.route.params.subscribe(params => {
      let siteId = +params['id'];
      this.corsSiteService.getSiteById(siteId).subscribe(
        (responseJson1: any) => {
          this.site = responseJson1._embedded.corsSites[0];
          this.globalService.setSelectedSiteId(this.site.fourCharacterId);
          this.getAllCorsSetupsBySiteId(siteId);
          this.getSiteLog(this.site.fourCharacterId);
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
    if ( datetime === null) {
      return '';
    } else if (datetime.length < 10) {
      return datetime;
    }
    return datetime.substring(0, 10);
  }

  /**
   * Update the isOpen flags for all previous GNSS receivers
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

  private getAllCorsSetupsBySiteId(siteId: number) {
    this.status.isReceiversOpen = [];
    this.status.isAntennasOpen = [];
    this.corsSetupService.getCorsSetupsBySiteId(siteId).subscribe(
      (responseJson: any) => {
        let currentReceiver: any = null;
        let currentAntenna: any = null;
        for (let setup of responseJson._embedded.setups) {
          for (let equip of setup.equipmentInUse) {
            if ( equip.content.id.equipmentType === 'gnss receiver' ) {
              if ( setup.current ) {
                currentReceiver = equip.content;
              } else {
                this.receivers.push(equip.content);
                this.status.isReceiversOpen.push(false);
              }
            } else if (equip.content.id.equipmentType === 'gnss antenna' ) {
              if ( setup.current ) {
                currentAntenna = equip.content;
              } else {
                this.antennas.push(equip.content);
                this.status.isAntennasOpen.push(false);
              }
            }
          }
        }
        // Sort by dateInstalled for all previous receivers/antennas
        this.receivers.sort(this.compareDate);
        this.antennas.sort(this.compareDate);

        // Current receiver/antenna (even null) are the first item in the arrays and open by default
        this.receivers.unshift(currentReceiver);
        this.antennas.unshift(currentAntenna);
        this.status.isReceiversOpen.unshift(true);
        this.status.isAntennasOpen.unshift(true);
      },
      (error: Error) =>  this.errorMessage = <any>error
    );
  }

  private getSiteLog(fourCharacterId: string) {
    this.siteLogService.getSiteLogByFourCharacterId(fourCharacterId).subscribe(
      (responseJson: any) => {
        this.siteLocation = responseJson.siteLocation;
        this.siteOwner = responseJson.siteContact.party;
        this.metadataCustodian = responseJson.siteMetadataCustodian.party;

        // Check the existence of contactInfo/phone in siteOwner
        if ( !this.siteOwner.contactInfo ) {
          this.siteOwner.contactInfo = {
            address: null,
            phone: {
              voices: [null]
            }
          };
        } else if ( !this.siteOwner.contactInfo.phone ) {
          this.siteOwner.contactInfo.phone = {
            voices: [null]
          };
        }
      },
      (error: Error) =>  this.errorMessage = <any>error
    );
  }

  private compareDate(obj1: any, obj2: any) {
    if (obj1 === null || obj1.period === null)
      return 0;
    if (obj2 === null || obj2.period === null)
      return 0;

    if (obj1.period.from < obj2.period.from)
      return 1;
    if (obj1.period.from > obj2.period.from)
      return -1;
    return 0;
  }
}
