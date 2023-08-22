import { ExtendedCartItemInterface, ProductInterface } from "@/types";
import { formatProductVariantName } from "@/utils/utils";

export const getLocalCart = (): ExtendedCartItemInterface[] => {
	const localStrCart = localStorage.getItem("cart");
	return localStrCart ? JSON.parse(localStrCart) : [];
};

export const saveCartToLocal = (cart: ExtendedCartItemInterface[]) => {
	localStorage.setItem("cart", JSON.stringify(cart));
};

export const addItemToCart = (
	cart: ExtendedCartItemInterface[],
	product: ProductInterface,
	variantId: string
) => {
	const variant = product.variants.find((item) => item._id === variantId)!;
	const itemIndex = cart.findIndex(
		(item) =>
			item.productId === product._id && item.variantId === variant._id
	);

	if (itemIndex !== -1) {
		cart[itemIndex].quantity += 1;
	} else {
		const newCartItem: ExtendedCartItemInterface = {
			cartItemId: variant._id,
			productId: product._id,
			variantId: variant._id,
			formattedName: formatProductVariantName(
				product.name,
				variant.attributes
			),
			image: variant?.images[0] || product.defaultImages[0] || "",
			quantity: 1,
			price: variant.price,
		};

		cart.push(newCartItem);
	}

	return cart;
};

export const updateItemInCart = (
	cart: ExtendedCartItemInterface[],
	productId: string,
	variantId: string,
	quantity: number
) => {
	const itemIndex = cart.findIndex(
		(item) => item.productId === productId && item.variantId === variantId
	);
	if (itemIndex !== -1) {
		cart[itemIndex].quantity = quantity;
	}

	return cart;
};

export const removeItemFromCart = (
	cart: ExtendedCartItemInterface[],
	productId: string,
	variantId: string
) => {
	return cart.filter(
		(item) =>
			!(item.productId === productId && item.variantId === variantId)
	);
};
