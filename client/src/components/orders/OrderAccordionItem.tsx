import {
	AccordionContent,
	AccordionItem,
	AccordionTrigger,
} from "@/components/ui/accordion";
import OrderTriggerContent from "@/components/orders/TriggerContent";
import OrderContent from "@/components/orders/OrderContent";
import { OrderInterface } from "@/types";

interface OrderAccordionItemProps {
	order: OrderInterface;
}

const OrderAccordionItem = ({ order }: OrderAccordionItemProps) => {
	return (
		<AccordionItem
			value={order._id}
			className="border rounded-lg px-6 mb-4"
		>
			<AccordionTrigger className="hover:no-underline select-text">
				<OrderTriggerContent order={order} />
			</AccordionTrigger>
			<AccordionContent className="p-0">
				<OrderContent order={order} />
			</AccordionContent>
		</AccordionItem>
	);
};

export default OrderAccordionItem;
