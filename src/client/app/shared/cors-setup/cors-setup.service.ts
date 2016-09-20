import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { GlobalService } from "../global/global.service";

/**
 * This class provides the service with methods to retrieve CORS Setup info from DB.
 */
@Injectable()
export class CorsSetupService {
  /**
   * Creates a new CorsSetupService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param globalService - Common methods
   * @constructor
   */
  constructor(private http: Http, , private globalService: GlobalService) {}

  /**
   * Returns an Observable for the HTTP GET request for the current Setup info.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCurrentSetupByFourCharacterId(fourCharacterId: string): Observable<any> {
    return this.http.get(this.globalService.getWebServiceURL()+'/setups/search/findCurrentByFourCharacterId?id='+fourCharacterId)
            .map((response: Response) => response.json())
            .catch(this.handleError);
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
    return this.http.get(this.globalService.getWebServiceURL()+'/setups?'+params+'&size=1000')
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST resource.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllCorsSetups(): Observable<any[]> {
    return this.http.get(this.globalService.getWebServiceURL()+'/setups?size=1000')
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  getCorsSetupById(id: number): Observable<any> {
    return this.http.get(this.globalService.getWebServiceURL()+'/setups?id='+id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
