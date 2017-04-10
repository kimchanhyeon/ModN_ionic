export class Option {
	id: string;
	data: string;
	soldOut: boolean = false;

	constructor(id: string, data: string, soldOut: boolean) {
		this.id = id; this.data = data; this.soldOut = soldOut;
	}
}