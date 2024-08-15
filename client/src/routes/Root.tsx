import Navbar from "@/components/navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";
import { Toaster } from "@/components/ui/toaster";

const Root = () => {
	const { pathname } = useLocation();

	return (
		<>
			{!pathname.includes("/login") &&
				!pathname.includes("/register") && <Navbar />}

			<main>
				<Outlet />
			</main>

      <Toaster />
		</>
	);
};

export default Root;
