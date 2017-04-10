import { OptionGroupDetailPage } from './../option-group-detail/option-group-detail';
/*
 * Modules 
 */
import { Component } from '@angular/core';
import { NavController, AlertController, Platform, NavParams } from 'ionic-angular';
import { GMarketOptionGetter } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-getter';
import { GMarketOptionGroup } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-group-model';

const URL = "http://mitem.gmarket.co.kr/Item?goodscode=896819241&keyword_seq=11792452311&keyword=%EB%85%B8%ED%8A%B8%EB%B6%81&fr=cpc&needClose=y"

@Component({
	selector: 'home-page',
	templateUrl: 'home.html'
})
export class HomePage {
	optionGroups: GMarketOptionGroup[];
	segment: string = 'browser';
	optionstr: string;
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
		this.navCtrl.push(OptionGroupDetailPage, {optionGroup: item});
	}

}
