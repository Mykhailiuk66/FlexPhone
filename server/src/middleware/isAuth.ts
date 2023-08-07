import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";
import HttpError from "../exeptions/HttpError";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	try {
		const token = req.headers.authorization?.split(" ")[1];
		if (!token) {
			throw new HttpError(401, "You are not authenticated!");
		}

		jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
			if (err) {
				throw new HttpError(401, "Token is not valid!");
			}

			req.user = user;
			next();
		});
	} catch (err) {
		next(err);
	}
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	try {
		if (!req.user.isAdmin) {
			throw new HttpError(403, "Access denied");
		}
		next();
	} catch (err) {
		next(err);
	}
};
