import { useContext, useEffect } from "react";
import CartItem from "@/components/cart/CartItem";
import CartOrderSummary from "@/components/cart/CartOrderSummary";
import { CartContext } from "@/store/cart-context";
import { useToast } from "@/components/ui/use-toast";
import CartItemsSkeleton from "@/components/cart/CartItemSkeleton";
import CartOrderSummarySkeleton from "@/components/cart/CartOrderSummarySkeleton";

const Cart = () => {
	const { toast } = useToast();
	const { cart, isLoading, isError } = useContext(CartContext);

	useEffect(() => {
		if (isError) {
			toast({
				variant: "destructive",
				duration: 1000 * 60,
				description: "Something went wrong. Please try again later.",
			});
		}
	}, [isError, toast]);

	return (
		<div className="container sm:pr-0 grid grid-cols-1 sm:grid-cols-[3fr_2fr] lg:grid-cols-[5fr_2fr] shadow-2xl min-h-[93vh]">
			<div className="space-y-6 py-8 px-6">
				<h1 className="text-3xl font-bold mb-4">Your Cart</h1>
				{(isLoading || isError) && <CartItemsSkeleton />}
				{!isLoading &&
					!isError &&
					cart &&
					cart.map((item) => {
						return (
							<CartItem
								key={item.cartItemId}
								productId={item.productId}
								variantId={item.variantId}
								image={item.image}
								title={item.formattedName}
								price={item.price}
								quantity={item.quantity}
							/>
						);
					})}

				{!isLoading && !isError && cart && cart.length === 0 && (
					<p className="text-muted-foreground text-3xl font-bold mb-8 h-1/3 content-center text-center">
						Your cart is empty
					</p>
				)}
			</div>

			{!isLoading && !isError && <CartOrderSummary />}
			{(isLoading || isError) && <CartOrderSummarySkeleton />}
		</div>
	);
};

export default Cart;
