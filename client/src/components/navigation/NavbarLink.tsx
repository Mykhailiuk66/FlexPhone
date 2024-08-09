import { NavLink, useSearchParams } from "react-router-dom";
import { cn } from "@/lib/utils";

interface NavbarLinkProps {
	to: string;
	brandName?: string;
	className?: string;
	children: React.ReactNode;
}

export const NavbarLink = ({
	to,
	brandName,
	className,
	children,
}: NavbarLinkProps) => {
	const [searchParams] = useSearchParams();
	const brand = searchParams.get("brand") || "all";

	const navlinkClasses = ({ isActive }: { isActive: boolean }): string => {
		return cn(
			"text-sm font-medium text-foreground hover:text-primary transition-colors",
			isActive &&
				brand === brandName &&
				"text-primary underline-offset-4 underline",
			className
		);
	};

	return (
		<NavLink to={to} className={navlinkClasses} end>
			{children}
		</NavLink>
	);
};

export default NavbarLink;
