/*
 * Modules 
 */
import { NgModule, ErrorHandler } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicModule, IonicErrorHandler } from 'ionic-angular';

/*
 * Natives 
 */
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

/*
 * Starting Points 
 */
import { MyApp } from './app.component';

/*
 * Pages 
 */
import { SigninPage} from '../pages/signin/signin';

import { TabsPage } from '../pages/tabs/tabs';
import { HomePage } from '../pages/home/home';
import { CartPage } from '../pages/cart/cart';
import { FavoritesPage } from '../pages/favorites/favorites';
import { UserPage } from '../pages/user/user';

import { ProductPage } from '../pages/product/product';
//import { AboutPage } from '../pages/about/about';
//import { ContactPage } from '../pages/contact/contact';

/*
 * Components 
 */

/*
 * Providers 
 */
import { URL } from './providers/common/url.data';
import { HttpProvider } from './providers/common/http.provider';
import { AuthProvider } from './providers/common/auth.provider';
import { CatalogProvider } from './providers/catalog.provider';
import { OrderProvider } from './providers/order.provider';
import { UserProvider } from './providers/user.provider';
let pages = [
  //
  MyApp,
  //Pages
  //AboutPage,
  //ContactPage,
  SigninPage,
  TabsPage,
  HomePage,
  CartPage,
  FavoritesPage,
  UserPage,
  ProductPage
  //Components
]

export function declarations() {
  return pages;
}

export function entryComponents() {
  return pages;
}

export function providers() {
  return [
    Storage,
    StatusBar,
    SplashScreen,
    //TestData,
    //AppProvider,
    //HttpProvider,
    AuthProvider,
    CatalogProvider,
    CatalogProvider,
    UserProvider,
    // Keep this to enable Ionic's runtime error handling during development
    { provide: ErrorHandler, useClass: IonicErrorHandler }
  ];
}

@NgModule({
  declarations: declarations(),
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: entryComponents(),
  providers: providers()
})
export class AppModule {}
