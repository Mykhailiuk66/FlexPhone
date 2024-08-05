import mongoose from "mongoose";

const Schema = mongoose.Schema;

const OrderSchema = new Schema(
	{
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
				quantity: { type: Number, default: 1 },
				price: { type: Number, required: true },
			},
		],
		totalPrice: { type: Number, required: true },
		status: { type: String, default: "pending" }, // 'pending', 'shipped', 'delivered', 'cancelled'
		shippingAddress: {
			firstName: String,
			lastName: String,
			address: String,
			city: String,
			country: String,
			postalCode: String,
		},
	},
	{
		timestamps: true,
	}
);

export default mongoose.model("Order", OrderSchema);
