import { Component, OnInit, OnDestroy, NgZone } from '@angular/core';
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
  public receiver: any = null;
  public prevReceivers: Array<any> = [];
  public antenna: any = null;
  public prevAntennas: Array<any> = [];
  public siteLocation: any = null;
  public errorMessage: string;
  public siteInfoTab: any = null;

  public status: Object = {
    oneAtATime: false,
    isSiteInfoGroupOpen: true,
    isSiteMedia: false,
    isSiteOwnerOpen: false,
    isMetaCustodianOpen: false,
    isReceiverGroupOpen: false,
    isCurrentReceiverOpen: true,
    isPrevReceiversOpen: [],
    isAntennaGroupOpen: false,
    isCurrentAntennaOpen: true,
    isPrevAntennasOpen: []
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
    public zone: NgZone,
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
          this.getCurrentSetup(this.site.fourCharacterId);
          this.getSiteLog(this.site.fourCharacterId);
        },
        (error1: any) =>  this.errorMessage = <any>error1
      );
    });
  }

  /**
   * Clear all input fields and clear sites array
   */
  public ngOnDestroy() {
    this.site = null;
    this.receiver = null;
    this.antenna = null;
    this.siteInfoTab.unsubscribe();
  }

  /**
   * Close the site-into tab and go back to the default home page (select-site tab)
   */
  public goBack() {
    let link = ['/'];
    this.router.navigate(link);
  }

  public update() {
    this.zone.runOutsideAngular(() => {
        //this.zone.run();
    });
  }

  private getCurrentSetup(fourCharacterId: string) {
    this.corsSetupService.getCurrentSetupByFourCharacterId(fourCharacterId).subscribe(
      (responseJson: any) => {
        for (let equip of responseJson.equipmentInUse) {
          if ( equip.content.id.equipmentType === 'gnss receiver' ) {
            this.receiver = equip.content;
          } else if (equip.content.id.equipmentType === 'gnss antenna' ) {
            this.antenna = equip.content;
          }
        }
      },
      (error: any) =>  this.errorMessage = <any>error
    );
  }

  private getSiteLog(fourCharacterId: string) {
    this.siteLogService.getSiteLogByFourCharacterId(fourCharacterId).subscribe(
      (responseJson: any) => {
        this.siteLocation = responseJson.siteLocation;
      },
      (error: any) =>  this.errorMessage = <any>error
    );
  }
}
