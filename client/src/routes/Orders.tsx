import { fetchOrders } from "@/api/ordersApi";
import OrderAccordionItem from "@/components/orders/OrderAccordionItem";
import OrdersSkeleton from "@/components/orders/OrdersSkeleton";
import { Accordion } from "@/components/ui/accordion";
import { toast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";

const Orders = () => {
	const { data, isLoading, isError } = useQuery({
		queryKey: ["orders"],
		queryFn: async () => {
			return await fetchOrders();
		},
	});

	useEffect(() => {
		if (isError) {
			toast({
				variant: "destructive",
				duration: 1000 * 5,
				description: "Something went wrong. Please try again later.",
			});
		}
	}, [isError]);

	return (
		<div className="container mx-auto py-8 shadow-2xl min-h-[93vh]">
			<h1 className="text-3xl font-bold mb-6 ml-4">My Orders</h1>

			{isLoading && <OrdersSkeleton />}

			{!isLoading && (
				<Accordion type="single" collapsible>
					{data?.orders.map((order) => (
						<OrderAccordionItem key={order._id} order={order} />
					))}
				</Accordion>
			)}
		</div>
	);
};

export default Orders;
