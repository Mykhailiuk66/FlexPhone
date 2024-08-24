import { useContext } from "react";
import { Link } from "react-router-dom";

import { RiShoppingCart2Line } from "react-icons/ri";
import { CartContext } from "@/store/cart-context";

const CartIconLink = () => {
	const { cart } = useContext(CartContext);

	const cartQty = cart
		? cart.reduce((acc, item) => acc + item.quantity, 0)
		: 0;

	return (
		<Link to="/cart" className="block md:hidden">
			<span className="relative">
				<RiShoppingCart2Line className="h-6 w-6 text-primary" />

				<span className="absolute -top-0.5 -right-1 flex h-3.5 w-3.5 items-center justify-center rounded-full bg-primary text-xs text-primary-foreground">
					{cartQty}
				</span>
			</span>
		</Link>
	);
};

export default CartIconLink;
