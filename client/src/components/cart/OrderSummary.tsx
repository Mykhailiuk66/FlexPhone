import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";

interface OrderSummaryProps {
	cart: {
		id: number;
		image: string;
		title: string;
		price: number;
		quantity: number;
	}[];
	totalPrice: number;
}

const OrderSummary = ({ cart, totalPrice }: OrderSummaryProps) => {
	return (
		<div className="border shadow-sm w-full h-full px-6 pt-7 lg:min-h-[90vh]">
			<div className="space-y-4 sticky top-24 pb-8">
				<h2 className="text-xl font-bold">Order Summary</h2>

				<div className="space-y-2 pt-6">
					{cart.map((item) => (
						<div
							key={item.id}
							className="flex justify-between items-center gap-x-2.5"
						>
							<div className="flex items-center gap-4 font-medium">
								<p>{item.title}</p>
							</div>
							<p>{item.quantity}x</p>
						</div>
					))}
				</div>
				<div className="flex justify-between">
					<p className="font-medium">Subtotal</p>
					<p>${totalPrice.toFixed(2)}</p>
				</div>
				<div className="flex justify-between">
					<p className="font-medium">Shipping</p>
					<p>Free</p>
				</div>
				<Separator />
				<div className="flex justify-between items-center">
					<p className="text-lg font-bold">Total</p>
					<p className="text-lg font-bold">
						${totalPrice.toFixed(2)}
					</p>
				</div>

				<div className="pt-6">
					<Button size="lg" className="w-full">
						Proceed to Checkout
					</Button>
				</div>
			</div>
		</div>
	);
};

export default OrderSummary;
