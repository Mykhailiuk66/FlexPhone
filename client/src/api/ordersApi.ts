import { OrdersResponseInterface } from "@/types";
import { axiosClient } from "./http";

export const fetchOrders = async (): Promise<OrdersResponseInterface> => {
	const response = await axiosClient.get("/orders");
	return response.data;
};
