import jwt from "jsonwebtoken";
import { Request, Response, NextFunction } from "express";

export const isAuth = (req: Request, res: Response, next: NextFunction) => {
	const token = req.headers.authorization?.split(" ")[1];
	if (!token) {
		return res.status(401).json("You are not authenticated!");
	}

	jwt.verify(token, process.env.JWT_SECRET!, (err, user) => {
		if (err) {
			return res.status(403).json("Token is not valid!");
		}

		req.user = user;

		next();
	});
};

export const isAdmin = (req: Request, res: Response, next: NextFunction) => {
	if (!req.user.isAdmin) {
		return res.status(403).json("Access denied");
	}
	next();
};
