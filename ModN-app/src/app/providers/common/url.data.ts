import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/map';

/*
  Generated class for the URL provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class URL {
  /*
   * URL's endpoints 
   * justfly is a variable for services URL
   * rest of all values for endpoints 
   */

  /* 
   * URL for justfly
   */
  public justfly:string = "http://localhost:8080/";
  
  /*
   * URL for Authentication
   *  
   */
  public auth:string = "auth";

  /* 
   * URL for Administrator 
   */
  public admin:string = "admin";

   /*
   * URL for User 
   * User Tpe  : Admin, Host, Guest, Service Provider,  
   */
  public users:string = "users"; 
  // internally user is equivalent to guest
  public addresses:string = this.users+"/addresses"; 
  
  /*
   * URL for services
   */
  public catalog:string = "caltalog";
  public products:string = this.catalog+"/products";
  public skus;string = this.products+"/skus";
  // later change product to service
  
   /* 
    * URL for orders
    */
  public orders:string = "orders";
  public order_items:string = this.orders+"/order-items";
  public fulfillment_groups:string = this.order_items+"/fulfillment-groups";
  public fulfillment_items:string = this.fulfillment_groups+"/fulfillment_items";
  public fulfillment_option:string = this.fulfillment_groups+"/fulfillment-option";

  constructor() {
    console.log('Hello URL Provider');
  }

}
