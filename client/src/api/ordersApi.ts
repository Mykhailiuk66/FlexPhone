import { OrdersResponseInterface } from "@/types";
import { axiosClient } from "./axios";

export const fetchOrders = async (): Promise<OrdersResponseInterface> => {
	const response = await axiosClient.get("/orders");
	return response.data;
};
