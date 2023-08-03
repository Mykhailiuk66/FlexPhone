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
				variantId: {
					type: Schema.Types.ObjectId,
					ref: "Product.variants",
				},
				quantity: { type: Number, default: 1 },
			},
		],
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Cart", CartSchema);
