interface OrderItemProps {
	item: any;
}

const OrderItem = ({ item }: OrderItemProps) => {
	return (
		<div
			key={item.id}
			className="flex items-center justify-between bg-muted rounded-lg p-2"
		>
			<div className="flex items-center gap-4">
				<img
					src={item.image}
					alt={item.title}
					width={50}
					height={50}
					className="rounded-md"
					style={{
						aspectRatio: "50/50",
						objectFit: "cover",
					}}
				/>
				<div>
					<h3 className="text-base font-medium">{item.title}</h3>
					<p className="text-muted-foreground">
						${item.price.toFixed(2)} x {item.quantity}
					</p>
				</div>
			</div>
		</div>
	);
};

export default OrderItem;
