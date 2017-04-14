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
import { OrderGroup } from '../models/order.model';
import { Order } from '../models/order.model';
import { OrderItem } from '../models/order.model';
import { FulfillmentGroup } from '../models/order.model';
import { FulfillmentItem } from '../models/order.model';
import { FulfillmentOption } from '../models/order.model';
/*
 * Providers 
 */
import {URL} from './common/url.data';
import {HttpProvider} from './common/http.provider';


/*
  Generated class for the CategoryService provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class OrderProvider {}