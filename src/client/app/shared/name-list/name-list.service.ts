import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import { HttpUtilsService } from '../global/http-utils.service';

/**
 * This class provides the NameList service with methods to read names and add names.
 */
@Injectable()
export class NameListService {
  /**
   * Creates a new NameListService with the injected Http.
   * @param {Http} http - The injected Http.
   * @constructor
   */
  constructor(private http: Http) {}

  /**
   * Returns an Observable for the HTTP GET request for the JSON resource.
   * @return {string[]} The Observable for the HTTP request.
   */
  get(): Observable<string[]> {
    return this.http.get('/assets/data.json')
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
  }
}
