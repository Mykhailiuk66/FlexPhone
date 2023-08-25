"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.login = exports.register = void 0;
const express_validator_1 = require("express-validator");
const bcrypt_1 = __importDefault(require("bcrypt"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const User_1 = __importDefault(require("../models/User"));
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const register = async (req, res, next) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const formattedErrors = {};
        errors.array().forEach((error) => {
            if (error.type === "field") {
                formattedErrors[error.path] = error.msg;
            }
        });
        return res.status(422).json({ errors: formattedErrors });
    }
    try {
        const salt = await bcrypt_1.default.genSalt(10);
        const hashedPassword = await bcrypt_1.default.hash(req.body.password, salt);
        const newUser = new User_1.default({
            firstName: req.body.firstName,
            lastName: req.body.lastName,
            email: req.body.email,
            password: hashedPassword,
        });
        const savedUser = await newUser.save();
        res.status(201).json({
            user: savedUser,
        });
    }
    catch (err) {
        next(err);
    }
};
exports.register = register;
const login = async (req, res, next) => {
    try {
        const user = await User_1.default.findOne({ email: req.body.email });
        if (!user)
            throw new HttpError_1.default(401, "User not found!");
        const validPassword = await bcrypt_1.default.compare(req.body.password, user.password);
        if (!validPassword)
            throw new HttpError_1.default(401, "Wrong password!");
        jsonwebtoken_1.default.sign({
            _id: user._id.toString(),
            isAdmin: user.isAdmin,
            firstName: user.firstName,
            lastName: user.lastName,
        }, process.env.JWT_SECRET, { expiresIn: "3d" }, (err, token) => {
            if (err)
                throw err;
            return res.status(200).json({ token });
        });
    }
    catch (err) {
        next(err);
    }
};
exports.login = login;
