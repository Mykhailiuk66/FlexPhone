import Navbar from "@/components/navigation/Navbar";
import { Outlet, useLocation } from "react-router-dom";

const Root = () => {
	const { pathname } = useLocation();

	return (
		<>
			{!pathname.includes("/login") &&
				!pathname.includes("/register") && <Navbar />}

			<main>
				<Outlet />
			</main>
		</>
	);
};

export default Root;
