"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const CartSchema = new Schema({
    userId: {
        type: Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },
    items: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            variantId: {
                type: Schema.Types.ObjectId,
                ref: "Product.variants",
            },
            quantity: { type: Number, default: 1 },
        },
    ],
});
exports.default = mongoose_1.default.model("Cart", CartSchema);
