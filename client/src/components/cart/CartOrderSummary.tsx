import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { CartContext } from "@/store/cart-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

const CartOrderSummary = () => {
	const { cart } = useContext(CartContext);

	const totalPrice = cart
		? cart.reduce((total, item) => total + item.price * item.quantity, 0)
		: 0;

	return (
		<div className="border shadow-sm w-full h-full px-6 pt-7">
			<div className="space-y-4 sticky top-24 pb-8">
				<h2 className="text-xl font-bold">Order Summary</h2>

				<div className="space-y-2 pt-6">
					{cart &&
						cart.map((item) => (
							<div
								key={item.cartItemId}
								className="flex justify-between items-center gap-x-2.5"
							>
								<div className="flex items-center gap-4 font-medium">
									<p>{item.formattedName}</p>
								</div>
								<p>{item.quantity}x</p>
							</div>
						))}
				</div>
				<div className="flex justify-between">
					<p className="font-medium">Subtotal</p>
					<p>${totalPrice.toFixed(2)}</p>
				</div>
				<div className="flex justify-between">
					<p className="font-medium">Shipping</p>
					<p>Free</p>
				</div>
				<Separator />
				<div className="flex justify-between items-center">
					<p className="text-lg font-bold">Total</p>
					<p className="text-lg font-bold">
						${totalPrice.toFixed(2)}
					</p>
				</div>

				{cart && cart.length > 0 && (
					<div className="pt-6">
						<Button size="lg" className="w-full" asChild>
							<Link to="/checkout">Proceed to Checkout</Link>
						</Button>
					</div>
				)}
			</div>
		</div>
	);
};

export default CartOrderSummary;
