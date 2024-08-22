import { CartResponseInterface } from "@/types";
import { axiosClient } from "./axios";

export const fetchCart = async (): Promise<CartResponseInterface> => {
	const response = await axiosClient.get("/cart");
	return response.data;
};

export const updateCart = async (
	productId: string,
	variantId: string,
	quantity: number
) => {
	const response = await axiosClient.put("/cart", {
		productId,
		variantId,
		quantity,
	});
	return response.data;
};
