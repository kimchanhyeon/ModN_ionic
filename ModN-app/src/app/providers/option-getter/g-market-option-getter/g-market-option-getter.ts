import { GMarketOptionGroup } from './g-market-option-group-model';
import { GMarketOption } from './g-market-option-model';
import { Platform } from 'ionic-angular';
import { InAppBrowser, InAppBrowserObject } from '@ionic-native/in-app-browser';
import { Injectable } from '@angular/core';
import { CheerioDOMFinder } from '../shared/cheerio-dom-finder';
import * as cheerio from 'cheerio';

@Injectable()
export class GMarketOptionGetter {
	browser: InAppBrowserObject;
	domfinder: CheerioDOMFinder;

	constructor(private iab: InAppBrowser, private platform: Platform) {

	}

	ready(URL: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.platform.ready().then(() => {
				this.browser = this.iab.create(URL, '_self', {hidden: 'yes'});
				this.browser.hide();
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
	
	getOptions(): GMarketOptionGroup[] {
		let optionGroupCheerios: cheerio.Cheerio = this.getOptionGroupsCheerio();
		let optionCheerios: cheerio.Cheerio = this.getOptionsCheerio();

		return GMarketOptionGetter.parseOptionGroupsCheerio(optionGroupCheerios, optionCheerios);
	}

	private getOptionGroupsCheerio(): cheerio.Cheerio {
		return this.domfinder.findAll("li.list2 span");
	}

	private getOptionsCheerio(): cheerio.Cheerio {
		return this.domfinder.findAll('ul.clr_list li label');
	}

	private static parseOptionsCheerio(optionCheerio: cheerio.Cheerio): GMarketOption[] {
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

	private static parseOptionGroupsCheerio(optionGroupsCheerio: cheerio.Cheerio, optionsCheerio: cheerio.Cheerio): GMarketOptionGroup[] {
		let parsedOptions: GMarketOption[] = GMarketOptionGetter.parseOptionsCheerio(optionsCheerio);
		let result: GMarketOptionGroup[] = [];

		console.log("groups cheerio: ")
		console.log(optionGroupsCheerio);
		console.log("options parsed: ")
		console.log(parsedOptions);

		for (let i = 0; i < optionGroupsCheerio.length; i++) {
			let _tag = optionGroupsCheerio[i];
			let _children: any = _tag.children[0];

			result.push(new GMarketOptionGroup(_children.data));
		}

		// assumption: given option ordered by index.
		for (let option of parsedOptions) {
			let ind = option.index;
			result[ind[0]].options.push(option);
		}

		return result;
	}
	

}