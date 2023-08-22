import { CartItemInterface, CartResponseInterface } from "@/types";
import { axiosClient } from "./http";

export const fetchCart = async (): Promise<CartResponseInterface> => {
	const response = await axiosClient.get("/cart");
	return response.data;
};

export const updateCart = async (cartItems: CartItemInterface[]) => {
	const response = await axiosClient.put("/cart", {
		cart: cartItems,
	});
	return response.data;
};
