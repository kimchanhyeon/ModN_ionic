import { GMarketOption } from './g-market-option-model';
import { OptionGroup } from './../models/option-group-model';

export enum GMOptionGroupCharacter {
	Normal,
	Combination,
	Plus,
	Ship
}

export class GMarketOptionGroup extends OptionGroup {
	character: GMOptionGroupCharacter = GMOptionGroupCharacter.Normal;

	constructor(groupName: string, options?: GMarketOption[], character?: GMOptionGroupCharacter) {
		super(groupName, options);

		if(character) this.character = character;
	}
}