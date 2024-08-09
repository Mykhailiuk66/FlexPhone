import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import CartPopoverContent from "../cart/CartPopoverContent";
import { RiShoppingCart2Line } from "react-icons/ri";

interface CartPopoverProps {
	cartQty: number;
}

const CartPopover = ({ cartQty }: CartPopoverProps) => {
	return (
		<Popover>
			<PopoverTrigger className="relative">
				<RiShoppingCart2Line className="h-6 w-6 text-foreground" />

				<span className="absolute -top-0.5 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
					{cartQty}
				</span>
			</PopoverTrigger>
			<PopoverContent className="w-[26rem] p-1">
				<CartPopoverContent />
			</PopoverContent>
		</Popover>
	);
};

export default CartPopover;
