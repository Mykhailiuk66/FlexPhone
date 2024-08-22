import { useContext, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Navigate } from "react-router-dom";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import ShippingForm from "@/components/checkout/ShippingForm";
import { ShippingInfo } from "@/types";
import { CartContext } from "@/store/cart-context";

const Checkout = () => {
	const { cart } = useContext(CartContext);
	const [shippingInfo, setShippingInfo] = useState({
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		country: "",
		postalCode: "",
	});

	const handleFormChange = (shippingInfo: ShippingInfo) => {
		setShippingInfo({ ...shippingInfo });
	};

	const handleCheckout = () => {
		console.log("Checkout:", {});
	};
	return (
		<>
			{cart.length === 0 && <Navigate to="/shop" />}
			<div className="container sm:pr-0 grid grid-cols-1 sm:grid-cols-[3fr_2fr] lg:grid-cols-[5fr_4fr] shadow-2xl min-h-[93vh]">
				<div className="space-y-6 py-8 px-6">
					<h1 className="text-3xl font-bold mb-4">Checkout</h1>
					<Card className="h-fit">
						<CardHeader>
							<CardTitle>Shipping Information</CardTitle>
						</CardHeader>
						<CardContent>
							<ShippingForm onFormChange={handleFormChange} />
						</CardContent>
					</Card>
					<Button
						size="lg"
						className="w-full"
						onClick={handleCheckout}
					>
						Checkout
					</Button>
				</div>

				<CheckoutOrderSummary />
			</div>
		</>
	);
};

export default Checkout;
