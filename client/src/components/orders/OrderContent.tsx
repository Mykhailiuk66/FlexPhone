import { Link } from "react-router-dom";

interface OrderContentProps {
	order: any; // TODO: create order type
}

const OrderContent = ({ order }: OrderContentProps) => {
	return (
		<div className="px-6 py-4">
			<div className="grid gap-4">
				{order.items.map(
					(
						item: any,
						index: any // add types
					) => (
						<div
							key={index}
							className="grid grid-cols-[80px_1fr_auto] items-center gap-4"
						>
							<Link to={`/shop/${item.id}`}>
								<img
									src={item.image}
									alt={item.title}
									width={80}
									height={80}
									className="rounded-md object-cover"
									style={{
										aspectRatio: "80/80",
										objectFit: "cover",
									}}
								/>
							</Link>
							<div>
								<Link to={`/shop/${item.id}`}>
									<div className="font-medium">
										{item.title}
									</div>
								</Link>
								<div className="text-sm text-muted-foreground">
									${item.price.toFixed(2)}
								</div>
							</div>
							<div className="font-medium">x{item.quantity}</div>
						</div>
					)
				)}
			</div>
		</div>
	);
};

export default OrderContent;
