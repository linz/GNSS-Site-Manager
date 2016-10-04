import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalService } from '../global/global.service';
import { SelectSiteSearchType, WFSService } from '../wfs/wfs.service';

/**
 * This class provides the service with methods to retrieve CORS sites from DB and select site.
 */
@Injectable()
export class CorsSiteService {
  /**
   * Creates a new CorsSiteService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param globalService - Common methods
   * @param wfsService - Use Geoserver WFS for queries
   * @constructor
   */
  constructor(private http: Http, private globalService: GlobalService, private wfsService: WFSService) {}

  /**
   * Returns an Observable for the HTTP GET request for the REST Web Service resource.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @param {string} siteName - The name of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCorsSitesBy(fourCharacterId: string, siteName: string): Observable<any> {
    let params = '';
    if (typeof fourCharacterId !== 'undefined' && fourCharacterId !== null && fourCharacterId !== '') {
      params = 'fourCharacterId='+fourCharacterId.toUpperCase() + '&';
    }
    if (typeof siteName !== 'undefined' && siteName !== null && siteName !== '') {
      params += 'name=' + siteName + '&';
    }
    return this.http.get(this.globalService.getWebServiceURL() + '/corsSites?' + params + 'size=1000')
      .map(GlobalService.handleDataDebug)
      .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST Web Service resource.  Using WFS Server for queries.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @param {string} siteName - The name of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCorsSitesByUsingWFS(fourCharacterId: string, siteName: string): Observable<any> {
    let params = '';
    if (typeof fourCharacterId !== 'undefined' && fourCharacterId !== null && fourCharacterId !== '') {
      params = 'fourCharacterId='+fourCharacterId.toUpperCase() + '&';
    }
    if (typeof siteName !== 'undefined' && siteName !== null && siteName !== '') {
      params += 'name=' + siteName + '&';
    }

    console.log('getCorsSitesByUsingWFS(fourCharacterId: ', fourCharacterId);
    let wfsParams: SelectSiteSearchType = {
      siteName: fourCharacterId
    };
    return this.wfsService.wfsQuery(wfsParams)
        .map(this.fixWFSeData)
        .catch((e: any) => {
          // propagate errors through the Observable
          return Observable.create((obs: any) => {
            obs.error('ERROR in getCorsSitesByUsingWFS: ', e);
          });
        });
  }

  private fixWFSeData(wfsData: any): any {
    // TODO - make this data an Interface
    console.debug('cors-site service - from wfsService - fixWFSeData - data: ', wfsData);
    let fieldsDefined: any[] = [];
    wfsData.map((wfsFormat:any) => {
      let name: string = wfsFormat['geo:Site'].hasOwnProperty('name') ? wfsFormat['geo:Site'].name[0].value : 'no name';
      fieldsDefined.push({'fourCharacterId':wfsFormat['geo:Site'].identifier.value, 'name': name});
    });
    console.debug('cors-site service - from wfsService - fixWFSeData - return: ', fieldsDefined);
    return fieldsDefined; //data;
  }

  /**
   * Returns an Observable for the HTTP GET request for all records available from the Site table.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllCorsSites(): Observable<any[]> {
    return this.http.get(this.globalService.getWebServiceURL()+'/corsSites?size=1000')
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  getSiteById(id: number): Observable<any> {
    return this.http.get(this.globalService.getWebServiceURL() + '/corsSites?id=' + id)
      .map((response: Response) => response.json())
      .catch(this.handleError);
  }

  /**
   * Handle HTTP error
   */
  private handleError(error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
