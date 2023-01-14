export class Product {
	constructor(
		private readonly _id: number,
		private readonly _name: string,
		private readonly _amount: number,
	) {}

	get id(): number {
		return this._id;
	}
	get name(): string {
		return this._name;
	}
	get amount(): number {
		return this._amount;
	}
}
