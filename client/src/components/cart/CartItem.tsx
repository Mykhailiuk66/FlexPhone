import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { CartContext } from "@/store/cart-context";
import { baseURL } from "@/api/http";

interface CartItemProps {
	productId: string;
	variantId: string;
	image: string;
	title: string;
	price: number;
	quantity: number;
}

const CartItem = ({
	productId,
	variantId,
	image,
	title,
	price,
	quantity,
}: CartItemProps) => {
	const { updateCart, removeCartItem } = useContext(CartContext);

	const handleQuantityChange = (
		productId: string,
		variantId: string,
		quantity: number | string
	) => {
		const quantityNumber = Number(quantity);
		if (quantityNumber < 1 || isNaN(quantityNumber)) return;

		updateCart(productId, variantId, quantityNumber);
	};
	const handleRemoveFromCart = (productId: string, variantId: string) => {
		removeCartItem(productId, variantId);
	};

	return (
		<div className="border rounded-lg shadow-lg flex items-center justify-between bg-background p-4">
			<div className="flex items-center gap-4">
				<Link to={`/shop/${productId}/${variantId}`}>
					<img
						src={`${baseURL}/${image}`}
						alt={title}
						width={80}
						height={80}
						className="rounded-md min-w-16 object-contain h-20"
					/>
				</Link>
				<div>
					<Link to={`/shop/${productId}/${variantId}`}>
						<h3 className="text-lg font-medium ">{title}</h3>
					</Link>
					<p className="text-muted-foreground">${price.toFixed(2)}</p>
				</div>
			</div>
			<div className="flex items-center gap-1 sm:gap-4 ml-2">
				<Input
					type="number"
          defaultValue={quantity}
					onChange={(e) =>
						handleQuantityChange(
							productId,
							variantId,
							e.target.value
						)
					}
					className={"text-center w-12 md:w-20"}
				/>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => handleRemoveFromCart(productId, variantId)}
				>
					<FiTrash className="w-5 h-5 text-muted-foreground" />
				</Button>
			</div>
		</div>
	);
};

export default CartItem;
