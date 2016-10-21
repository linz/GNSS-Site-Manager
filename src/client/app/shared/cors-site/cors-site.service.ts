import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { SelectSiteSearchType, WFSService } from '../wfs/wfs.service';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';

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
   * @param constantsService - Constants used in the application
   * @constructor
   */
  constructor(private http: Http, private wfsService: WFSService, private constantsService: ConstantsService) {}

  /**
   * Returns an Observable for the HTTP GET request for the REST Web Service resource.  Using WFS Server for queries.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @param {string} siteName - The name of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCorsSitesByUsingWFS(fourCharacterId: string, siteName: string): Observable<any> {
    let wfsParams: SelectSiteSearchType = {
      site4CharId: fourCharacterId,
      siteName: siteName
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
    return this.http.get(this.constantsService.getWebServiceURL()+'/corsSites?size=1000')
      .map(HttpUtilsService.handleJsonData)
      .catch(HttpUtilsService.handleError);
  }

  getSiteById(id: number): Observable<any> {
    return this.http.get(this.constantsService.getWebServiceURL() + '/corsSites?id=' + id)
      .map(HttpUtilsService.handleJsonData)
      .catch(HttpUtilsService.handleError);
  }
}
