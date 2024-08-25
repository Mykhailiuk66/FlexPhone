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
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const cartControllers = __importStar(require("../controllers/cart"));
const isAuth_1 = require("../middleware/isAuth");
const express_validator_1 = require("express-validator");
const router = (0, express_1.Router)();
router.get("/", isAuth_1.isAuth, cartControllers.getCart);
router.put("/", isAuth_1.isAuth, [(0, express_validator_1.body)("cart").isArray().withMessage("Invalid cart format")], cartControllers.updateCart);
router.delete("/", isAuth_1.isAuth, cartControllers.emptyCart);
router.put("/add", isAuth_1.isAuth, [
    (0, express_validator_1.body)("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required"),
    (0, express_validator_1.body)("variantId")
        .trim()
        .notEmpty()
        .withMessage("Variant ID is required"),
], cartControllers.addCartItem);
router.put("/update", isAuth_1.isAuth, [
    (0, express_validator_1.body)("productId")
        .trim()
        .notEmpty()
        .withMessage("Product ID is required"),
    (0, express_validator_1.body)("variantId")
        .trim()
        .notEmpty()
        .withMessage("Variant ID is required"),
    (0, express_validator_1.body)("quantity")
        .toInt()
        .isInt()
        .withMessage("Quantity must be an whole number")
        .notEmpty()
        .withMessage("Quantity is required"),
], cartControllers.updateCartItem);
exports.default = router;
