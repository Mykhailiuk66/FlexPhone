import { OrderInterface } from "@/types";
import { Badge } from "../ui/badge";
import { cn } from "@/lib/utils";

interface OrderTriggerContentProps {
	order: OrderInterface;
}

const OrderTriggerContent = ({ order }: OrderTriggerContentProps) => {
	return (
		<div className="flex flex-col sm:flex-row gap-6 justify-between w-full mr-4">
			<div className="text-start">
				<div className="text-base font-medium">
					{new Date(order.createdAt!).toLocaleString("en-GB")}
				</div>
				<div className="text-sm text-muted-foreground">
					Order id: {order._id}
				</div>
			</div>
			<div className="flex items-center justify-between gap-2">
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
					className={cn(
						order.status === "paid" ? "border border-primary" : "",
						order.status === "shipped"
							? "border border-primary text-primary"
							: ""
					)}
				>
					{order.status}
				</Badge>
			</div>
		</div>
	);
};

export default OrderTriggerContent;
