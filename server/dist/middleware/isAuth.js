"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.isAdmin = exports.isAuth = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const isAuth = (req, res, next) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        if (!token) {
            throw new HttpError_1.default(401, "You are not authenticated!");
        }
        jsonwebtoken_1.default.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (err) {
                throw new HttpError_1.default(401, "Token is not valid!");
            }
            req.user = user;
            next();
        });
    }
    catch (err) {
        next(err);
    }
};
exports.isAuth = isAuth;
const isAdmin = (req, res, next) => {
    try {
        if (!req.user.isAdmin) {
            throw new HttpError_1.default(403, "Access denied");
        }
        next();
    }
    catch (err) {
        next(err);
    }
};
exports.isAdmin = isAdmin;
