import { Separator } from "@/components/ui/separator";

import NavbarLink from "./NavbarLink";

const NavigationLinks = () => {
	return (
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
	);
};

export default NavigationLinks;
