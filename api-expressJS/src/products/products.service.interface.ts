import { ProductModel } from "@prisma/client";
import { ProductDto } from "./productsDto/product.dto";

export interface IProductsService {
	createProduct: (dto: ProductDto) => Promise<ProductModel | null>;
	getProductInfo: (dto: ProductDto) => Promise<ProductModel | null>;
	updateProduct: (dto: ProductDto) => Promise<ProductModel | null>;
	deleteProduct: (dto: ProductDto) => Promise<ProductModel | null>;
}
