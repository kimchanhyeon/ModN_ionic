/// <reference path="../../../../../typings/modules/cheerio/index.d.ts" />
import * as cheerio from 'cheerio'

export class CheerioDOMFinder {
	private body: string;
	private $: cheerio.Static;

	ready(body: string): Promise<any> {
		return new Promise<any>((resolve, reject) => {
			this.body = body;
			this.$ = cheerio.load(this.body);
			resolve();
		})
	}

	findAll(selector: string): cheerio.Cheerio {
		return this.$(selector);
	}
}