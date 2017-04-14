/*
 * Modules 
 */

import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';

/*
 * Models 
 */
//import {User} from '../models/user.model';
import {Market} from '../models/catalog.model';

/*
  Generated class for the TestData provider.

  See https://angular.io/docs/ts/latest/guide/dependency-injection.html
  for more info on providers and Angular 2 DI.
*/
@Injectable()
export class TestData {
  /*
  user:User = new User(
        
  );
  */
  constructor() {
    console.log('Hello TestData Provider');
  }
    //shops.add(shop);
}
