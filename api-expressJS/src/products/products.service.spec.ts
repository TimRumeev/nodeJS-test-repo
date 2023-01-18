import "reflect-metadata";
import { ProductModel, UserModel } from "@prisma/client";
import { Container, id } from "inversify";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { IProductsRepository } from "./products.repository.interface";
import { IProductsService } from "./products.service.interface";
import { ProductService } from "./products.service";
import { Product } from "./product.entity";

const ConfigServiceMock: IConfigService = {
	get: jest.fn(),
};

const ProductsRepositoryMock: IProductsRepository = {
	create: jest.fn(),
	read: jest.fn(),
	update: jest.fn(),
	delete: jest.fn(),
};

const container = new Container();
let configService: IConfigService;
let producrsRepository: IProductsRepository;
let productsService: IProductsService;

beforeAll(() => {
	container.bind<IProductsService>(TYPES.ProductService).to(ProductService);
	container.bind<IConfigService>(TYPES.ConfigService).toConstantValue(ConfigServiceMock);
	container
		.bind<IProductsRepository>(TYPES.ProductsRepository)
		.toConstantValue(ProductsRepositoryMock);

	configService = container.get<IConfigService>(TYPES.ConfigService);
	producrsRepository = container.get<IProductsRepository>(TYPES.UsersRepository);
	productsService = container.get<IProductsService>(TYPES.UserService);
});

let createdProduct: ProductModel | null;
let deletedProduct: ProductModel | null;
let updatedProduct: ProductModel | null;

describe("Products Service", () => {
	it("createProduct", async () => {
		configService.get = jest.fn().mockResolvedValueOnce("1");
		producrsRepository.create = jest.fn().mockImplementationOnce(
			(product: Product): ProductModel => ({
				id: 1,
				name: product.name,
				amount: product.amount,
			}),
		);
		createdProduct = await productsService.createProduct({
			id: 1,
			name: "milk",
			amount: 1,
		});
		expect(createdProduct?.id).toEqual(1);
		expect(createdProduct?.amount).not.toEqual(1);
	});
	it("updateProduct", async () => {
		configService.get = jest.fn().mockResolvedValueOnce("1");
		producrsRepository.update = jest.fn().mockImplementationOnce(
			(product: Product): ProductModel => ({
				id: 1,
				name: product.name,
				amount: product.amount,
			}),
		);
		updatedProduct = await productsService.updateProduct({
			id: 1,
			name: "milk",
			amount: 2,
		});
		expect(updatedProduct?.id).toBeUndefined();
		expect(deletedProduct?.amount).toBeUndefined();
	});
	it("deleteProduct", async () => {
		configService.get = jest.fn().mockResolvedValueOnce("1");
		producrsRepository.delete = jest.fn().mockImplementationOnce(
			(product: Product): ProductModel => ({
				id: 1,
				name: product.name,
				amount: product.amount,
			}),
		);
		deletedProduct = await productsService.deleteProduct({
			id: 1,
			name: "milk",
			amount: 1,
		});
		expect(deletedProduct?.id).toBeUndefined();
		expect(deletedProduct?.amount).toBeUndefined();
	});
});
