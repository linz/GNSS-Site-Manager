import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { JsonixService } from '../jsonix/jsonix.service';
import { GlobalService } from "../global/global.service";

/**
 * This class provides the service with methods to retrieve CORS sites from DB and select site.
 */
@Injectable()
export class CorsSiteService {
  // WS_URL : string = 'http://localhost:8080/geodesy-web-services';
  // WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // dev
  // WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // test

  /**
   * Creates a new CorsSiteService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param (JsonixService) the service to receive GeodesyML and convert to JSON for consumption
   * @constructor
   */
  constructor(private http: Http, private jsonixService: JsonixService, private globalService: GlobalService) {}

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
      .map((response: Response) => response.json())
      .catch(this.handleError);
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

  /*private getMockAlic(): Observable<string> {
    return this.http.get('/assets/ALIC.json')
            .map((res: Response) => res.json()['geo:GeodesyML']['elements'][0]['geo:siteLog'])
            .catch(this.handleError);
  }*/
}
