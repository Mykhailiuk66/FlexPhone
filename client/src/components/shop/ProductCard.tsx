import { baseURL } from "@/api/axios";
import { Button } from "@/components/ui/button";
import { CartContext } from "@/store/cart-context";
import { ProductInterface } from "@/types";
import { formatAttributes } from "@/utils/utils";
import { useContext } from "react";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

interface ProductCardProps {
	product: ProductInterface;
}

const ProductCard = ({ product }: ProductCardProps) => {
	const { addCartItem } = useContext(CartContext);

	const variant = product.variants[0];
	const prodImg =
		product.variants[0].images[0] || product.defaultImages[0] || "";

	const handleAddToCart = () => {
		addCartItem(product, variant._id);
	};

	return (
		<div className="rounded-lg bg-background shadow-xl flex flex-col justify-between hover:scale-110 transition duration-500 cursor-pointer object-cover h-auto">
			<Link to={`${product._id}/${variant._id}`}>
				<img
					src={`${baseURL}/${prodImg}`}
					alt="Product Image"
					width={300}
					height={300}
					className="m-auto aspect-square w-11/12 rounded-t-lg object-cover cursor-pointer p-3"
				/>
			</Link>

			<div className="p-4 flex-1">
				<Link to={`${product._id}/${variant._id}`}>
					<h3 className="text-lg font-semibold line-clamp-2">
						{product.name}
					</h3>
				</Link>
				<p className="text-sm text-muted-foreground">
					{formatAttributes(variant.attributes)}
				</p>
			</div>
			<div className="p-4 mt-auto flex items-center justify-between">
				<span className="text-lg font-semibold">${variant.price}</span>
				<Button variant="default" size="sm" onClick={handleAddToCart}>
					<RiShoppingCart2Line className="h-5 w-6" />
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;
