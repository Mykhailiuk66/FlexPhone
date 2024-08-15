import { Button } from "@/components/ui/button";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

interface ProductCardProps {
	children: React.ReactNode;
	productId: string;
	variantId: string;
	attributesDesc: string;
	img: string;
	price: number;
}

const ProductCard = ({
	children,
	productId,
	variantId,
	attributesDesc,
	img,
	price,
}: ProductCardProps) => {
	return (
		<div className="rounded-lg bg-background shadow-xl flex flex-col justify-between hover:scale-110 transition duration-500 cursor-pointer object-cover h-auto">
			<Link to={`${productId}/${variantId}`}>
				<img
					src={img}
					alt="Product Image"
					width={300}
					height={300}
					className="m-auto aspect-square w-11/12 rounded-t-lg object-cover cursor-pointer p-3"
				/>
			</Link>

			<div className="p-4 flex-1">
				<Link to={`${productId}/${variantId}`}>
					<h3 className="text-lg font-semibold line-clamp-2">
						{children}
					</h3>
				</Link>
				<p className="text-sm text-muted-foreground">{attributesDesc}</p>
			</div>
			<div className="p-4 mt-auto flex items-center justify-between">
				<span className="text-lg font-semibold">${price}</span>
				<Button variant="default" size="sm">
					<RiShoppingCart2Line className="h-5 w-6" />
				</Button>
			</div>
		</div>
	);
};

export default ProductCard;
