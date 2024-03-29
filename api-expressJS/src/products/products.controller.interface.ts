import { NextFunction, Request, Response } from "express";

export interface IProductsController {
	create: (req: Request, res: Response, next: NextFunction) => void;
	read: (req: Request, res: Response, next: NextFunction) => void;
	update: (req: Request, res: Response, next: NextFunction) => void;
	delete: (req: Request, res: Response, next: NextFunction) => void;
}
