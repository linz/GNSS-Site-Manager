import { Component, OnInit, OnDestroy } from '@angular/core';
import { CORE_DIRECTIVES} from '@angular/common';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { ACCORDION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { CorsSiteService, CorsSetupService, SiteLogService } from '../shared/index';

/**
 * This class represents the SiteInfoComponent for viewing and editing detailed information about site/receiver/antenna.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-site-info',
  templateUrl: 'site-info.component.html',
  directives: [ACCORDION_DIRECTIVES, CORE_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SiteInfoComponent implements OnInit, OnDestroy {
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
   * @param {CorsSiteService} corsSiteService - The injected CorsSiteService.
   * @param {CorsSetupeService} corsSetupService - The injected CorsSetupService.
   * @param {SiteLogService} siteLogService - The injected SiteLogService.
   */
  constructor(
    public router: Router,
    public route: ActivatedRoute,
    public corsSiteService: CorsSiteService,
    public corsSetupService: CorsSetupService,
    public siteLogService: SiteLogService
  ) {}

  /**
   * Retrieve relevant information about the site with given Id from DB
   */
  public ngOnInit() {
    this.loadSiteInfoData();
  }

  public loadSiteInfoData() {
    this.siteInfoTab = this.route.params.subscribe(params => {
      let siteId = +params['id'];
      this.corsSiteService.getSiteById(siteId).subscribe(
        (responseJson1: any) => {
          this.site = responseJson1._embedded.corsSites[0];
          this.getAllCorsSetupsBySiteId(siteId);
          this.getSiteLog(this.site.fourCharacterId);
        },
        (error1: any) =>  this.errorMessage = <any>error1
      );
    });
  }

  /**
   * Clear all variables/arrays
   */
  public ngOnDestroy() {
    this.site = null;
    this.siteLocation = null;
    this.siteOwner = null;
    this.metadataCustodian = null;
    this.status = null;
    this.receivers = [];
    this.antennas = [];
    this.errorMessage = '';
    this.siteInfoTab.unsubscribe();
  }

  /**
   * Close the site-info tab and go back to the default home page (select-site tab)
   */
  public goBack() {
    let link = ['/'];
    this.router.navigate(link);
  }

  /**
   * Update the isOpen flags for all accordions to make all open or close
   */
  public toggleAll(flag: boolean) {
    this.status.isSiteInfoGroupOpen = flag;
    this.status.isSiteMediaOpen = flag;
    this.status.isSiteOwnerOpen = flag;
    this.status.isMetaCustodianOpen = flag;
    this.status.isReceiverGroupOpen = flag;
    for (let index in this.status.isReceiversOpen) {
      this.status.isReceiversOpen[index] = flag;
    }
    this.status.isAntennaGroupOpen = flag;
    for (let index in this.status.isAntennasOpen) {
      this.status.isAntennasOpen[index] = flag;
    }
  }

  public areAllOpen() {
    if (!this.status.isSiteInfoGroupOpen || !this.status.isSiteMediaOpen
      || !this.status.isSiteOwnerOpen || !this.status.isMetaCustodianOpen) {
      return null;
    } else if (!this.status.isReceiverGroupOpen
      || !this.status.isAntennaGroupOpen) {
      return null;
    }

    for (let isOpen of this.status.isReceiversOpen) {
      if (!isOpen) {
        return null;
      }
    }
    for (let isOpen of this.status.isAntennasOpen) {
      if (!isOpen) {
        return null;
      }
    }
    return true;
  }

  public areAllClosed() {
    if (this.status.isSiteInfoGroupOpen || this.status.isSiteMediaOpen
      || this.status.isSiteOwnerOpen || this.status.isMetaCustodianOpen) {
      return null;
    } else if (this.status.isReceiverGroupOpen
      || this.status.isAntennaGroupOpen) {
      return null;
    }

    for (let isOpen of this.status.isReceiversOpen) {
      if (isOpen) {
        return null;
      }
    }
    for (let isOpen of this.status.isAntennasOpen) {
      if (isOpen) {
        return null;
      }
    }
    return true;
  }

  public getAllCorsSetupsBySiteId(siteId: number) {
    this.corsSetupService.getCorsSetupsBySiteId(siteId).subscribe(
      (responseJson: any) => {
        let currentReceiver: any = null;
        let currentAntenna: any = null;
        for (let setupObj of responseJson._embedded.setups) {
          for (let equipObj of setupObj.equipmentInUse) {
            if ( equipObj.content.id.equipmentType === 'gnss receiver' ) {
              if ( setupObj.current ) {
                currentReceiver = equipObj.content;
              } else {
                this.receivers.push(equipObj.content);
                this.status.isReceiversOpen.push(false);
              }
            } else if (equipObj.content.id.equipmentType === 'gnss antenna' ) {
              if ( setupObj.current ) {
                currentAntenna = equipObj.content;
              } else {
                this.antennas.push(equipObj.content);
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
      (error: any) =>  this.errorMessage = <any>error
    );
  }

  private getSiteLog(fourCharacterId: string) {
    this.siteLogService.getSiteLogByFourCharacterId(fourCharacterId).subscribe(
      (responseJson: any) => {
        this.siteLocation = responseJson.siteLocation;
        this.siteOwner = responseJson.siteContact.party;
        this.metadataCustodian = responseJson.siteMetadataCustodian.party;

        // Check the existence of contactInfo obj within siteOwner
        if ( !this.siteOwner.contactInfo ){
          this.siteOwner.contactInfo = {
            address: null,
            phone: {
              voices: [null]
            }
          };
        }
      },
      (error: any) =>  this.errorMessage = <any>error
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
