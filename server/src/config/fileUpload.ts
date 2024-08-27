import multer from "multer";
import { Request } from "express";
import fs from "fs";
import path from "path";

import HttpError from "../exeptions/HttpError";

const fileStorage = multer.diskStorage({
	destination(req, file, callback) {
		const dest_path = path.join(__dirname, "..", "images");
		fs.mkdirSync(dest_path, { recursive: true });

		callback(null, dest_path);
	},
	filename(req, file, callback) {
		callback(null, Date.now() + "-" + file.originalname);
	},
});

const fileFilter = (
	req: Request,
	file: Express.Multer.File,
	callback: multer.FileFilterCallback
) => {
	if (
		file.mimetype === "image/png" ||
		file.mimetype === "image/jpg" ||
		file.mimetype === "image/jpeg" ||
		file.mimetype === "image/webp"
	) {
		callback(null, true);
	} else {
		callback(
			new HttpError(400, "Only PNG, JPG, JPEG and WEBP files are allowed")
		);
	}
};

export default multer({
	storage: fileStorage,
	limits: { fileSize: 1024 * 1024 * 10 },
	fileFilter: fileFilter,
});
