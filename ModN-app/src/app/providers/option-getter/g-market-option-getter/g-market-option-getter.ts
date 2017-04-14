import { GMarketOptions } from './g-market-options-model';
import { GMarketOptionGroup } from './g-market-option-group-model';
import { GMarketOption, GMOptionCharacter } from './g-market-option-model';
import { Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';
import { CheerioDOMFinder } from '../shared/cheerio-dom-finder';
import * as cheerio from 'cheerio';

const SELECTOR_OPTIONS: string = 'ul.clr_list li label';
const SELECTOR_OPTION_GROUPS: string = 'li.list2 span';
const SELECTOR_PLUS_OPTION_GROUPS: string = 'ul#optionP li span';
const SELECTOR_DELIVERY_PLACEHOLDER: string = 'ul#GoodsDelivery li span';
const SELECTOR_EMAIL: string = 'div#optionT span.sub_tit';

@Injectable()
export class GMarketOptionGetter {
	browser: InAppBrowserObject;
	domfinder: CheerioDOMFinder;

	constructor(private iab: InAppBrowser, private platform: Platform) {

	}

	ready(URL: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.platform.ready().then(() => {
				this.browser = this.iab.create(URL, '_self', { hidden: 'yes' });
				this.domfinder = new CheerioDOMFinder();
				this.browser.on('loadstop').subscribe((res) => {
					this.browser.executeScript({ code: 'document.documentElement.innerHTML' }).then((bodyArray) => {
						this.domfinder.ready(bodyArray[0]).then(() => resolve());
					}).catch((err) => {
						console.error("ERROR: when GMarketOptionGetter ready...")
						console.error(err);
						resolve();
					})
				})
			});
		});
	}

	//TODO: delete it
	show() {
		this.browser.show();
	}

	getOptions(): GMarketOptions {
		let parsedOptionGroups = this.parseOptionGroupsCheerio();
		return new GMarketOptions(parsedOptionGroups, this.domfinder, this.browser);
	}

	private get optionGroupsCheerio(): cheerio.Cheerio {
		return this.domfinder.findAll(SELECTOR_OPTION_GROUPS);
	}

	private get optionsCheerio(): cheerio.Cheerio {
		return this.domfinder.findAll(SELECTOR_OPTIONS);
	}

	private get plusOptionGroupCheerio(): cheerio.Cheerio {
		return this.domfinder.findAll(SELECTOR_PLUS_OPTION_GROUPS);
	}

	static parseOptionsCheerio(optionCheerio: cheerio.Cheerio): GMarketOption[] {
		let parsedOptions: GMarketOption[] = [];

		for (let i = 0; i < optionCheerio.length; i++) {
			let tag: cheerio.Element = optionCheerio[i];

			let dataArray: any[] = tag.children;
			let data = dataArray[0].data;

			let attribs: any = tag.attribs;
			let id = attribs['for'];

			let soldOut: boolean = false;
			if (attribs.hasOwnProperty('class') && attribs['class'] === 'no') {
				soldOut = true;
			}

			let option = new GMarketOption(id, data, soldOut);
			parsedOptions.push(option);
		}

		return parsedOptions;
	}

	private get optionGroupnames() {
		let optionGroupsCio = this.optionGroupsCheerio;
		let plusOptionGroupsCio = this.plusOptionGroupCheerio;

		let normalAndCombinationGroups: string[] = [];
		let plusGroups: string[] = [];

		for (let i = 0; i < optionGroupsCio.length; i++) {
			let _tag = optionGroupsCio[i];
			let _children: any = _tag.children[0];

			normalAndCombinationGroups.push(_children.data);
		}

		for (let i = 0; i < plusOptionGroupsCio.length; i++) {
			let _tag = plusOptionGroupsCio[i];
			let _children: any = _tag.children[0];

			plusGroups.push(_children.data);
		}

		return { normalAndCombinationGroups: normalAndCombinationGroups, plusGroups: plusGroups };
	}

	private get groupedOptions() {
		let optionsCio = this.optionsCheerio;
		let parsedOptions: GMarketOption[] = GMarketOptionGetter.parseOptionsCheerio(optionsCio);

		/**
		 * Grouping Options
		 */
		let shipOptions: GMarketOption[] = [];
		let plusOptions: GMarketOption[] = [];
		let combinationOptions: GMarketOption[] = [];
		let normalOptions: GMarketOption[] = [];

		for (let option of parsedOptions) {
			if (option.character == GMOptionCharacter.Normal) {
				normalOptions.push(option);
			}
			else if (option.character == GMOptionCharacter.Ship) {
				shipOptions.push(option);
			}
			else if (option.character == GMOptionCharacter.Plus) {
				plusOptions.push(option);
			}
			else if (option.character == GMOptionCharacter.Combination) {
				combinationOptions.push(option);
			}
			else {
				console.log("unhandled option group: ");
				console.log(option.character);
			}
		}

		return { ship: shipOptions, plus: plusOptions, combination: combinationOptions, normal: normalOptions };
	}

	private parseOptionGroupsCheerio(): GMarketOptionGroup[] {
		let optionGroups = this.optionGroupnames;
		let normalAndCombinationGroupnames: string[] = optionGroups.normalAndCombinationGroups;
		let plusGroupnames: string[] = optionGroups.plusGroups;

		let groupedOptions = this.groupedOptions;
		let normalOptions: GMarketOption[] = groupedOptions.normal;
		let combinationOptions: GMarketOption[] = groupedOptions.combination;
		let plusOptions: GMarketOption[] = groupedOptions.plus;
		let shipOptions: GMarketOption[] = groupedOptions.ship;

		let parsedOptionGroups: GMarketOptionGroup[] = [];
		
		/**
		 * 1, 2. normal and combination options
		 */
		if (normalOptions.length != 0 || combinationOptions.length != 0) {
			let normalAndCombinationGroups: GMarketOptionGroup[] = [];

			for (let group of normalAndCombinationGroupnames) {
				normalAndCombinationGroups.push(new GMarketOptionGroup(group, [], GMOptionCharacter.Normal));
			}
			for (let option of normalOptions) {
				normalAndCombinationGroups[option.index[0]].options.push(option);
			}
			for (let option of combinationOptions) {
				normalAndCombinationGroups[option.index[0]].options.push(option);
			}

			console.log(normalAndCombinationGroups);

			if (normalAndCombinationGroups != []) parsedOptionGroups = parsedOptionGroups.concat(normalAndCombinationGroups);
		}

		for(let group of parsedOptionGroups) {
			group.resetCharacter();
		}

		/**
		 * 3. plus options
		 */
		if (plusOptions.length != 0) {
			let plusOptionGroups: GMarketOptionGroup[] = [];

			for (let group of plusGroupnames) {
				plusOptionGroups.push(new GMarketOptionGroup(group, [], GMOptionCharacter.Plus));
			}
			for (let option of plusOptions) {
				plusOptionGroups[option.index[0]].options.push(option);
			}

			if (plusOptionGroups != []) parsedOptionGroups = parsedOptionGroups.concat(plusOptionGroups);
		}

		/**
		 * 4. ship options
		 */
		if (shipOptions.length != 0) {
			parsedOptionGroups.push(new GMarketOptionGroup('배송비 결제', shipOptions, GMOptionCharacter.Ship)) //TODO: get placeholder str
		}

		return parsedOptionGroups;
	}

}