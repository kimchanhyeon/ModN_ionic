import { GMarketOptions } from './../../app/providers/option-getter/g-market-option-getter/g-market-options-model';
import { OptionGroupDetailPage } from './../option-group-detail/option-group-detail';
/*
 * Modules 
 */
import { Component, OnInit } from '@angular/core';
import { NavController, AlertController, Platform, NavParams } from 'ionic-angular';
import { GMarketOptionGetter } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-getter';
import { GMarketOptionGroup } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-group-model';

const URL = "http://mitem.gmarket.co.kr/Item?goodscode=774795199&keyword_seq=11780739615&keyword=%25eb%25a7%2588%25ec%259d%25b4%25ed%2581%25ac%25eb%25a1%259c%25ec%2586%258c%25ed%2594%2584%25ed%258a%25b8%2B%25ec%2598%25a4%25ed%2594%25bc%25ec%258a%25a4"

@Component({
	selector: 'home-page',
	templateUrl: 'home.html'
})
export class HomePage implements OnInit {
	optionGroups: GMarketOptions;
	loaded: boolean = false;

	constructor(public navCtrl: NavController, public navParams: NavParams, private platform: Platform,
		private GMarketOptionGetter: GMarketOptionGetter, private alertCtrl: AlertController) {
	}

	ngOnInit() {
		this.GMarketOptionGetter.ready(URL).then(() => {
			this.optionGroups = this.GMarketOptionGetter.getOptions();
			this.loaded = true;
		});
	}

	onClick(item: GMarketOptionGroup) {
		this.navCtrl.push(OptionGroupDetailPage, {optionGroup: item, options: this.optionGroups});
	}

}
