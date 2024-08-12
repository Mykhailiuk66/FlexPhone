import { Input } from "@/components/ui/input";
import { Link } from "react-router-dom";

interface CartPopoverItemProps {
	id: number;
	img: string;
	title: string;
	price: number;
	quantity: number;
	onQuantityChange: (id: number, value: string) => void;
	onRemove: (id: number) => void;
}

const CartPopoverItem = ({
	id,
	img,
	title,
	price,
	quantity,
	onQuantityChange,
	onRemove,
}: CartPopoverItemProps) => {
	const handleChange = (id: number, value: string) => {
		if (value === "0") {
			onRemove(id);
		} else {
			onQuantityChange(id, value);
		}
	};

	return (
		<div className="grid grid-cols-[80px_1fr_80px] items-center gap-4">
			<Link to={`/shop/${id}`}>
				<img
					src={img}
					alt="Product Image"
					width={80}
					height={80}
					className="rounded-md object-cover"
					style={{ aspectRatio: "80/80", objectFit: "cover" }}
				/>
			</Link>
			<div className="grid gap-1">
				<Link to={`/shop/${id}`}>
					<h4 className="font-medium">{title}</h4>
				</Link>
			</div>
			<div className="grid gap-2">
				<Input
					type="number"
					min={0}
					value={quantity}
					onChange={(e) => handleChange(id, e.target.value)}
					className="w-full"
				/>
				<p className="font-medium">${price}</p>
			</div>
		</div>
	);
};

export default CartPopoverItem;
