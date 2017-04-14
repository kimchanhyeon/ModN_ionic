/*
 * Modules
 */
import { Injectable } from '@angular/core';
import {Headers, RequestOptions} from '@angular/http';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/map';

/*
 * Models 
 */
import { User } from '../../models/user.model';

/*
 * Providers 
 */
import { URL } from './url.data';
import { HttpProvider } from './http.provider';


@Injectable()
export class AuthProvider{
    _jwt:string ="";
    constructor(
        private url:URL,
        private httpProvider:HttpProvider
    ){
    }
    /*
     * getJwt 
     */
    /*
     * setJwt 
     */
    /*
     * getAccount 
     */
    /*
     * setAccount 
     */
}