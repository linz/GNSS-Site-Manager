import { Injectable } from '@angular/core';
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
}
