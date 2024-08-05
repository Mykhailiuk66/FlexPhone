import { Request, Response, NextFunction } from "express";
import HttpError from "../exeptions/HttpError";

export default (
	error: HttpError,
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const status = error.status || 500;
	const message = error.message || "Something went wrong!";
	res.status(status).json({ message });
};
