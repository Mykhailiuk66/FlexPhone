"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_validator_1 = require("express-validator");
const express_1 = require("express");
const authController = __importStar(require("../controllers/auth"));
const User_1 = __importDefault(require("../models/User"));
const router = (0, express_1.Router)();
router.post("/register", [
    (0, express_validator_1.body)("firstName")
        .trim()
        .isLength({ min: 2, max: 30 })
        .isAlpha()
        .withMessage("First name must be between 2 and 30 characters and only contain letters"),
    (0, express_validator_1.body)("lastName")
        .trim()
        .isLength({ min: 2, max: 30 })
        .isAlpha()
        .withMessage("Last name must be between 2 and 30 characters and only contain letters"),
    (0, express_validator_1.body)("email")
        .trim()
        .toLowerCase()
        .isEmail()
        .withMessage("Please enter a valid email address")
        .custom(async (email) => {
        const existingUser = await User_1.default.findOne({ email });
        if (existingUser) {
            throw new Error("Email already in use");
        }
    }),
    (0, express_validator_1.body)("password")
        .trim()
        .isStrongPassword({
        minLength: 8,
        minUppercase: 1,
        minNumbers: 1,
        minSymbols: 0,
    })
        .withMessage("Password must be at least 8 characters long and contain at least one uppercase letter, one number"),
], authController.register);
router.post("/login", authController.login);
exports.default = router;
