"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyCart = exports.updateCartItem = exports.addCartItem = exports.updateCart = exports.getCart = void 0;
const express_validator_1 = require("express-validator");
const Product_1 = require("../models/Product");
const cartUtils_1 = require("../utils/cartUtils");
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const getCart = async (req, res, next) => {
    try {
        const cart = await (0, cartUtils_1.getUserCartInfo)(req.user._id.toString());
        if (!cart) {
            return res.status(200).json({ cart: [] });
        }
        return res.status(200).json({ cart });
    }
    catch (err) {
        next(err);
    }
};
exports.getCart = getCart;
const updateCart = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const user = req.user;
        const cart = await (0, cartUtils_1.getOrCreateCart)(user._id.toString());
        const { cart: newCartItems } = req.body;
        cart.items.splice(0, cart.items.length);
        newCartItems.forEach((item) => {
            if (!item.productId || !item.variantId || !item.quantity) {
                throw new HttpError_1.default(400, "Invalid cart format");
            }
            cart.items.push({
                productId: item.productId,
                variantId: item.variantId,
                quantity: item.quantity,
            });
        });
        await cart.save();
        return res.status(200).json({ message: "Cart updated" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateCart = updateCart;
const addCartItem = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const user = req.user;
        const { productId, variantId } = req.body;
        const result = await Product_1.Product.findOne({
            _id: productId,
            "variants._id": variantId,
        });
        if (!result) {
            throw new HttpError_1.default(404, "Product not found");
        }
        const cart = await (0, cartUtils_1.getOrCreateCart)(user._id.toString());
        const productIndex = cart.items.findIndex((p) => p.productId.toString() === productId &&
            p.variantId.toString() === variantId);
        if (productIndex === -1) {
            cart.items.push({ productId, variantId, quantity: 1 });
        }
        else {
            cart.items[productIndex].quantity += 1;
        }
        await cart.save();
        res.status(200).json({
            message: "Cart item added successfully",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.addCartItem = addCartItem;
const updateCartItem = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const user = req.user;
        const { productId, variantId } = req.body;
        const quantity = Number(req.body.quantity);
        const result = await Product_1.Product.findOne({
            _id: productId,
            "variants._id": variantId,
        });
        if (!result) {
            throw new HttpError_1.default(404, "Product not found");
        }
        const cart = await (0, cartUtils_1.getOrCreateCart)(user._id.toString());
        const productIndex = cart.items.findIndex((p) => p.productId.toString() === productId &&
            p.variantId.toString() === variantId);
        if (productIndex === -1) {
            if (quantity > 0) {
                cart.items.push({ productId, variantId, quantity });
            }
        }
        else {
            if (quantity <= 0) {
                cart.items.splice(productIndex, 1);
            }
            else {
                cart.items[productIndex].quantity = quantity;
            }
        }
        await cart.save();
        res.status(200).json({
            message: "Cart updated",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.updateCartItem = updateCartItem;
const emptyCart = async (req, res, next) => {
    try {
        const user_id = req.user._id.toString();
        await (0, cartUtils_1.emptyUserCart)(user_id);
        res.status(200).json({
            message: "Cart emptied",
        });
    }
    catch (err) {
        next(err);
    }
};
exports.emptyCart = emptyCart;
