import {
	Popover,
	PopoverContent,
	PopoverTrigger,
} from "@/components/ui/popover";
import { Arrow } from "@radix-ui/react-popover";
import CartPopoverContent from "../cart/CartPopoverContent";
import { RiShoppingCart2Line } from "react-icons/ri";
import { useContext, useEffect } from "react";
import { CartContext } from "@/store/cart-context";
import { useToast } from "@/components/ui/use-toast";
import CartPopoverSkeleton from "./CartPopoverSkeleton";

const CartPopover = () => {
	const { toast } = useToast();
	const { cart, isLoading, isError } = useContext(CartContext);

	const cartQty = cart
		? cart.reduce((acc, item) => acc + item.quantity, 0)
		: 0;

	useEffect(() => {
		if (isError) {
			toast({
				variant: "destructive",
				duration: 1000 * 5,
				description: "Something went wrong. Please try again later.",
			});
		}
	}, [isError, toast]);

	return (
		<Popover>
			<PopoverTrigger className="relative align-middle">
				<RiShoppingCart2Line className="h-6 w-6 text-foreground hover:text-primary" />
				{cartQty > 0 && (
					<span className="absolute -top-0.5 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
						{cartQty > 9 ? "" : cartQty}
					</span>
				)}
			</PopoverTrigger>
			<PopoverContent className="w-[26rem] p-1">
				<Arrow />
				{(isLoading || isError) && <CartPopoverSkeleton />}
				{!isLoading && !isError && <CartPopoverContent />}
			</PopoverContent>
		</Popover>
	);
};

export default CartPopover;
