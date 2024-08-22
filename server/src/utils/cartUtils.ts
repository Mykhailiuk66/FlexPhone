import Cart from "../models/Cart";
import { CartItemInterface, ExtendedCartItemInterface } from "../types/types";
import HttpError from "../exeptions/HttpError";
import { formatProductVariantName } from "./utils";

export const getUserCartInfo = async (
	user_id: string
): Promise<ExtendedCartItemInterface[] | null> => {
	const cart = await Cart.findOne({
		userId: user_id,
	})
		.populate<{ items: CartItemInterface[] }>({
			path: "items.productId",
			select: "_id name variants defaultImages",
		})
		.lean();

	if (!cart) {
		return null;
	}

	return getExtendedCartInfo(cart.items);
};

export const getExtendedCartInfo = (
	items: CartItemInterface[]
): ExtendedCartItemInterface[] | null => {
	const extendedCartInfo = items.map((item) => {
		const variant = item.productId.variants.find(
			(variant) => variant._id.toString() === item.variantId.toString()
		);
		const productImg =
			variant?.images[0] || item.productId.defaultImages[0] || "";

		return {
			cartItemId: item._id,
			productId: item.productId._id,
			variantId: item.variantId,
			formattedName: formatProductVariantName(
				item.productId.name,
				variant?.attributes || {}
			),
			image: productImg,
			quantity: item.quantity,
			price: variant?.price || 0,
		};
	});

	return extendedCartInfo;
};

export const getOrCreateCart = async (user_id: string) => {
	const cart = await Cart.findOne({ userId: user_id });

	if (!cart) {
		return new Cart({
			userId: user_id,
		});
	}

	return cart;
};

export const emptyUserCart = async (user_id: string) => {
	const cart = await Cart.findOne({ userId: user_id });

	if (!cart) {
		throw new HttpError(404, "Cart not found");
	}

	cart.items.splice(0, cart.items.length);

	await cart.save();
};
