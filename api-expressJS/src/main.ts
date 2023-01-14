import { Container, ContainerModule, interfaces } from "inversify";
import { App } from "./app";
import { ConfigService } from "./config/config.service";
import { IConfigService } from "./config/config.service.interface";
import { PrismaService } from "./database/prisma.service";
import { ExeptionFilter } from "./errors/exeption.filter";
import { IExeptionFilter } from "./errors/exeption.filter.interface";
import { ILogger } from "./logger/logger.interface";
import { LoggerService } from "./logger/logger.service";
import { ProductsController } from "./products/products.controller";
import { ProductsRepository } from "./products/products.repository";
import { ProductService } from "./products/products.service";
import { TYPES } from "./types";
import { IUsersRepository } from "./users/user.repository.interface";
import { UserController } from "./users/users.controller";
import { IUserController } from "./users/users.controller.interface";
import { UsersRepository } from "./users/users.repository";
import { UserService } from "./users/users.service";
import { IUserService } from "./users/users.service.interface";

export interface IBootstrapReturn {
	appContainer: Container;
	app: App;
}

export const appBindings = new ContainerModule((bind: interfaces.Bind) => {
	bind<ILogger>(TYPES.ILogger).to(LoggerService).inSingletonScope();
	bind<IExeptionFilter>(TYPES.ExeptionFilter).to(ExeptionFilter);
	bind<IUserController>(TYPES.UserController).to(UserController);
	bind<IUserService>(TYPES.UserService).to(UserService);
	bind<IConfigService>(TYPES.ConfigService).to(ConfigService).inSingletonScope();
	bind<PrismaService>(TYPES.PrismaService).to(PrismaService).inSingletonScope();
	bind<IUsersRepository>(TYPES.UsersRepository).to(UsersRepository).inSingletonScope();
	bind<ProductsController>(TYPES.ProductsController).to(ProductsController);
	bind<ProductsRepository>(TYPES.ProductsRepository).to(ProductsRepository);
	bind<ProductService>(TYPES.ProductService).to(ProductService);
	bind<App>(TYPES.Application).to(App);
});

async function bootstrap(): Promise<IBootstrapReturn> {
	const appContainer = new Container();
	appContainer.load(appBindings);
	const app = appContainer.get<App>(TYPES.Application);
	await app.init();
	return { appContainer, app };
}

export const boot = bootstrap();
