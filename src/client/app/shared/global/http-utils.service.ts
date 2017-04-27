import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { ErrorObservable } from 'rxjs/observable/ErrorObservable';
import { Observable } from 'rxjs/Rx';
import { Response } from '@angular/http';

@Injectable()
export class HttpUtilsService {

    /**
     * Used as part of http get Observables.  Defined so can easily change to 'handleDataDebug'.
     *
     * @param response
     * @returns {Promise<JSON>}
     */
    public static handleJsonData(response: Response) {
        return response.json();
    }

    public static handleJsonDataDebug(response: Response) {
        let data: any = response.json();
        console.debug('handleDataDebug: ', data);
        return data;
    }

    /**
     * Handle HTTP error
     */
    public static handleError(error: any): ErrorObservable {
        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        errMsg += error.stack;
        console.error(errMsg);
        return Observable.throw(error.json().error || 'Server error');
    }

    /**
     * Creates a new HttpUtilsService with the injected Http.
     * @param {Http} http - The injected Http.
     * @constructor
    */
    constructor(private http: Http) {}

    /**
     * Returns an Observable for the HTTP GET request for the JSON resource.
     * @return {string[]} The Observable for the HTTP request.
    */
    public loadJsonObject(jsonFilePath: string): Observable<string[]> {
        return this.http.get(jsonFilePath)
            .map(HttpUtilsService.handleJsonData)
            .catch(HttpUtilsService.handleError);
    }
}
