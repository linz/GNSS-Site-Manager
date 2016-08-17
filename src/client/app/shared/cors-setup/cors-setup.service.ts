import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * This class provides the service with methods to retrieve CORS Setup info from DB.
 */
@Injectable()
export class CorsSetupService {
  // WS_URL : string = 'http://localhost:8080/geodesy-web-services';
  // WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // dev
  WS_URL : string = 'https://test.geodesy.ga.gov.au'; // test

  /**
   * Creates a new CorsSetupService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the current Setup info.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCurrentSetupByFourCharacterId(fourCharacterId: string): Observable<any> {
    return this.http.get(this.WS_URL+'/setups/search/findCurrentByFourCharacterId?id='+fourCharacterId)
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
    return this.http.get(this.WS_URL+'/setups?'+params)
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST resource.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllCorsSetups(): Observable<any[]> {
    return this.http.get(this.WS_URL+'/setups?size=1000')
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  getCorsSetupById(id: number): Observable<any> {
    return this.http.get(this.WS_URL+'/setups?id='+id)
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
