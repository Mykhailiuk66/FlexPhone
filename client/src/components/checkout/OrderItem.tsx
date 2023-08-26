import { baseURL } from "@/api/http";

interface OrderItemProps {
	image: string;
	title: string;
	price: number;
	quantity: number;
}

const OrderItem = ({ image, title, price, quantity }: OrderItemProps) => {
	return (
		<div className="flex items-center justify-between bg-muted rounded-lg p-2">
			<div className="flex items-center gap-4">
				<img
					src={`${baseURL}/${image}`}
					alt={title}
          width={50}
          height={50}
					className="rounded-md object-contain h-16"
				/>
				<div>
					<h3 className="text-base font-medium">{title}</h3>
					<p className="text-muted-foreground">
						${price.toFixed(2)} x {quantity}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
