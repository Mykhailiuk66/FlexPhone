import { fetchOrders } from "@/api/ordersApi";
import OrderAccordionItem from "@/components/orders/OrderAccordionItem";
import OrdersSkeleton from "@/components/orders/OrdersSkeleton";
import { Accordion } from "@/components/ui/accordion";
import { useToast } from "@/components/ui/use-toast";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { useSearchParams } from "react-router-dom";

const Orders = () => {
	const { toast } = useToast();
	const [searchParams, setSearchParams] = useSearchParams();
	const { data, isLoading, isError } = useQuery({
		queryKey: ["orders"],
		queryFn: () => fetchOrders(),
	});

	useEffect(() => {
		if (isLoading === false) {
			if (searchParams.get("success") === "true") {
				toast({
					variant: "default",
					className: "bg-primary text-primary-foreground",
					description: "Your order has been successfully placed.",
					duration: 1000 * 5,
				});
				setSearchParams((searchParams) => {
					searchParams.delete("success");
					return searchParams;
				});
			} else if (searchParams.get("canceled") === "true") {
				toast({
					variant: "destructive",
					description: "Your order has been canceled.",
					duration: 1000 * 5,
				});
				setSearchParams((searchParams) => {
					searchParams.delete("canceled");
					return searchParams;
				});
			}
		}
	}, [isLoading, searchParams, setSearchParams, toast]);

	useEffect(() => {
		if (isError) {
			toast({
				variant: "destructive",
				duration: 1000 * 5,
				description: "Something went wrong. Please try again later.",
			});
		}
	}, [isError, toast]);

	return (
		<div className="container px-4 sm:px-8 mx-auto py-8 shadow-2xl min-h-[93vh]">
			<h1 className="text-3xl font-bold mb-6 ml-4">My Orders</h1>

			{isLoading && <OrdersSkeleton />}

			{!isLoading && (data?.orders.length ?? 0) > 0 && (
				<Accordion type="single" collapsible>
					{data?.orders.map((order) => (
						<OrderAccordionItem key={order._id} order={order} />
					))}
				</Accordion>
			)}

			{!isLoading && data?.orders.length === 0 && (
				<p className="text-muted-foreground text-3xl font-bold align-center text-center pt-32">
          No orders found
				</p>
			)}
		</div>
	);
};

export default Orders;
