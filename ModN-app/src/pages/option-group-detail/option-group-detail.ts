import { OptionDetailPage } from './../option-detail/option-detail';
import { GMarketOption } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-model';
import { GMarketOptionGroup } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-group-model';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the OptionGroupDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-option-group-detail',
	templateUrl: 'option-group-detail.html'
})
export class OptionGroupDetailPage implements OnInit{
	optionGroup: GMarketOptionGroup;

	constructor(public navCtrl: NavController, public navParams: NavParams) {
	}

	ngOnInit() {
		this.optionGroup = this.navParams.get('optionGroup');
	}

	onClick(option: GMarketOption) {
		this.navCtrl.push(OptionDetailPage, {option: option});
	}	
}
