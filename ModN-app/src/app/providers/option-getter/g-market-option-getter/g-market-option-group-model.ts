import { GMarketOption, GMOptionCharacter } from './g-market-option-model';
import { OptionGroup } from './../models/option-group-model';

export class GMarketOptionGroup extends OptionGroup {
	options: GMarketOption[];
	character: GMOptionCharacter = GMOptionCharacter.Combination;

	constructor(groupName: string, options?: GMarketOption[], character?: GMOptionCharacter) {
		super(groupName, options);

		if(character) this.character = character;
	}

	resetCharacter() {
		if(this.options.length != 0) {
			let option = this.options[0];
			this.character = option.character;
		}
	}
}