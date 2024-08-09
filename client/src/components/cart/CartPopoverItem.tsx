import { Input } from "@/components/ui/input";

interface CartPopoverItemProps {
	img: string;
	price: number;
	quantity: number;
	children: React.ReactNode;
}

const CartPopoverItem = ({
	img,
	price,
	quantity,
	children,
}: CartPopoverItemProps) => {
	return (
		<div className="grid grid-cols-[80px_1fr_80px] items-center gap-4">
			<img
				src={img}
				alt="Product Image"
				width={80}
				height={80}
				className="rounded-md object-cover"
				style={{ aspectRatio: "80/80", objectFit: "cover" }}
			/>
			<div className="grid gap-1">
				<h4 className="font-medium">{children}</h4>
			</div>
			<div className="grid gap-2">
				<Input type="number" value={quantity} onChange={() => {}} className="w-full" />
				<p className="font-medium">${price}</p>
			</div>
		</div>
	);
};

export default CartPopoverItem;
