import mongoose from "mongoose";

const Schema = mongoose.Schema;

const ProductVariantSchema = new Schema(
	{
		attributes: { type: Map, of: String },
		price: { type: Number, required: true },
		inStock: { type: Number, default: 0 },
		images: [String],
	},
	{
		timestamps: true,
	}
);

const ProductSchema = new Schema(
	{
		name: { type: String, required: true },
		description: { type: String },
		characteristics: { type: Map, of: String },
		variants: [ProductVariantSchema],
		defaultImages: [String],
	},
	{
		timestamps: true,
	}
);


export default mongoose.model("Product", ProductSchema);
