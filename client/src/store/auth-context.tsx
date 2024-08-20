import { createContext, ReactNode, useEffect, useState } from "react";
import { loginUser, registerUser } from "../api/authApi";
import { useMutation } from "@tanstack/react-query";
import { jwtDecode } from "jwt-decode";
import { LoginParams, RegisterParams, UserInterface } from "@/types";
import { useNavigate } from "react-router-dom";
import { AxiosError } from "axios";

export const AuthContext = createContext<AuthContextType>(
	{} as AuthContextType
);

interface AuthContextProviderProps {
	children: ReactNode;
}

interface AuthContextType {
	user: UserInterface | null;
	loginErrorMsg: string | null;
	registerErrorMsgs: Record<string, string> | null;
	login: ({ email, password }: LoginParams) => void;
	register: ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterParams) => void;
	logout: () => void;
	setErrorMsg: React.Dispatch<React.SetStateAction<string | null>>;
	setRegisterErrorMsgs: React.Dispatch<
		React.SetStateAction<Record<string, string> | null>
	>;
	isPending: boolean;
	isError: boolean;
}

export default function AuthContextProvider({
	children,
}: AuthContextProviderProps) {
	const [user, setUser] = useState<UserInterface | null>(null);
	const [loginErrorMsg, setErrorMsg] = useState<string | null>(null);
	const [registerErrorMsgs, setRegisterErrorMsgs] = useState<Record<
		string,
		string
	> | null>(null);
	const navigate = useNavigate();

	const {
		mutateAsync: loginMutation,
		isPending: isPendingLogin,
		isError: loginError,
	} = useMutation({
		mutationFn: ({ email, password }: LoginParams) => {
			return loginUser(email, password);
		},
		onSuccess: (respData) => {
			const { token } = respData;
			setUser(jwtDecode(token));
			localStorage.setItem("authToken", token);
			navigate("/shop");
		},
		onError: (error: AxiosError) => {
			const respData = error.response?.data as { message: string };
			setErrorMsg(respData?.message || "Failed to login");
		},
	});

	const {
		mutateAsync: registerMutation,
		isPending: isPendingRegister,
		isError: registerError,
	} = useMutation({
		mutationFn: ({
			firstName,
			lastName,
			email,
			password,
		}: RegisterParams) => {
			return registerUser(firstName, lastName, email, password);
		},
		onSuccess: () => {
			navigate("/login");
		},
		onError: (error: AxiosError) => {
			console.log(error);
			const respData = error.response?.data as {
				errors: Record<string, string>;
			};
			setRegisterErrorMsgs(respData?.errors || null);
		},
	});

	const logout = () => {
		localStorage.removeItem("authToken");
		setUser(null);
		navigate("/");
	};

	const login = async ({ email, password }: LoginParams) => {
		return loginMutation({ email, password });
	};

	const register = async ({
		firstName,
		lastName,
		email,
		password,
	}: RegisterParams) => {
		return registerMutation({ firstName, lastName, email, password });
	};

	const contextValue: AuthContextType = {
		user,
		loginErrorMsg,
		registerErrorMsgs,
		login,
		register,
		logout,
		setErrorMsg,
		setRegisterErrorMsgs,
		isPending: isPendingLogin || isPendingRegister,
		isError: loginError || registerError,
	};

	useEffect(() => {
		const authToken = localStorage.getItem("authToken");
		if (!authToken) return;
		const decodedToken = jwtDecode(authToken) as UserInterface;
		const currentDate = new Date();
		const isExpired = decodedToken.exp * 1000 < currentDate.getTime();
		if (!isExpired) {
			setUser(decodedToken);
		}
	}, []);

	return (
		<AuthContext.Provider value={contextValue}>
			{children}
		</AuthContext.Provider>
	);
}
