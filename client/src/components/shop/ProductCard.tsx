import { Button } from "@/components/ui/button";
import { RiShoppingCart2Line } from "react-icons/ri";
import { Link } from "react-router-dom";

interface ProductCardProps {
	children: React.ReactNode;
	id: string;
	attr_desc: string;
	img: string;
	price: number;
}

const ProductCard = ({
	children,
	id,
	attr_desc,
	img,
	price,
}: ProductCardProps) => {
	return (
		<div className="rounded-lg bg-background shadow-xl flex flex-col justify-between hover:scale-110 transition duration-500 cursor-pointer object-cover h-auto">
			<Link to={`${id}`}>
				<img
					src={img}
					alt="Product Image"
					width={300}
					height={300}
					className="aspect-square w-full rounded-t-lg object-cover cursor-pointer p-3"
				/>
			</Link>

			<div className="p-4 flex-1">
				<Link to={`${id}`}>
					<h3 className="text-lg font-semibold line-clamp-2">
						{children}
					</h3>
				</Link>
				<p className="text-sm text-muted-foreground">{attr_desc}</p>
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
