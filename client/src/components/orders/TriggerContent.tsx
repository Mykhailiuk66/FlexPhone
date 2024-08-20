import { OrderInterface } from "@/types";
import { Badge } from "../ui/badge";

interface OrderTriggerContentProps {
	order: OrderInterface;
}

const OrderTriggerContent = ({ order }: OrderTriggerContentProps) => {
	return (
		<div className="flex justify-between w-full mr-4">
			<div className="text-start">
				<div className="text-base font-medium">
					{new Date(order.createdAt!).toLocaleString("en-GB")}
				</div>
				<div className="text-sm text-muted-foreground">
					Order id: {order._id}
				</div>
			</div>
			<div className="flex items-center gap-2">
				<div className="font-medium mr-4">
					${order.totalPrice.toFixed(2)}
				</div>
				<Badge
					variant={
						order.status === "delivered"
							? "default"
							: order.status === "cancelled"
							? "destructive"
							: "outline"
					}
					className={
						order.status === "shipped"
							? "border border-primary"
							: ""
					}
				>
					{order.status}
				</Badge>
			</div>
		</div>
	);
};

export default OrderTriggerContent;
