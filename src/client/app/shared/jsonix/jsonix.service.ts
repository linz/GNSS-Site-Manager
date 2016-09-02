import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';

/**
 * This class provides the service to transfer data in GeodesyML format to and from the back end services, and translate to
 * work with JSON on the client side.
 */
@Injectable()
export class JsonixService {
  // WS_URL : string = 'http://localhost:8080/geodesy-web-services';
  // WS_URL : string = 'https://dev.geodesy.ga.gov.au'; // dev
  static WS_URL : string = 'https://test.geodesy.ga.gov.au'; // test

  /**
   * We want to prefix the relative URL with the required base class.  If the URL is absolute with a server already, then
   * we want to replace what is provided to use the required base class.
   *
   * @param url
   * @returns {string} - url using required base path
   */
  static mustHaveServer(url: string): string {
    // Capture after first '/' (not including 'http(s)://') - absolute URL
    let regEx1: RegExp = RegExp('/^https?:\/\/[^\/]*(\/.*)/gi');  // new
    // Capture all but first '/' - relative URL
    let regEx2: RegExp = RegExp('/^\/(.*)/');
    // TODO - some typescript typing problem here and a type cannot be assigned
    let matches1 = regEx1.exec(url);
    if (matches1.length > 0) {
      return JsonixService.WS_URL + matches1[0];
    }
    let matches2 = regEx2.exec(url);
    if (matches2.length > 0) {
      return JsonixService.WS_URL + matches2[0];
    }
    return JsonixService.WS_URL + '/' + matches2[0];
  }

  private static mustHaveMLParam(url: string): string {
    let regEx: RegExp = new RegExp('/.*?format\s*=\s*geodesyml/i');
    if (! regEx.test(url)) {
      url += '&format=geodesyml';
    }
    return url;
  }

  /**
   * Creates a new CorsSiteService with the injected Http.
   * @param {Http} http - The injected Http.
   * @param (JsonixService) jsonixService - the service to receive GeodesyML and convert to JSON for consumption
   * @constructor
   */
  constructor(private http: Http ) {}

  /**
   * Given a url, confirm it contains the 'format=geodesyml' param and add if missing.  Do an HTTP GET on that URL, confirm
   * XML was returned and translate using Jsonix to Json.
   * @param relativePathUrl - the HTTP GET Url to the backend service.  It does not include the base path - that is added here.
   *                          It may or may not contain the 'format=geodesyml' param.  It is added if missing.
   * @return An Observable with the JSON representation of the GedoesyML returned from the HTTP GET call
   */
  getJson(relativePathUrl: string): Observable<any> {
    let url = JsonixService.mustHaveServer(relativePathUrl);
    url = JsonixService.mustHaveMLParam(url);

    console.debug('url: ', url);

    let x : Observable<any> = this.http.get(url)
      .map((response: Response) => response.json())
      .catch(this.handleError);

    // now convert to JSON
    return x;
  }

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
      params += 'name='+siteName + '&';
    }
    console.debug('call: ', URL);

    return undefined;
  }

  /**
   * Returns an Observable for the HTTP GET request for all records available from the Site table.
   * @return {object[]} The Observable for the HTTP request.
   */
  // getAllCorsSites(): Observable<any[]> {
  //   return this.http.get(this.WS_URL+'/corsSites?size=1000')
  //           .map((response: Response) => response.json())
  //           .catch(this.handleError);
  // }
  //
  // getSiteById(id: number): Observable<any> {
  //   return this.http.get(this.WS_URL+'/corsSites?id='+id)
  //           .map((response: Response) => response.json())
  //           .catch(this.handleError);
  // }

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
