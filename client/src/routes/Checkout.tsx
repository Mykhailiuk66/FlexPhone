import { useContext, useState } from "react";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CheckoutOrderSummary from "@/components/checkout/CheckoutOrderSummary";
import ShippingForm from "@/components/checkout/ShippingForm";
import {
	CheckoutResponseInterface,
	ShippingInfo,
	ShippingInfoInterface,
} from "@/types";
import { CartContext } from "@/store/cart-context";
import { useMutation } from "@tanstack/react-query";
import * as cartApi from "@/api/cartApi";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";

const Checkout = () => {
	const { toast } = useToast();
	const { cart, emptyCart } = useContext(CartContext);
	const [shippingInfo, setShippingInfo] = useState<ShippingInfoInterface>({
		firstName: "",
		lastName: "",
		address: "",
		city: "",
		country: "",
		postalCode: "",
	});

	const { mutateAsync } = useMutation({
		mutationFn: cartApi.checkoutCart,
		onSuccess: (data) => {
			console.log(data);
			emptyCart();
			window.location.href = data.url!;
		},
		onError: (error: AxiosError) => {
			const data: CheckoutResponseInterface = error.response?.data || {};
      console.log(data);
			toast({
				title: "Error",
				description:
					data.message ||
					"Something went wrong. Please try again later.",
				variant: "destructive",
			});
		},
	});

	const handleFormChange = (shippingInfo: ShippingInfo) => {
		setShippingInfo({ ...shippingInfo });
	};

	const handleCheckout = () => {
		if (
			!shippingInfo.firstName ||
			!shippingInfo.lastName ||
			!shippingInfo.address ||
			!shippingInfo.city ||
			!shippingInfo.country ||
			!shippingInfo.postalCode
		) {
			toast({
				title: "Error",
				description: "All fields are required.",
				variant: "destructive",
			});
			return;
		}
		mutateAsync({ ...shippingInfo });
	};

	const totalPrice = cart
		? cart.reduce((total, item) => total + item.price * item.quantity, 0)
		: 0;

	return (
		<>
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

					{totalPrice > 0 && (
						<Button
							size="lg"
							className="w-full"
							onClick={handleCheckout}
						>
							Pay ${totalPrice.toFixed(2)}
						</Button>
					)}
				</div>

				<CheckoutOrderSummary />
			</div>
		</>
	);
};

export default Checkout;
