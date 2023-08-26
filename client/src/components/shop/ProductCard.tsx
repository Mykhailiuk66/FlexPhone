import { baseURL } from "@/api/http";
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

	const handleAddToCart = (e: React.MouseEvent<HTMLButtonElement>) => {
		e.preventDefault();
		addCartItem(product, variant._id);
	};

	return (
		<div className="rounded-lg bg-background shadow-xl flex flex-col justify-between sm:hover:scale-110 transition duration-500 cursor-pointer h-auto">
			<Link to={`/shop/${product._id}/${variant._id}`}>
				<img
					src={`${baseURL}/${prodImg}`}
					alt="Product Image"
					width={300}
					height={300}
					className="m-auto aspect-square w-11/12 rounded-t-lg object-contain cursor-pointer p-3"
				/>

				<div className="pt-1 px-2 sm:p-4 flex-1">
					<h3 className="text-lg font-semibold line-clamp-2">
						{product.name}
					</h3>
					<p className="text-sm text-muted-foreground">
						{formatAttributes(variant.attributes)}
					</p>
				</div>
				<div className="pt-2 px-3 sm:px-4 pb-2 sm:pb-4 sm:pt-4 gap-1 mt-auto flex  items-center justify-between">
					<span className="text-lg font-semibold">
						${variant.price}
					</span>
					<Button
						className="self-stretch py-5 sm:py-0"
						variant="default"
						size="sm"
						onClick={(e) => handleAddToCart(e)}
					>
						<RiShoppingCart2Line className="h-5 w-6" />
					</Button>
				</div>
			</Link>
		</div>
	);
};

export default ProductCard;
