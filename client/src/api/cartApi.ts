import {
	CartItemInterface,
	CartResponseInterface,
	CheckoutResponseInterface,
	ShippingInfoInterface,
	UpdateCartResponseInterface,
} from "@/types";
import { axiosClient } from "./http";

export const fetchCart = async (): Promise<CartResponseInterface> => {
	const response = await axiosClient.get("/cart");
	return response.data;
};

export const updateCart = async (
	cartItems: CartItemInterface[]
): Promise<UpdateCartResponseInterface> => {
	const response = await axiosClient.put("/cart", {
		cart: cartItems,
	});
	return response.data;
};

export const checkoutCart = async (
	shippingInfo: ShippingInfoInterface
): Promise<CheckoutResponseInterface> => {
	const response = await axiosClient.post("/orders/checkout", {
		...shippingInfo,
	});
	return response.data;
};
