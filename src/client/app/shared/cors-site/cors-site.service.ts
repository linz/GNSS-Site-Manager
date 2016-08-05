import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * This class provides the service with methods to retrieve CORS sites from DB and select site.
 */
@Injectable()
export class CorsSiteService {
  WS_URL : string = 'http://localhost:8080/geodesy-web-services';

  /**
   * Creates a new CorsSiteService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the REST Web Service resource.
   * @return {object[]} The Observable for the HTTP request.
   */
  getCorsSitesBy(fourCharacterId: string, siteName: string): Observable<any> {
    let params = '';
    if (fourCharacterId !== null && fourCharacterId !== '') {
      params = 'fourCharacterId='+fourCharacterId + '&';
    }
    if (siteName !== null && siteName !== '') {
      params += 'name='+siteName + '&';
    }
    return this.http.get(this.WS_URL+'/corsSites?'+params+ 'size=1000')
              .map((response: Response) => response.json())
              .catch(this.handleError);
  }

  /**
   * Returns an Observable for the HTTP GET request for the REST resource.
   * @return {object[]} The Observable for the HTTP request.
   */
  getAllCorsSites(): Observable<any[]> {
    return this.http.get(this.WS_URL+'/corsSites?size=1000')
            .map((response: Response) => response.json())
            .catch(this.handleError);
  }

  /**
    * Handle HTTP error
    */
  private handleError (error: any) {
    // In a real world app, we might use a remote logging infrastructure
    let errMsg = (error.message) ? error.message :
      error.status ? `${error.status} - ${error.statusText}` : 'Server error';
    console.error(errMsg); // log to console instead
    return Observable.throw(errMsg);
  }
}
