import Navbar from "@/components/navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AuthContextProvider from "@/store/auth-context";

const Root = () => {
	const { pathname } = useLocation();

	return (
		<>
			<AuthContextProvider>
				{!pathname.includes("/login") &&
					!pathname.includes("/register") && <Navbar />}

				<main>
					<Outlet />
				</main>

				<Toaster />
			</AuthContextProvider>
		</>
	);
};

export default Root;
