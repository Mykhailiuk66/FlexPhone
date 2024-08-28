import {
	DropdownMenu,
	DropdownMenuContent,
	DropdownMenuItem,
	DropdownMenuSeparator,
	DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "../ui/button";
import { Link } from "react-router-dom";
import { FaUser } from "react-icons/fa6";
import { useContext } from "react";
import { AuthContext } from "@/store/auth-context";

const UserDropdown = () => {
	const { logout, user } = useContext(AuthContext);

	return (
		<DropdownMenu>
			<DropdownMenuTrigger asChild>
				<Button
					variant="default"
					size="icon"
					className="rounded-full border-primary border-2 h-8 w-8"
				>
					<FaUser className="h-5 w-5" />
				</Button>
			</DropdownMenuTrigger>
			<DropdownMenuContent align="end">
				<DropdownMenuItem asChild>
					<Link to="/orders">Orders</Link>
				</DropdownMenuItem>
				{user?.isAdmin && (
					<DropdownMenuItem asChild>
						<Link to="/admin">Admin Panel</Link>
					</DropdownMenuItem>
				)}
				<DropdownMenuSeparator />
				<DropdownMenuItem
					className="focus:text-destructive-foreground focus:bg-destructive"
					onClick={logout}
				>
					Logout
				</DropdownMenuItem>
			</DropdownMenuContent>
		</DropdownMenu>
	);
};

export default UserDropdown;
