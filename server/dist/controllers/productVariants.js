"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.deleteProductVariant = exports.createProductVariant = void 0;
const Product_1 = require("../models/Product");
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const express_validator_1 = require("express-validator");
const createProductVariant = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const productId = req.params.productId;
        const product = await Product_1.Product.findById(productId);
        if (!product) {
            throw new HttpError_1.default(404, "Product not found");
        }
        const { attributes, price, inStock } = req.body;
        let images = [];
        if (req.files) {
            images = JSON.parse(JSON.stringify(req.files)).map((file) => "images/" + file.filename);
        }
        const newVariant = {
            attributes: { ...attributes },
            price: price,
            inStock: inStock,
            images: images,
        };
        product.variants.push(newVariant);
        const updatedProduct = await product.save();
        res.status(201).json(updatedProduct);
    }
    catch (err) {
        next(err);
    }
};
exports.createProductVariant = createProductVariant;
const deleteProductVariant = async (req, res, next) => {
    try {
        const productId = req.params.productId;
        const variantId = req.params.variantId;
        const result = await Product_1.Product.updateOne({ _id: productId, "variants._id": variantId }, { $pull: { variants: { _id: variantId } } });
        if (result.modifiedCount === 0) {
            throw new HttpError_1.default(404, "Product or variant not found");
        }
        res.status(201).json({
            message: "Product variant deleted successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.deleteProductVariant = deleteProductVariant;
