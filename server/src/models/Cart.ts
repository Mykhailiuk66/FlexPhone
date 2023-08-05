import mongoose from "mongoose";

const Schema = mongoose.Schema;

const CartSchema = new Schema(
	{
		userId: {
			type: Schema.Types.ObjectId,
			ref: "User",
			required: true,
		},
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
				quantity: { type: Number, default: 1 },
			},
		],
	},
);

export default mongoose.model("Cart", CartSchema);
