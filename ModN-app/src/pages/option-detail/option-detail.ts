import { GMarketOptions } from './../../app/providers/option-getter/g-market-option-getter/g-market-options-model';
import { GMarketOption, GMOptionCharacter } from './../../app/providers/option-getter/g-market-option-getter/g-market-option-model';
import { Component, OnInit } from '@angular/core';
import { NavController, NavParams, LoadingController } from 'ionic-angular';

@Component({
	selector: 'page-option-detail',
	templateUrl: 'option-detail.html'
})
export class OptionDetailPage implements OnInit {
	option: GMarketOption;
	options: GMarketOptions;

	constructor(public navCtrl: NavController, public navParams: NavParams, private loadingCtrl: LoadingController) { }

	ngOnInit() {
		this.option = this.navParams.get('option');
		this.options = this.navParams.get('options');
	}

	stringify(option): string {
		return JSON.stringify(option, null, 2);
	}

	handleClick() {
		let loading = this.loadingCtrl.create({
			content: '로딩 중...'
		});

		loading.present();

		if (this.option.character == GMOptionCharacter.Combination) {
			this.options.selectCombinationOption(this.option).then(() => {
				//TODO: functionality to select options.
				this.navCtrl.popToRoot();
				loading.dismiss();
			});
		}
		else {
			loading.dismiss();
			this.navCtrl.popToRoot();
		}
	}
}
