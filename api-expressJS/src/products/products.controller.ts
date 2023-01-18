import { Request, Response, NextFunction } from "express";
import { injectable, inject, id } from "inversify";
import "reflect-metadata";
import { AuthGuard } from "../common/auth.guard";
import { BaseController } from "../common/base.controller";
import { RoleMiddleWare } from "../common/role.middleware";
import { IConfigService } from "../config/config.service.interface";
import { HTTPError } from "../errors/http-error.class";
import { ILogger } from "../logger/logger.interface";
import { TYPES } from "../types";
import { IProductsController } from "./products.controller.interface";
import { IProductsService } from "./products.service.interface";
import { ProductDto } from "./productsDto/product.dto";

@injectable()
export class ProductsController extends BaseController implements IProductsController {
	constructor(
		@inject(TYPES.ILogger) private loggerService: ILogger,
		@inject(TYPES.ConfigService) private configService: IConfigService,
		@inject(TYPES.ProductService) private productService: IProductsService,
	) {
		super(loggerService);
		this.bindRoutes([
			{
				path: "/create",
				method: "post",
				func: this.create,
				middlewares: [new RoleMiddleWare(this.configService.get("SECRET"))],
			},
			{
				path: "/read",
				method: "get",
				func: this.read,
				middlewares: [],
			},
			{
				path: "/update",
				method: "post",
				func: this.update,
				middlewares: [new RoleMiddleWare(this.configService.get("SECRET"))],
			},
			{
				path: "/delete",
				method: "delete",
				func: this.delete,
				middlewares: [new RoleMiddleWare(this.configService.get("SECRET"))],
			},
		]);
	}
	async create(
		{ body }: Request<{}, {}, ProductDto>,
		res: Response,
		next: NextFunction,
	): Promise<void> {
		const result = await this.productService.createProduct(body);
		if (!result) {
			return next(new HTTPError(422, "This product already exists"));
		}
		this.ok(res, { id: result.id, name: result.name, amount: result.amount });
	}
	async read({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.productService.getProductInfo(body);
		if (!result) {
			return next(new HTTPError(404, "Product not find"));
		}
		this.ok(res, { id: result?.id, name: result?.name, amount: result?.amount });
	}
	async update({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.productService.updateProduct(body);
		if (!result) {
			return next(new HTTPError(422, "Update failed"));
		}
		this.ok(res, { id: result.id, name: result.name, amount: result.amount });
	}
	async delete({ body }: Request, res: Response, next: NextFunction): Promise<void> {
		const result = await this.productService.deleteProduct(body);
		if (!result) {
			return next(new HTTPError(422, "Delete failed"));
		}
		this.ok(res, { id: result.id, name: result.name, amount: result.amount });
	}
}
