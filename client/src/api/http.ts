import { QueryClient } from "@tanstack/react-query";
import axios from "axios";

export const queryClient = new QueryClient();

export const baseURL = import.meta.env.VITE_REACT_APP_API_URL;

export const axiosClient = axios.create({
	baseURL: baseURL + "/api",
});

axiosClient.defaults.headers["Content-Type"] = "application/json";

axiosClient.interceptors.request.use((config) => {
	const token = localStorage.getItem("authToken");
	if (token) {
		config.headers.Authorization = `Bearer ${token}`;
	}
	return config;
});
