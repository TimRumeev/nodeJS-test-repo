import { ProductModel } from "@prisma/client";
import { NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { IConfigService } from "../config/config.service.interface";
import { TYPES } from "../types";
import { Product } from "./product.entity";
import { IProductsRepository } from "./products.repository.interface";
import { IProductsService } from "./products.service.interface";
import { ProductDto } from "./productsDto/product.dto";

@injectable()
export class ProductService implements IProductsService {
	constructor(
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductsRepository) private productsRepository: IProductsRepository,
	) {}
	async createProduct({ name, amount }: ProductDto): Promise<ProductModel | null> {
		const newProduct = new Product(name, amount);
		const existedProduct = await this.productsRepository.read(name);
		if (existedProduct) {
			return null;
		}
		return this.productsRepository.create(newProduct);
	}
	async getProductInfo({ name }: ProductDto): Promise<ProductModel | null> {
		const existedProduct = await this.productsRepository.read(name);
		if (!existedProduct) {
			return null;
		}
		return this.productsRepository.read(name);
	}
	async updateProduct({ id, name, amount }: ProductDto): Promise<ProductModel | null> {
		const existedProduct = await this.productsRepository.read(name);
		if (!existedProduct) {
			return null;
		}
		return await this.productsRepository.update({ id, name, amount });
	}
	async deleteProduct({ id, name }: ProductDto): Promise<ProductModel | null> {
		const existedProduct = await this.productsRepository.read(name);
		if (!existedProduct) {
			return null;
		}
		return await this.productsRepository.delete(id);
	}
}
