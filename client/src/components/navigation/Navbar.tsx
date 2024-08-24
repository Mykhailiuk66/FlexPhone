import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";

import CartPopover from "../cart/CartPopover";
import UserDropdown from "./UserDropdown";
import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";
import NavLogo from "./NavLogo";
import CartIconLink from "./CartIconLink";
import NavigationLinks from "./NavigationLinks";

const Navbar = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className="flex items-center justify-between bg-background px-4 py-3.5 shadow-lg sm:px-6 md:px-12 lg:px-16 sticky top-0 z-50">
			<NavLink to="/" className="flex items-center gap-2">
				<NavLogo />
			</NavLink>

			<NavigationLinks />

			<div className="flex items-center gap-4">
				<span className="block md:hidden">
					<CartIconLink />
				</span>
				<span className="hidden md:block mr-4">
					<CartPopover />
				</span>

				<div className="flex items-center gap-2">
					{!user && (
						<>
							<Button variant="outline" asChild>
								<Link to={"/login"}>Login</Link>
							</Button>
							<Button asChild>
								<Link to={"/register"}>Register</Link>
							</Button>
						</>
					)}

					{user && <UserDropdown />}
				</div>
			</div>
		</header>
	);
};

export default Navbar;
