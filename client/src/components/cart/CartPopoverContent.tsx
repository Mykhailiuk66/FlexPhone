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

const CartPopoverContent = () => {
	return (
		<Card className="shadow-none border-0">
			<CardHeader className="border-b py-4">
				<CardTitle>Cart</CardTitle>
				<CardDescription>3 items in your cart</CardDescription>
			</CardHeader>
			<CardContent className="p-6 grid gap-4 max-h-80 overflow-y-auto">
				<CartPopoverItem
					img="https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg"
					price={999.99}
					quantity={1}
				>
					iPhone 13 Pro
				</CartPopoverItem>
				<CartPopoverItem
					img="https://cdn.dxomark.com/wp-content/uploads/medias/post-125834/Apple-iPhone-14_FINAL_featured-image-packshot-review.jpg"
					price={799.99}
					quantity={1}
				>
					Samsung Galaxy S22
				</CartPopoverItem>
				<CartPopoverItem
					img="https://files.foxtrot.com.ua/PhotoNew/img_0_60_9853_0_1_Yqq7p8.webp"
					price={899.99}
					quantity={2}
				>
					Google Pixel 6 Pro
				</CartPopoverItem>
			</CardContent>
			<CardFooter className="border-t pt-2 flex-col">
				<span>
					<p className="font-medium">Total: $2,699.97</p>
				</span>

				<Button variant="default" className="mt-4 w-full">
					View Cart
				</Button>
			</CardFooter>
		</Card>
	);
};

export default CartPopoverContent;
