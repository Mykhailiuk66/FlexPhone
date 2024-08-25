"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const OrderSchema = new Schema({
    userId: { type: Schema.Types.ObjectId, ref: "User" },
    products: [
        {
            productId: {
                type: Schema.Types.ObjectId,
                ref: "Product",
            },
            variantId: {
                type: Schema.Types.ObjectId,
                ref: "Product.variants",
            },
            name: { type: String, required: true },
            image: { type: String, required: false },
            quantity: { type: Number, default: 1 },
            price: { type: Number, required: true },
        },
    ],
    totalPrice: { type: Number, required: true },
    status: { type: String, default: "pending" }, // 'pending', 'paid', 'shipped', 'delivered', 'cancelled'
    shippingAddress: {
        firstName: String,
        lastName: String,
        address: String,
        city: String,
        country: String,
        postalCode: String,
    },
}, {
    timestamps: true,
});
exports.default = mongoose_1.default.model("Order", OrderSchema);
