"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const multer_1 = __importDefault(require("multer"));
const fs_1 = __importDefault(require("fs"));
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const fileStorage = multer_1.default.diskStorage({
    destination(req, file, callback) {
        const path = `./images`;
        fs_1.default.mkdirSync(path, { recursive: true });
        callback(null, "images/");
    },
    filename(req, file, callback) {
        callback(null, Date.now() + "-" + file.originalname);
    },
});
const fileFilter = (req, file, callback) => {
    if (file.mimetype === "image/png" ||
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/webp") {
        callback(null, true);
    }
    else {
        callback(new HttpError_1.default(400, "Only PNG, JPG, JPEG and WEBP files are allowed"));
    }
};
exports.default = (0, multer_1.default)({
    storage: fileStorage,
    limits: { fileSize: 1024 * 1024 * 10 },
    fileFilter: fileFilter,
});
