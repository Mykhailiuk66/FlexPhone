import Cart from "../models/Cart";
import { CartProductInterface, ExtendedCartInterface } from "../types/types";
import HttpError from "../exeptions/HttpError";

export const getCartInfo = async (
	user_id: string
): Promise<ExtendedCartInterface[] | null> => {
	const cart = await Cart.findOne({
		userId: user_id,
	})
		.populate<{ products: CartProductInterface[] }>("products.productId")
		.lean();

	if (!cart) {
		return null;
	}

	const orderProducts: ExtendedCartInterface[] = [];
	for (const product of cart.products) {
		const variantId = product.variantId;

		const variant = product.productId.variants.find(
			(variant) => variant._id.toString() === variantId.toString()
		);

		orderProducts.push({
			product: { ...product.productId, variants: [variant!] },
			quantity: product.quantity,
			price: variant!.price,
		});
	}

	return orderProducts;
};

export const emptyUserCart = async (user_id: string) => {
	const cart = await Cart.findOne({ userId: user_id });

	if (!cart) {
		throw new HttpError(404, "Product not found");
	}

	cart.products.splice(0, cart.products.length);

	await cart.save();
};
