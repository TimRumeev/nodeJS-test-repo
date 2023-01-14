import { IsNumber, IsString } from "class-validator";

export class ProductDto {
	@IsNumber({}, { message: "Invalid id" })
	id: number;

	@IsString({ message: "Invalid name" })
	name: string;

	@IsNumber({}, { message: "Inavalid amount" })
	amount: number;
}
