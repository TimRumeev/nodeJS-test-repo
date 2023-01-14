import { ProductModel } from "@prisma/client";
import { NextFunction } from "express";
import { inject, injectable } from "inversify";
import "reflect-metadata";
import { PrismaService } from "../database/prisma.service";
import { TYPES } from "../types";
import { Product } from "./product.entity";
import { IProductsRepository } from "./products.repository.interface";
import { ProductDto } from "./productsDto/product.dto";

@injectable()
export class ProductsRepository implements IProductsRepository {
	constructor(@inject(TYPES.PrismaService) private prismaService: PrismaService) {}

	async create({ name, amount }: Product): Promise<ProductModel> {
		return this.prismaService.client.productModel.create({
			data: {
				name,
				amount,
			},
		});
	}
	async read(name: string): Promise<ProductModel | null> {
		return this.prismaService.client.productModel.findFirst({
			where: {
				name,
			},
		});
	}
	async update({ id, name, amount }: ProductDto): Promise<ProductModel | null> {
		return this.prismaService.client.productModel.update({
			where: {
				id,
			},
			data: {
				name,
				amount,
			},
		});
	}
	async delete(id: number): Promise<ProductModel | null> {
		return this.prismaService.client.productModel.delete({
			where: {
				id,
			},
		});
	}
}
