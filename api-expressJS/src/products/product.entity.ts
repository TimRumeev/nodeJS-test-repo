export class Product {
	constructor(private readonly _name: string, private readonly _amount: number) {}

	get name(): string {
		return this._name;
	}
	get amount(): number {
		return this._amount;
	}
}
