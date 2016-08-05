import { Component, OnInit } from '@angular/core';
import { REACTIVE_FORM_DIRECTIVES } from '@angular/forms';
import { NG_TABLE_DIRECTIVES } from 'ng2-table/ng2-table';
import { PAGINATION_DIRECTIVES } from 'ng2-bootstrap/ng2-bootstrap';
import { NameListService } from '../shared/index';


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

  public siteName: string = '';
  public fourCharacterId: string = '';
  public sites: Array<any> = [];
  public siteSelected: any = null;
  public selectedSiteId: string = '';
  public searchMsg: string = '';
  public errorMessage: string;

  /**
   * Creates an instance of the SelectSiteComponent with the injected NameListService.
   *
   * @param {NameListService} nameListService - The injected NameListService.
   */
  constructor(public nameListService: NameListService) {}

  /**
   * Initialize relevant variables when the directive is instantiated
   */
  ngOnInit() {
    this.clearAll();
  }

  /**
   * Return a list of sites from DB based on the site name and/or four character ID.
   */
  searchSites() {
    this.sites = [];
    this.nameListService.getCorsSitesBy(this.fourCharacterId, this.siteName)
          .subscribe(
            (responseJson: any) => this.sites = (responseJson._embedded ? responseJson._embedded.corsSites : []),
            (error: any) =>  this.errorMessage = <any>error,
            () => {
              if (this.sites.length === 0)
              this.searchMsg = 'No sites found. Please refine your search criteria and try it again.';
            }
          );
   }

  /**
   * Select a site from the search results of sites.
   */
  selectSite(site: any, checkbox: any) {
    this.siteSelected = site;
    this.selectedSiteId = site.fourCharacterId;
  }

  /**
   * Clear all input fields and clear sites array
   */
  clearAll() {
    this.searchMsg = 'Please enter search criteria for searching desired sites.';
    this.siteName = '';
    this.fourCharacterId = '';
    this.sites = [];
    this.siteSelected = null;
    this.selectedSiteId = '';
  }
}
