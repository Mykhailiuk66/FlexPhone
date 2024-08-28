import React, { useContext, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { IoPhonePortrait, IoPhonePortraitOutline } from "react-icons/io5";
import { AuthContext } from "@/store/auth-context";

interface AuthFormProps {
	children: React.ReactNode;
}

const AuthLayout = ({ children }: AuthFormProps) => {
	const navigate = useNavigate();
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (user) {
			navigate("/", { replace: true });
		}
	}, [user, navigate]);

	return (
		<div className="md:m-4 md:border rounded-lg mx-auto md:shadow-2xl flex justify-start flex-col min-h-[97vh] items-center px-5 sm:px-6 lg:px-8 mb-10">
			<div className="mt-10 md:mt-12 mb-12">
				<Link to="/">
					<IoPhonePortraitOutline className="block md:hidden h-40 w-40 text-primary" />
					<IoPhonePortrait className="hidden md:block h-40 w-40 text-primary" />
				</Link>
			</div>
			<div className="mx-auto mb-8 w-full max-w-md space-y-6 sm:border sm:p-8 sm:rounded-lg">
				{children}
			</div>
		</div>
	);
};

export default AuthLayout;
