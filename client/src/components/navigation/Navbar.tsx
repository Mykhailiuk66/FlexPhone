import { Link, NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

import { IoPhonePortrait } from "react-icons/io5";
import { IoPhonePortraitOutline } from "react-icons/io5";
import { RiShoppingCart2Line } from "react-icons/ri";

import NavbarLink from "./NavbarLink";
import CartPopover from "../cart/CartPopover";
import UserDropdown from "./UserDropdown";
import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";

const Navbar = () => {
	const { user } = useContext(AuthContext);

	return (
		<header className="flex items-center justify-between bg-background px-4 py-3.5 shadow-lg sm:px-6 md:px-12 lg:px-16 sticky top-0 z-50">
			<NavLink to="/" className="flex items-center gap-2">
				<IoPhonePortraitOutline className="hidden md:block h-8 w-8 text-primary" />
				<IoPhonePortrait className="block md:hidden h-8 w-8 text-primary" />
				<span className="hidden md:inline text-lg font-semibold">
					FlexPhone
				</span>
			</NavLink>

			<nav className="flex items-center gap-4">
				<NavbarLink to="/shop" brandName="all">
					Store
				</NavbarLink>
				<Separator
					orientation="vertical"
					className="hidden md:block h-6 bg-secondary-foreground"
				/>
				<span className="hidden md:flex gap-4">
					<NavbarLink to="/shop?brand=Samsung" brandName="Samsung">
						Samsung
					</NavbarLink>
					<NavbarLink to="/shop?brand=Apple" brandName="Apple">
						Apple
					</NavbarLink>
					<NavbarLink to="/shop?brand=Xiaomi" brandName="Xiaomi">
						Xiaomi
					</NavbarLink>
				</span>
			</nav>

			<div className="flex items-center gap-4">
				<Link to="/cart" className="block md:hidden">
					<span className="relative">
						<RiShoppingCart2Line className="h-6 w-6 text-primary" />

						<span className="absolute -top-0.5 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
							{3}
						</span>
					</span>
				</Link>

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
