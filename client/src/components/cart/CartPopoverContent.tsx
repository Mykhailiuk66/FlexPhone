import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CartPopoverItem from "./CartPopoverItem";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "@/store/cart-context";

const CartPopoverContent = () => {
	const { cart } = useContext(CartContext);

	const totalPrice = cart
		? cart.reduce(
				(total, item) =>
					total +
					item.price *
						(Number.isNaN(item.quantity) ? 1 : item.quantity),
				0
		  )
		: 0;

	return (
		<Card className="shadow-none border-0">
			<CardHeader className="border-b py-4">
				<CardTitle>Cart</CardTitle>
				<CardDescription>3 items in your cart</CardDescription>
			</CardHeader>

			<CardContent className="p-6 grid gap-4 max-h-80 overflow-y-auto">
				{cart &&
					cart.map((item) => (
						<CartPopoverItem
							key={item.cartItemId}
							productId={item.productId}
							variantId={item.variantId}
							image={item.image}
							title={item.formattedName}
							price={item.price}
							quantity={item.quantity}
						/>
					))}

				{cart && cart.length === 0 && (
					<p className="text-muted-foreground text-xl font-bold h-1/3 align-center text-center">
						Your cart is empty
					</p>
				)}
			</CardContent>
			<CardFooter className="border-t pt-2 flex-col">
				<span>
					<p className="font-medium">
						Total: ${totalPrice.toFixed(2)}
					</p>
				</span>

				<Button variant="default" className="mt-4 w-full" asChild>
					<Link to="/cart">View Cart</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CartPopoverContent;
