import { ProductsResponseInterface } from "@/types";
import { axiosClient } from "./axios";

export const fetchProducts = async (
	searchParams: URLSearchParams
): Promise<ProductsResponseInterface> => {
	const response = await axiosClient.get("/products", {
		params: searchParams,
	});

	return response.data;
};
