import { Option } from './../models/option-model';

export enum GMOptionChararacter {
	Normal,
	Combination, // 조합 구매 상품
	Plus // 추가 구매 상품
}

export class GMarketOption extends Option {
	character: GMOptionChararacter = GMOptionChararacter.Normal;
	index: Array<number>;

	constructor(id: string, data: string, soldOut: boolean) {
		super(id, data, soldOut);

		/**
		 * From id, can infer indexes
		 * link: https://trello.com/c/kvF5OVIT
		 */

		if (id) {
			let indexStr = this.id.substring(7);
			console.log(indexStr[0]);
			console.log(GMarketOption.isNumber(indexStr[0]));
			if (GMarketOption.isNumber(indexStr[0])) {
				this.character = GMOptionChararacter.Normal;
			}
			else if (indexStr[0] == 'p') {
				this.character = GMOptionChararacter.Plus;
				indexStr = indexStr.substring(1);

			}
			else if (indexStr[0] == 'c') {
				this.character = GMOptionChararacter.Combination;
				indexStr = indexStr.substring(1);
			}
			else {
				console.log("Exception case happened: GMarketOption that have not been handled");
				console.log(indexStr);
				return;
			}

			let index_str = indexStr.split('_');
			this.index = index_str.map((str) => Number(str));
		}
		else {
			this.index = Array(2).fill(null);
		}
	}

	private static isNumber(str: string) {
		return /^\d+$/.test(str);
	}
}