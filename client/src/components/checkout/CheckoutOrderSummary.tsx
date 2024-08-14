import { Separator } from "@/components/ui/separator";
import { useState } from "react";
import OrderItem from "./OrderItem";

const cartItems = [
	{
		id: 1,
		image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
		title: "iPhone 14 Pro",
		price: 999.99,
		quantity: 1,
	},
	{
		id: 2,
		image: "https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp",
		title: "Samsung Galaxy S23 Ultra",
		price: 1199.99,
		quantity: 1,
	},
	{
		id: 3,
		image: "https://www.abanista.com/wp-content/uploads/2022/08/15.jpg",
		title: "Google Pixel 7 Pro",
		price: 899.99,
		quantity: 1,
	},
	{
		id: 4,
		image: "https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg",
		title: "iPhone 14 Pro",
		price: 999.99,
		quantity: 1,
	},
	{
		id: 5,
		image: "https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp",
		title: "Samsung Galaxy S23 Ultra",
		price: 1199.99,
		quantity: 1,
	},
];

const CheckoutOrderSummary = () => {
	const [cart, setCartItems] = useState(cartItems);
	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);

	return (
		<div className="border shadow-sm w-full h-full px-6 pt-7">
			<div className="space-y-4 sticky top-24 pb-8">
				<h2 className="text-xl font-bold">Order Summary</h2>
				<div className="space-y-2">
					{cart.length === 0 && (
						<p className="text-muted-foreground text-3xl font-bold mb-8 h-1/3 content-center text-center">
							Your cart is empty
						</p>
					)}
					{cart.map((item) => (
						<OrderItem item={item} />
					))}
				</div>
				<Separator />
				<div className="flex justify-between items-center">
					<p className="text-lg font-bold">Total</p>
					<p className="text-lg font-bold">
						${totalPrice.toFixed(2)}
					</p>
				</div>
			</div>
		</div>
	);
};

export default CheckoutOrderSummary;
