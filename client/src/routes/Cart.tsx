import { useState } from "react";
import CartItem from "@/components/cart/CartItem";
import CartOrderSummary from "@/components/cart/CartOrderSummary";

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

export default function Component() {
	const [cart, setCart] = useState(cartItems);
	const handleQuantityChange = (id: number, value: string) => {
		setCart(
			cart.map((item) =>
				item.id === id ? { ...item, quantity: parseInt(value) } : item
			)
		);
	};
	const handleRemoveFromCart = (id: number) => {
		setCart(cart.filter((item) => item.id !== id));
	};
	const totalPrice = cart.reduce(
		(total, item) => total + item.price * item.quantity,
		0
	);
	return (
		<div className="container sm:pr-0 grid grid-cols-1 sm:grid-cols-[3fr_2fr] lg:grid-cols-[5fr_2fr] shadow-2xl min-h-[93vh]">
			<div className="space-y-6 py-8 px-6">
				<h1 className="text-3xl font-bold mb-4">Your Cart</h1>

				{cart.length > 0 &&
					cart.map((item) => (
						<CartItem
							key={item.id}
							id={item.id}
							img={item.image}
							title={item.title}
							price={item.price}
							quantity={item.quantity}
							onQuantityChange={handleQuantityChange}
							onRemove={handleRemoveFromCart}
						/>
					))}

				{cart.length === 0 && (
					<p className="text-muted-foreground text-3xl font-bold mb-8 h-1/3 content-center text-center">
						Your cart is empty
					</p>
				)}
			</div>
			<CartOrderSummary cart={cart} totalPrice={totalPrice} />
		</div>
	);
}
