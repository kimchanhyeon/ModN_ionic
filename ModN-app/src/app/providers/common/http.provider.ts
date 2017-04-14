/*
 * Modules 
 */

import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions, URLSearchParams } from '@angular/http';
/*
 * Providers 
 */
import { URL } from './url.data';

/*
  Generated class for the HttpService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class HttpProvider{
    constructor(
        public url:URL,
        public http: HttpProvider
    ) {
        console.log('Hello Http Provider');
    }
    get(endpoint: string, params?: any, options?: RequestOptions) {
        if (!options) {
            options = new RequestOptions();
        }

        // Support easy query params for GET requests
        if (params) {
            let p = new URLSearchParams();
            for(let k in params) {
                p.set(k, params[k]);
            }
            // Set the search field if we have params and don't already have
            // a search field set in options.
            options.search = !options.search && p || options.search;
        }
        return this.http.get(this.url + '/' + endpoint, options);
    }
    post(endpoint: string, body: any, options?: RequestOptions) {
        return this.http.post(this.url + '/' + endpoint, body, options);
    }

    put(endpoint: string, body: any, options?: RequestOptions) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    }

    delete(endpoint: string, body: any, options?: RequestOptions) {
        return this.http.post(this.url + '/' + endpoint, body, options);
    }

    patch(endpoint: string, body: any, options?: RequestOptions) {
        return this.http.put(this.url + '/' + endpoint, body, options);
    }
}
