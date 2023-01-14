import { ProductModel } from "@prisma/client";
import { NextFunction, Request, Response } from "express";
import { Product } from "./product.entity";
import { ProductDto } from "./productsDto/product.dto";

export interface IProductsRepository {
	create: (product: Product) => Promise<ProductModel>;
	read: (name: string) => Promise<ProductModel | null>;
	update: (dto: ProductDto) => Promise<ProductModel | null>;
	// update: (req: Request, res: Response, next: NextFunction) => Promise<ProductModel>;
	delete: (id: number) => Promise<ProductModel | null>;
}
