import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { FiTrash } from "react-icons/fi";
import { Link } from "react-router-dom";

interface CartItemProps {
	id: number;
	img: string;
	title: string;
	price: number;
	quantity: number;
	onQuantityChange: (id: number, value: string) => void;
	onRemove: (id: number) => void;
}

const CartItem = ({
	id,
	img,
	title,
	price,
	quantity,
	onQuantityChange,
	onRemove,
}: CartItemProps) => {
	return (
		<div className="border rounded-lg shadow-lg flex items-center justify-between bg-background p-4">
			<div className="flex items-center gap-4">
				<Link to={`/shop/${id}`}>
					<img
						src={img}
						alt={title}
						width={80}
						height={80}
						className="rounded-md"
						style={{
							aspectRatio: "80/80",
							objectFit: "cover",
						}}
					/>
				</Link>
				<div>
					<Link to={`/shop/${id}`}>
						<h3 className="text-lg font-medium">{title}</h3>
					</Link>
					<p className="text-muted-foreground">${price.toFixed(2)}</p>
				</div>
			</div>
			<div className="flex items-center gap-1 sm:gap-4">
				<Input
					type="number"
					min={1}
					value={quantity}
					onChange={(e) => onQuantityChange(id, e.target.value)}
					className={"text-center w-12 sm:w-20"}
				/>
				<Button
					variant="ghost"
					size="icon"
					onClick={() => onRemove(id)}
				>
					<FiTrash className="w-5 h-5 text-muted-foreground" />
				</Button>
			</div>
		</div>
	);
};

export default CartItem;
