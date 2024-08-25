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
const express_1 = require("express");
const express_validator_1 = require("express-validator");
const productsController = __importStar(require("../controllers/products"));
const productVariantsController = __importStar(require("../controllers/productVariants"));
const fileUpload_1 = __importDefault(require("../config/fileUpload"));
const isAuth_1 = require("../middleware/isAuth");
const router = (0, express_1.Router)();
router.get("/", productsController.getProductsVariants);
router.get("/all", [isAuth_1.isAuth, isAuth_1.isAdmin], productsController.getAllProducts);
router.get("/:productId", productsController.getProduct);
router.delete("/:productId", [isAuth_1.isAuth, isAuth_1.isAdmin], productsController.deleteProduct);
router.post("/", [isAuth_1.isAuth, isAuth_1.isAdmin], fileUpload_1.default.array("defaultImages"), [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
], productsController.createProduct);
router.put("/:productId", [isAuth_1.isAuth, isAuth_1.isAdmin], fileUpload_1.default.array("defaultImages"), [
    (0, express_validator_1.body)("name").trim().notEmpty().withMessage("Name is required"),
    (0, express_validator_1.body)("description")
        .trim()
        .notEmpty()
        .withMessage("Description is required"),
], productsController.updateProduct);
router.put("/:productId/variants", [isAuth_1.isAuth, isAuth_1.isAdmin], fileUpload_1.default.array("images"), [
    (0, express_validator_1.body)("price")
        .toFloat()
        .not()
        .equals("0")
        .withMessage("Price must be greater than 0")
        .isFloat({ min: 0 })
        .withMessage("Price must be greater than 0"),
    (0, express_validator_1.body)("inStock")
        .toInt()
        .isInt({ min: 0 })
        .withMessage("Instock must be positive number"),
], productVariantsController.createProductVariant);
router.delete("/:productId/variants/:variantId", [isAuth_1.isAuth, isAuth_1.isAdmin], productVariantsController.deleteProductVariant);
exports.default = router;
