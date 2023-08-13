import {
	Card,
	CardContent,
	CardDescription,
	CardFooter,
	CardHeader,
	CardTitle,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import CartPopoverItem from "./CartPopoverItem";
import { Link } from "react-router-dom";
import { useState } from "react";

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
];

const CartPopoverContent = () => {
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
		(total, item) =>
			total +
			item.price * (Number.isNaN(item.quantity) ? 1 : item.quantity),
		0
	);

	return (
		<Card className="shadow-none border-0">
			<CardHeader className="border-b py-4">
				<CardTitle>Cart</CardTitle>
				<CardDescription>3 items in your cart</CardDescription>
			</CardHeader>

			<CardContent className="p-6 grid gap-4 max-h-80 overflow-y-auto">
				{cart.length > 0 &&
					cart.map((item) => (
						<CartPopoverItem
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
					<p className="text-muted-foreground text-xl font-bold h-1/3 align-center text-center">
						Your cart is empty
					</p>
				)}
			</CardContent>
			<CardFooter className="border-t pt-2 flex-col">
				<span>
					<p className="font-medium">
						Total: ${totalPrice.toFixed(2)}
					</p>
				</span>

				<Button variant="default" className="mt-4 w-full" asChild>
					<Link to="/cart">View Cart</Link>
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CartPopoverContent;
