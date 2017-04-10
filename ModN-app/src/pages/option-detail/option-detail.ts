import { GMarketOption } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-model';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

/*
  Generated class for the OptionDetail page.

  See http://ionicframework.com/docs/v2/components/#navigation for more info on
  Ionic pages and navigation.
*/
@Component({
	selector: 'page-option-detail',
	templateUrl: 'option-detail.html'
})
export class OptionDetailPage implements OnInit {
	option: GMarketOption;

	constructor(public navCtrl: NavController, public navParams: NavParams) { }

	ionViewDidLoad() {
		console.log('ionViewDidLoad OptionDetailPage');
	}

	ngOnInit() {
		this.option = this.navParams.get('option');
	}

	stringify(str: string) {
		return JSON.stringify(str, null, 2);
	}
}
