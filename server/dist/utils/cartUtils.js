"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emptyUserCart = exports.getOrCreateCart = exports.getExtendedCartInfo = exports.getUserCartInfo = void 0;
const Cart_1 = __importDefault(require("../models/Cart"));
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const utils_1 = require("./utils");
const getUserCartInfo = async (user_id) => {
    const cart = await Cart_1.default.findOne({
        userId: user_id,
    })
        .populate({
        path: "items.productId",
        select: "_id name variants defaultImages",
    })
        .lean();
    if (!cart) {
        return null;
    }
    return (0, exports.getExtendedCartInfo)(cart.items);
};
exports.getUserCartInfo = getUserCartInfo;
const getExtendedCartInfo = (items) => {
    const extendedCartInfo = items.map((item) => {
        const variant = item.productId.variants.find((variant) => variant._id.toString() === item.variantId.toString());
        const productImg = variant?.images[0] || item.productId.defaultImages[0] || "";
        return {
            cartItemId: item._id,
            productId: item.productId._id,
            variantId: item.variantId,
            formattedName: (0, utils_1.formatProductVariantName)(item.productId.name, variant?.attributes || {}),
            image: productImg,
            quantity: item.quantity,
            price: variant?.price || 0,
        };
    });
    return extendedCartInfo;
};
exports.getExtendedCartInfo = getExtendedCartInfo;
const getOrCreateCart = async (user_id) => {
    const cart = await Cart_1.default.findOne({ userId: user_id });
    if (!cart) {
        return new Cart_1.default({
            userId: user_id,
        });
    }
    return cart;
};
exports.getOrCreateCart = getOrCreateCart;
const emptyUserCart = async (user_id) => {
    const cart = await Cart_1.default.findOne({ userId: user_id });
    if (!cart) {
        throw new HttpError_1.default(404, "Cart not found");
    }
    cart.items.splice(0, cart.items.length);
    await cart.save();
};
exports.emptyUserCart = emptyUserCart;
