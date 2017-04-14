import { GMarketOptionGetter } from './g-market-option-getter';
import * as cheerio from 'cheerio';
import { CheerioDOMFinder } from './../shared/cheerio-dom-finder';
import { GMarketOption, GMOptionCharacter } from './g-market-option-model';
import { InAppBrowserObject } from '@ionic-native/in-app-browser';
import { GMarketOptionGroup } from './g-market-option-group-model';

// 구매하기 버튼
const SELECTOR_PURCHASE_BUTTON: string = "div.fixed_btn a.immt";
// 옵션 드롭다운 (+index)
const SELECTOR_OPTION_DROPDOWNS: string = "#clr_mth";

/**
 * Class that indicates all options in one prodect.
 */
export enum GMOptionsCharacter {
	Normal = 0,
	Combination
}
export class GMarketOptions {
	character: GMOptionsCharacter = GMOptionsCharacter.Normal;
	optionGroups: GMarketOptionGroup[];
	domfinder: CheerioDOMFinder;
	browser: InAppBrowserObject;

	private _purchase_clicked = false;

	get data() {
		return this.optionGroups;
	}
	
	constructor(_GMarketOptionGroups: GMarketOptionGroup[], domfinder: CheerioDOMFinder, browser: InAppBrowserObject) {
		this.optionGroups = _GMarketOptionGroups; this.domfinder = domfinder; this.browser = browser;

		if (this.optionGroups[0].character == GMOptionCharacter.Combination) this.character = GMOptionsCharacter.Combination;
	}


	selectCombinationOption(option: GMarketOption): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			if (option.character != GMOptionCharacter.Combination) {
				console.log('ERROR: it`s not an combination option');
				console.log(option);
				return;
			}

			this.clickOption(option).then(() => {
				let nextGroupIndex: number = option.index[0] + 1;
				if (this.isCombinationGroup(nextGroupIndex)) {
					this.reloadDomFinder().then(() => {
						this.addCombinationGroup(nextGroupIndex).then(() => {
							this.resetCombinationGroups(nextGroupIndex + 1);
							resolve();
						});
					});
				}
				else resolve();
			});
		});
	}

	private isCombinationGroup(index: number): boolean {
		return this.data.length - 1 >= index && this.data[index].character == GMOptionCharacter.Combination;
	}

	private resetCombinationGroups(from: number) {
		if(!this.isCombinationGroup(from)) return;

		this.optionGroups[from].options = [];
		this.resetCombinationGroups(from + 1);
		return;
	}

	private reloadDomFinder(): Promise<any> {
		return new Promise<any>((resolve) => {
			this.browser.executeScript({ code: 'document.documentElement.innerHTML' }).then((bodyArray) => {
				this.domfinder.ready(bodyArray[0]).then(() => {
					resolve();
				});
			});
		})
	}

	private addCombinationGroup(groupIndex: number): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			const idStartsWith: string = 'clr_lyrc';
			let newOptionsCheerio: cheerio.Cheerio = this.domfinder.findAll("[for^=" + idStartsWith + groupIndex.toString() + "]")
			let newOptions: GMarketOption[] = GMarketOptionGetter.parseOptionsCheerio(newOptionsCheerio);
			this.optionGroups[groupIndex].options = newOptions;
			resolve();
		});
	}
	private click(selector: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.browser.executeScript({ code: "$('" + selector + "').click(); undefined;" }) // issue: https://forum.ionicframework.com/t/in-app-browser-executescript-callback-does-not-fire/86508/2
				.then((res) => {
					resolve(res);
				})
				.catch((err) => {
					console.log("err when clicking")
					console.log(selector);
					console.log(err);
					reject(err);
				})
		});
	}

	private clickPurchase(): Promise<any> {
		if (this._purchase_clicked) return new Promise<any>((resolve) => resolve());
		else return new Promise<any>((resolve, reject) => {
			this.click(SELECTOR_PURCHASE_BUTTON).then(() => {
				this._purchase_clicked = true;
				resolve();
			}).catch(err => {
				reject(err);
			});
		});
	}

	private clickOption(option: GMarketOption) {
		return new Promise<any>((resolve, reject) => {
			this.clickPurchase().then(() => {
				let group_index = option.index[0];
				let optiongroup_selector = SELECTOR_OPTION_DROPDOWNS + group_index.toString();
				this.click(optiongroup_selector).then(() => {
					let option_selector = '#' + option.id;
					this.click(option_selector).then(() => {
						setTimeout(() => resolve(), 300); //TODO: eventlistener?
					})
				})
			}).catch((err) => reject(err));
		})
	}


}