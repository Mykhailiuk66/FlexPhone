import { baseURL } from "@/api/http";
import { OrderInterface } from "@/types";
import { Link } from "react-router-dom";

interface OrderContentProps {
	order: OrderInterface;
}

const OrderContent = ({ order }: OrderContentProps) => {
	return (
		<div className="px-6 py-4">
			<div className="grid gap-4">
				{order.products.map((product, index) => (
					<div
						key={index}
						className="grid grid-cols-[80px_1fr_auto] items-center gap-4"
					>
						<Link
							to={`/shop/${product.productId}/${product.variantId}`}
						>
							<img
								src={`${baseURL}/${product.image}`}
								alt={product.name}
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
							<Link
								to={`/shop/${product.productId}/${product.variantId}`}
							>
								<div className="font-medium">
									{product.name}
								</div>
							</Link>
							<div className="text-sm text-muted-foreground">
								${product.price.toFixed(2)}
							</div>
						</div>
						<div className="font-medium">x{product.quantity}</div>
					</div>
				))}
			</div>
		</div>
	);
};

export default OrderContent;
