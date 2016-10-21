import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpUtilsService } from '../global/http-utils.service';
import { ConstantsService } from '../global/constants.service';

/**
 * This class provides the service with methods to retrieve CORS Setup info from DB.
 */
@Injectable()
export class CorsSetupService {
  /**
   * Creates a new CorsSetupService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param constantsService - Constants used in the application
   * @constructor
   */
  constructor(private http: Http, private constantsService: ConstantsService) {}

  /**
   * Returns an Observable for the HTTP GET request for the current Setup info.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCurrentSetupByFourCharacterId(fourCharacterId: string): Observable<any> {
    return this.http.get(this.constantsService.getWebServiceURL()+'/setups/search/findCurrentByFourCharacterId?id='+fourCharacterId)
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST Web Service resource.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCorsSetupsBySiteId(siteId: number): Observable<any> {
    let params = '';
    if (typeof siteId !== 'undefined' && siteId !== null && siteId > 0) {
      params = 'siteId=' + siteId ;
    }
    return this.http.get(this.constantsService.getWebServiceURL()+'/setups?'+params+'&size=1000')
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST resource.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllCorsSetups(): Observable<any[]> {
    return this.http.get(this.constantsService.getWebServiceURL()+'/setups?size=1000')
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
  }

  getCorsSetupById(id: number): Observable<any> {
    return this.http.get(this.constantsService.getWebServiceURL()+'/setups?id='+id)
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
  }
}
