import Navbar from "@/components/navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";
import AuthContextProvider from "@/store/auth-context";
import CartContextProvider from "@/store/cart-context";
import Footer from "@/components/navigation/Footer";

const Root = () => {
	const { pathname } = useLocation();

	return (
		<>
			<AuthContextProvider>
				<CartContextProvider>
					{!pathname.includes("/login") &&
						!pathname.includes("/register") && <Navbar />}

					<main>
						<Outlet />
					</main>
					<Toaster />

					{!pathname.includes("/login") &&
						!pathname.includes("/register") && <Footer />}
				</CartContextProvider>
			</AuthContextProvider>
		</>
	);
};

export default Root;
