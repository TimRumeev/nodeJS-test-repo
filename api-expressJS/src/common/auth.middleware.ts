import { IMiddleware } from "./middleware.interface";
import { NextFunction, Request, Response } from "express";
import { decode, verify } from "jsonwebtoken";
import { HTTPError } from "../errors/http-error.class";

export class AuthMiddleware implements IMiddleware {
	constructor(private secret: string) {}
	execute(req: Request, res: Response, next: NextFunction): void {
		if (req.headers.authorization) {
			verify(req.headers.authorization.split(" ")[1], this.secret, (err, payload) => {
				if (err) {
					next();
				} else if (payload) {
					if (typeof payload != "string") {
						req.user = payload.email;
						next();
					}
				}
			});
		} else {
			next();
		}
	}
}
