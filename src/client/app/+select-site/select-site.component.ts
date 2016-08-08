import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import {Subscription} from 'rxjs/Subscription';
import { CorsSiteService } from '../shared/index';
import { ServiceWorkerService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-select-site',
  templateUrl: 'select-site.component.html',
  styleUrls: ['select-site.component.css'],
  directives: [NG_TABLE_DIRECTIVES, PAGINATION_DIRECTIVES, REACTIVE_FORM_DIRECTIVES]
})
export class SelectSiteComponent implements OnInit {
  serviceWorkerSubscription: Subscription;
  public siteName: string = '';
  public fourCharacterId: string = '';
  public sites: Array<any> = [];
  public selectedSite: any = null;
  public searchMsg: string = '';
  public errorMessage: string;
  public isSearching: boolean = false;
  private cacheItems: Array<string> = [];

  /**
   * Creates an instance of the SelectSiteComponent with the injected CorsSiteService.
   *
   * @param {CorsSiteService} corsSiteService - The injected CorsSiteService.
   */
  constructor(public corsSiteService: CorsSiteService, private serviceWorkerService: ServiceWorkerService) {}

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.setupSubscriptions();
    this.clearAll();
    this.updateCacheList();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCache$.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Return a list of sites from DB based on the site name and/or four character Id.
   */
  searchSites() {
    this.isSearching = true;
    this.sites = [];
    this.corsSiteService.getCorsSitesBy(this.fourCharacterId, this.siteName)
          .subscribe(
            (responseJson: any) => this.sites = (responseJson._embedded ? responseJson._embedded.corsSites : []),
            (error: any) =>  this.errorMessage = <any>error,
            () => {
              this.isSearching = false;
              if (this.sites.length === 0)
              this.searchMsg = 'No sites found. Please refine your search criteria and try it again.';
            }
          );
   }

  /**
   * Select a site from the search results of sites.
   */
  selectSite(site: any) {
    this.selectedSite = site;
  }

  /**
   * Clear all input fields and clear sites array
   */
  clearAll() {
    this.searchMsg = 'Please enter search criteria for searching desired sites.';
    this.siteName = '';
    this.fourCharacterId = '';
    this.sites = [];
    this.selectedSite = null;
    this.isSearching = false;
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache() {
    let success: Function = function () {
      // _this.updateCacheList(); - not necessary now as done via a message
    };
    this.serviceWorkerService.clearCacheService(success, undefined);
  }

  /**
   * Component method to retrieve the list of URLs cached in the Service Worker and to update the this.cacheItem array
   */
  // TODO - all this related code no longer needed.  However keep for the moment so we can see how it is wired-up
  updateCacheList() {
    var _this = this;

    let success: Function = function (event: MessageEvent) {
      _this.cacheItems.length = 0;
      _this.cacheItems = event.data;
    };
    this.serviceWorkerService.getCacheList(success, undefined);
  }
}
