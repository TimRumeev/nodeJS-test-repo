import { IsEmail, IsString } from "class-validator";

export class UserRegisterDto {
	@IsEmail({}, { message: "Invalid email" })
	email: string;

	@IsString({ message: "No password specified" })
	password: string;

	@IsString({ message: "No name specified" })
	name: string;

	@IsString({ message: "No role specified " })
	role: string;
}
