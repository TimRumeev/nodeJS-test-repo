import { inject, injectable } from "inversify";
import { UserLoginDto } from "./dto/user-login.dto";
import { UserRegisterDto } from "./dto/user-register.dto";
import { User } from "./user.entity";
import { IUserService } from "./users.service.interface";
import "reflect-metadata";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { IUsersRepository } from "./user.repository.interface";
import { UserModel } from "@prisma/client";

@injectable()
export class UserService implements IUserService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.UsersRepository) private usersRepository: IUsersRepository,
	) {}
	async createUser({ email, name, password, role }: UserRegisterDto): Promise<UserModel | null> {
		const newUser = new User(email, name, role);
		const salt = this.configService.get("SALT");
		await newUser.setPassword(password, Number(salt));
		const existedUser = await this.usersRepository.find(email);
		if (existedUser) {
			return null;
		}
		return this.usersRepository.create(newUser);
	}
	async validateUser({ email, password, role }: UserLoginDto): Promise<boolean> {
		const existedUser = await this.usersRepository.find(email);
		if (!existedUser) {
			return false;
		}
		if (role != existedUser.role) {
			return false;
		}
		const newUser = new User(
			existedUser.email,
			existedUser.name,
			existedUser.role,
			existedUser.password,
		);
		return newUser.comparePassword(password);
	}

	async getUserInfo(email: string): Promise<UserModel | null> {
		return this.usersRepository.find(email);
	}
}
