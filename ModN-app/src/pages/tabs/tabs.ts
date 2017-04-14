/*
 * Modules 
 */
import { Component } from '@angular/core';

/*
 * Pages 
 */
import { HomePage } from '../home/home';
import { CartPage } from '../cart/cart';
import { FavoritesPage } from '../favorites/favorites';
import { UserPage } from '../user/user';

@Component({
  templateUrl: 'tabs.html'
})
export class TabsPage {

  tab1Root = HomePage;
  tab2Root = CartPage;
  tab3Root = FavoritesPage;
  tab4Root = UserPage;
  constructor() {

  }
}
