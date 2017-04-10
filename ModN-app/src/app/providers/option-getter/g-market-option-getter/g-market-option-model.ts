import { Option } from './../models/option-model';

export enum GMOptionCharacter {
	Normal,
	Combination, // 조합 구매 상품
	Plus, // 추가 구매 상품
	Ship // 택배
}

export class GMarketOption extends Option {
	character: GMOptionCharacter = GMOptionCharacter.Normal;
	index: Array<number>;

	constructor(id: string, data: string, soldOut: boolean) {
		super(id, data, soldOut);

		/**
		 * From id, can infer indexes
		 * link: https://trello.com/c/kvF5OVIT
		 */

		if (id) {
			let indexStr: string;

			if (this.id.startsWith('clr_ship')) {
				this.character = GMOptionCharacter.Ship;
				indexStr = this.id.substring(9);
			}
			else if (this.id.startsWith('clr_lyr')) {
				indexStr = this.id.substring(7);
				if (GMarketOption.isNumber(indexStr[0])) {
					this.character = GMOptionCharacter.Normal;
				}
				else if (indexStr[0] == 'p') {
					this.character = GMOptionCharacter.Plus;
					indexStr = indexStr.substring(1);
				}
				else if (indexStr[0] == 'c') {
					this.character = GMOptionCharacter.Combination;
					indexStr = indexStr.substring(1);
				}
				else {
					console.log("Exception case happened: GMarketOption that have not been handled");
					console.log(indexStr);
					return;
				}
			}
			else {
				console.log("Exception: GMarketOptionGroup that have not been handled");
				console.log("id: ");
				console.log(this.id);
				return;
			}
			let index_str = indexStr.split('_');
			this.index = index_str.map((str) => Number(str));
		}
	}

	private static isNumber(str: string) {
		return /^\d+$/.test(str);
	}
}