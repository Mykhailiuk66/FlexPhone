import { axiosClient } from "./axios";

export const loginUser = async (email: string, password: string) => {
	const response = await axiosClient.post("/auth/login", { email, password });
	return response.data;
};

export const registerUser = async (
	firstName: string,
	lastName: string,
	email: string,
	password: string
) => {
	const response = await axiosClient.post("/auth/register", {
		firstName,
		lastName,
		email,
		password,
	});
	return response.data;
};
