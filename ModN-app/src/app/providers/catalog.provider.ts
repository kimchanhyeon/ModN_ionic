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
import { Seller }  from '../models/catalog.model';
import { Market } from '../models/catalog.model';
import { Product } from '../models/catalog.model';
import { Sku } from '../models/catalog.model';
import { Option } from '../models/catalog.model';

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
export class CatalogProvider {
  private products:Array<Product> = [];
  private skus:Array<Sku> = [];
  constructor(
    public url: URL,
    public httpProvider: HttpProvider
    ) {
    console.log('Hello CatalogService Provider');
  }
  /*
   * Method for Products
   */
/*
  create(product:Product):Observable<Product>{
    let body = JSON.stringify(product);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.httpService.create(this.url.catalog, body, options);
  }
  
  list():Observable<Array<Product>>{
    let params = JSON.stringify({});
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers, body:params});
    return this.httpService.list(this.url.catalog, options);
  }
  
  update(product:Product):Observable<Product>{
    let body = JSON.stringify(product);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.httpService.update(this.url.catalog, body, options);
  }
  retrieve(id:number):Observable<Product>{
    let params = JSON.stringify({});
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers, body:params});
    return this.httpService.retrieve(this.url.catalog+'/'+id, options);
  }*/
  /*
  remove(id:number):Observable<Product>{
    let body = JSON.stringify({"id":id});
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.httpService.remove(this.url.catalog, body, options);
  }
  */
  getProducts():Array<Product>{
    return this.products;
  }
  setProducts(products:Array<Product>){
    this.products = products;
  }


  /*
   * Method for Skus
   */
  /*
  createSku(id:number, sku:Sku):Observable<Sku>{
    let body = JSON.stringify(sku);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.httpService.create(this.url.catalog+'/'+id+'/skus', body, options);
  }
  
  listSku():Observable<Array<Sku>>{
    let params = JSON.stringify({});
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers, body:params});
    return this.httpService.list(this.url.catalog, options);
  }
  
  updateSku(product:Product):Observable<Product>{
    let body = JSON.stringify(product);
    let headers = new Headers({'Content-Type':'application/json'});
    let options = new RequestOptions({headers:headers});
    return this.httpService.update(this.url.catalog, body, options);
  }
  getSkus():Array<Sku>{
    return this.skus;
  }
  setSkus(skus:Array<Sku>){
      this.skus = skus;
  }
  */
}
