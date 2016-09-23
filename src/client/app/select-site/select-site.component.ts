import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { GlobalService, CorsSiteService, ServiceWorkerService } from '../shared/index';

/**
 * This class represents the SelectSiteComponent for searching and selecting CORS sites.
 */
@Component({
  moduleId: module.id,
  selector: 'sd-select-site',
  templateUrl: 'select-site.component.html',
})
export class SelectSiteComponent implements OnInit {
  private serviceWorkerSubscription: Subscription;
  public siteName: string = '';
  public fourCharacterId: string = '';
  public sites: Array<any> = [];
  public selectedSite: any = null;
  public searchMsg: string = '';
  public errorMessage: string;
  public isSearching: boolean = false;
  private cacheItems: Array<string> = [];

  public columns:Array<any> = [
    {name: 'fourCharacterId', sort: ''},
    {name: 'name', sort: ''}
  ];


  /**
   * Creates an instance of the SelectSiteComponent with the injected CorsSiteService.
   *
   * @param {Router} router - The injected Router for switching between select-site and site-info pages.
   * @param {CorsSiteService} corsSiteService - The injected CorsSiteService.
   * @param {ServiceWorkerService} serviceWorkerService - service interface to the Servcie Worker
   */
  constructor(public router: Router, public corsSiteService: CorsSiteService,
      private globalService: GlobalService, private serviceWorkerService: ServiceWorkerService) { }

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.setupSubscriptions();
    this.clearAll();
    this.updateCacheList();
  }

  setupSubscriptions() {
    this.serviceWorkerSubscription = this.serviceWorkerService.clearCacheObservable.subscribe((isCacheChanged: boolean) => {
      if (isCacheChanged) {
        this.updateCacheList();
      }
    });
  }

  /**
   * Return a list of sites from DB based on the site name and/or four character Id.
   */
  searchSites1() {
    this.isSearching = true;
    this.sites = [];
    this.corsSiteService.getCorsSitesBy(this.fourCharacterId, this.siteName).subscribe(
      (responseJson: any) => {
        this.sites = responseJson._embedded ? responseJson._embedded.corsSites : [];
        this.isSearching = false;
        if (this.sites.length === 0)
          this.searchMsg = 'No sites found. Please refine your search criteria and try it again.';
      },
      (error: Error) => {
        this.errorMessage = <any>error;
        this.isSearching = false;
        console.log('Error in searching CORS sites: '+this.errorMessage);
      }
    );
  }

  /**
   * Return a list of sites from DB based on the site name and/or four character Id.  Using WFS and XML.
   */
  searchSites() {
    this.isSearching = true;
    this.sites = [];
    this.corsSiteService.getCorsSitesByUsingWFS(this.fourCharacterId, this.siteName)
      .subscribe(
        (responseJson: any) => this.sites = responseJson,    // ? responseJson._embedded.corsSites : []),
        (error: Error) => this.errorMessage = <any>error,
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
    this.globalService.setSelectedSiteId(site.fourCharacterId);
    let link = ['/siteInfo', site.id];
    this.router.navigate(link);
  }

  /**
   * Clear all input fields and clear sites array
   */
  clearAll() {
    this.errorMessage = null;
    this.searchMsg = 'Please enter search criteria for searching desired sites.';
    this.siteName = '';
    this.fourCharacterId = '';
    this.sites.length = 0;
    this.selectedSite = null;
    this.isSearching = false;
    this.globalService.selectedSiteId = null;
  }


  public sortField(columnIndex:number):any {
    let sort = this.columns[columnIndex].sort;
    for (let i = 0; i < this.columns.length; i ++) {
      if ( i === columnIndex) {
        if (!sort) {
          sort = 'asc';
        }
        this.columns[i].sort = (sort === 'asc') ? 'desc' : 'asc';
      } else {
        this.columns[i].sort = '';
      }
    }

    let columnName = this.columns[columnIndex].name;
    this.sites = this.sites.sort((previous:any, current:any) => {
      if (previous[columnName] > current[columnName]) {
        return sort === 'desc' ? -1 : 1;
      } else if (previous[columnName] < current[columnName]) {
        return sort === 'asc' ? -1 : 1;
      }
      return 0;
    });
  }

  /**
   * Component method to request the Service Worker clears it's cache.
   */
  clearCache = (): void  => {
    this.serviceWorkerService.clearCache().then((data: string) => {
      console.debug('select-site.component clearCache() success: ', data);
    }, (error: Error) => {
      throw new Error('Error in clearCache: ' + error.message);
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
}
