import { Separator } from "@/components/ui/separator";
import { useContext } from "react";
import OrderItem from "./OrderItem";
import { CartContext } from "@/store/cart-context";

const CheckoutOrderSummary = () => {
	const { cart } = useContext(CartContext);
	const totalPrice = cart
		? cart.reduce((total, item) => total + item.price * item.quantity, 0)
		: 0;

	return (
		<div className="border shadow-sm w-full h-full px-6 pt-7">
			<div className="space-y-4 sticky top-24 pb-8">
				<h2 className="text-xl font-bold">Order Summary</h2>
				<div className="space-y-2">
					{cart?.length === 0 && (
						<p className="text-muted-foreground text-3xl font-bold mb-8 h-1/3 content-center text-center py-20">
							Your cart is empty
						</p>
					)}
					{cart?.map((item) => (
						<OrderItem
							key={item.cartItemId}
							image={item.image}
							title={item.formattedName}
							price={item.price}
							quantity={item.quantity}
						/>
					))}
				</div>
				<Separator />
				<div className="flex justify-between items-center">
					<p className="text-lg font-bold">Total</p>
					<p className="text-lg font-bold">
						${totalPrice.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutOrderSummary;
