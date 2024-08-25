"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Product = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const Schema = mongoose_1.default.Schema;
const ProductVariantSchema = new Schema({
    attributes: { type: Map, of: Schema.Types.Mixed },
    price: { type: Number, required: true },
    inStock: { type: Number, default: 0 },
    images: [String],
}, {
    timestamps: true,
});
const ProductSchema = new Schema({
    name: { type: String, required: true },
    description: { type: String },
    characteristics: { type: Map, of: String },
    variants: [ProductVariantSchema],
    defaultImages: [String],
}, {
    timestamps: true,
});
exports.Product = mongoose_1.default.model("Product", ProductSchema);
