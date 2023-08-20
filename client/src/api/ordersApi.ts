import { AllOrdersInterface } from "@/types";
import { axiosClient } from "./axios";

export const fetchOrders = async (): Promise<AllOrdersInterface> => {
	const response = await axiosClient.get("/orders");
	return response.data;
};
