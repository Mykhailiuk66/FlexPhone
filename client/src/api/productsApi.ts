import { ProductInterface, ProductsResponseInterface } from "@/types";
import { axiosClient } from "./http";

export const fetchProducts = async (
	searchParams?: URLSearchParams
): Promise<ProductsResponseInterface> => {
	const response = await axiosClient.get("/products", {
		params: searchParams,
	});

	return response.data;
};

export const fetchProduct = async (
	productId: string
): Promise<ProductInterface> => {
	const response = await axiosClient.get(`/products/${productId}`);
	return response.data;
};
