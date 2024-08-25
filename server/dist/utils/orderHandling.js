"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.cancelReservation = exports.reserveProducts = exports.setOrderStatus = void 0;
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const Order_1 = __importDefault(require("../models/Order"));
const Product_1 = require("../models/Product");
const utils_1 = require("./utils");
const setOrderStatus = async (orderId, status) => {
    const order = await Order_1.default.findById(orderId);
    if (!order) {
        throw new Error("Order not found");
    }
    order.status = status;
    await order.save();
    return order;
};
exports.setOrderStatus = setOrderStatus;
const reserveProducts = async (extendedCart) => {
    for (const p of extendedCart) {
        const product = await Product_1.Product.findOne({
            _id: p.productId,
            "variants._id": p.variantId,
        });
        if (!product) {
            throw new HttpError_1.default(400, `Product (${p.productId}) or variant (${p.variantId}) not found`);
        }
        const variant = product.variants.find((variant) => variant._id.toString() === p.variantId.toString());
        if (variant && variant.inStock - p.quantity < 0) {
            return {
                success: false,
                productName: (0, utils_1.formatProductVariantName)(product.name, variant.toJSON().attributes),
            };
        }
        variant.inStock -= p.quantity;
        await product.save();
    }
    return { success: true, productName: null };
};
exports.reserveProducts = reserveProducts;
const cancelReservation = async (orderId, res) => {
    const order = await Order_1.default.findById(orderId);
    if (!order) {
        throw new HttpError_1.default(400, `Order ${orderId} not found`);
    }
    for (const p of order.products) {
        const product = await Product_1.Product.findOne({
            _id: p.productId,
            "variants._id": p.variantId,
        });
        if (!product) {
            throw new Error("Product not found");
        }
        product.variants.map((variant) => {
            if (variant._id.toString() === p.variantId.toString()) {
                variant.inStock += p.quantity;
            }
        });
    }
    await order.save();
};
exports.cancelReservation = cancelReservation;
