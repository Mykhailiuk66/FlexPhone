import { useContext } from "react";
import CartItem from "@/components/cart/CartItem";
import CartOrderSummary from "@/components/cart/CartOrderSummary";
import { CartContext } from "@/store/cart-context";

const Cart = () => {
	const { cart } = useContext(CartContext);

	return (
		<div className="container sm:pr-0 grid grid-cols-1 sm:grid-cols-[3fr_2fr] lg:grid-cols-[5fr_2fr] shadow-2xl min-h-[93vh]">
			<div className="space-y-6 py-8 px-6">
				<h1 className="text-3xl font-bold mb-4">Your Cart</h1>

				{cart.length > 0 &&
					cart.map((item) => (
						<CartItem
							key={item.cartItemId}
							productId={item.productId}
							variantId={item.variantId}
							image={item.image}
							title={item.formattedName}
							price={item.price}
							quantity={item.quantity}
						/>
					))}

				{cart.length === 0 && (
					<p className="text-muted-foreground text-3xl font-bold mb-8 h-1/3 content-center text-center">
						Your cart is empty
					</p>
				)}
			</div>
			<CartOrderSummary />
		</div>
	);
};

export default Cart;
