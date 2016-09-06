import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * This class provides the service with methods to retrieve CORS Setup info from DB.
 */
@Injectable()
export class SiteLogService {
  // WS_URL : string = 'http://localhost:8080/geodesy-web-services';
  // WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // dev
  WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // test

  /**
   * Creates a new SiteLogService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns one site log defined by the fourCharacterId.
   * @param {string} fourCharacterId - The Four Character Id of the site.
   * @return {object[]} The Observable for the HTTP request.
   */
  getSiteLogByFourCharacterId(fourCharacterId: string): Observable<any> {
    return this.http.get(this.WS_URL+'/siteLogs/search/findByFourCharacterId?id='+fourCharacterId)
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  /**
   * Returns all site logs with the given siteId.
   * @param {number} siteId - The foreign key Site Id to the SiteLog table.
   * @return {object[]} The Observable for the HTTP request.
   */
  getSiteLogsBySiteId(siteId: number): Observable<any> {
    let params = '';
    if (typeof siteId !== 'undefined' && siteId !== null && siteId > 0) {
      params = 'siteId=' + siteId ;
    }
    return this.http.get(this.WS_URL+'/siteLogs?'+params)
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  /**
   * Returns one site log defined by the row id provided.
   * @param {number} id - The primary key Id of the SiteLog record.
   * @return {object[]} The Observable for the HTTP request.
   */
  getSiteLogById(id: number): Observable<any> {
    return this.http.get(this.WS_URL+'/siteLogs?id='+id)
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  /**
   * Returns all records from the SiteLog table.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllSiteLogs(): Observable<any[]> {
    return this.http.get(this.WS_URL+'/siteLogs?size=1000')
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
