import { baseURL } from "@/api/axios";
import { Input } from "@/components/ui/input";
import { CartContext } from "@/store/cart-context";
import { useContext } from "react";
import { Link } from "react-router-dom";

interface CartPopoverItemProps {
	productId: string;
	variantId: string;
	image: string;
	title: string;
	price: number;
	quantity: number;
}

const CartPopoverItem = ({
	productId,
	variantId,
	image,
	title,
	price,
	quantity,
}: CartPopoverItemProps) => {
	const { updateCart, removeCartItem } = useContext(CartContext);

	const handleQuantityChange = (
		productId: string,
		variantId: string,
		quantity: string
	) => {
		if (quantity === "0") {
			removeCartItem(productId, variantId);
		}

		const quantityNumber = Number(quantity);
		if (quantityNumber < 1 || isNaN(quantityNumber)) return;

		updateCart(productId, variantId, quantityNumber);
	};

	return (
		<div className="grid grid-cols-[80px_1fr_80px] items-center gap-4">
			<Link to={`/shop/${productId}/${variantId}`}>
				<img
					src={`${baseURL}/${image}`}
					alt="Product Image"
					width={80}
					height={80}
					className="rounded-md object-cover"
					style={{ aspectRatio: "80/80", objectFit: "cover" }}
				/>
			</Link>
			<div className="grid gap-1">
				<Link to={`/shop/${productId}/${variantId}`}>
					<h4 className="font-medium">{title}</h4>
				</Link>
			</div>
			<div className="grid gap-2">
				<Input
					type="number"
					min={0}
					value={quantity}
					onChange={(e) =>
						handleQuantityChange(
							productId,
							variantId,
							e.target.value
						)
					}
					className="w-full"
				/>
				<p className="font-medium">${price}</p>
			</div>
		</div>
	);
};

export default CartPopoverItem;
