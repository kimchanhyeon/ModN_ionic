import { Option } from './option-model';

export class OptionGroup {
	groupName: string;
	options: Option[];

	constructor(groupName: string, options?: Option[]) {
		this.groupName = groupName;
		if (options) this.options = options;
		else {
			this.options = [];
		}
	}
}