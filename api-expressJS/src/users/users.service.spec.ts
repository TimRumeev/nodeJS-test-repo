import "reflect-metadata";
import { UserModel } from "@prisma/client";
import { Container, id } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { User } from "./user.entity";
import { IUsersRepository } from "./user.repository.interface";
import { UserService } from "./users.service";
import { IUserService } from "./users.service.interface";

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const UsersReposioryMock: IUsersRepository = {
	create: jest.fn(),
	find: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let usersRepository: IUsersRepository;
let usersService: IUserService;

beforeAll(() => {
	container.bind<IUserService>(TYPES.UserService).to(UserService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container.bind<IUsersRepository>(TYPES.UsersRepository).toConstantValue(UsersReposioryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	usersRepository = container.get<IUsersRepository>(TYPES.UsersRepository);
	usersService = container.get<IUserService>(TYPES.UserService);
});

let createdUser: UserModel | null;
describe("User Service", () => {
	it("createUser", async () => {
		configService.get = jest.fn().mockResolvedValueOnce("1");
		usersRepository.create = jest.fn().mockImplementationOnce(
			(user: User): UserModel => ({
				name: user.name,
				email: user.email,
				password: user.password,
				id: 1,
				role: "admin",
			}),
		);
		createdUser = await usersService.createUser({
			email: "a@a.ru",
			name: "Anton",
			password: "1",
			role: "admin",
		});
		expect(createdUser?.id).toEqual(1);
		expect(createdUser?.password).not.toEqual(1);
	});

	it("validateUser - success", async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: "a@a.ru",
			password: "1",
		});
		expect(res).toBeTruthy();
	});

	it("validateUser - wrong password", async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(createdUser);
		const res = await usersService.validateUser({
			email: "a@a.ru",
			password: "2",
		});
		expect(res).toBeFalsy();
	});

	it("validateUser - wrong user", async () => {
		usersRepository.find = jest.fn().mockReturnValueOnce(null);
		const res = await usersService.validateUser({
			email: "a@a.ru",
			password: "1",
		});
		expect(res).toBeFalsy();
	});
});
