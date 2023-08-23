import { ExtendedCartItemInterface, ProductInterface } from "@/types";
import {
	createContext,
	ReactNode,
	useContext,
	useEffect,
	useState,
} from "react";
import { AuthContext } from "./auth-context";
import {
	getLocalCart,
	saveCartToLocal,
	addItemToCart,
	updateItemInCart,
	removeItemFromCart,
} from "../utils/cartUtils";
import { useMutation, useQuery } from "@tanstack/react-query";
import * as cartApi from "@/api/cartApi";
import { useToast } from "@/components/ui/use-toast";
import { AxiosError } from "axios";
import { queryClient } from "@/api/http";

export const CartContext = createContext<CartContextInterface>(
	{} as CartContextInterface
);

interface CartContextProviderProps {
	children: ReactNode;
}

interface CartContextInterface {
	cart: ExtendedCartItemInterface[] | null;
	isLoading: boolean;
	isError: boolean;
	addCartItem: (product: ProductInterface, variantId: string) => void;
	updateCart: (
		productId: string,
		variantId: string,
		quantity: number,
		isIncrement?: boolean
	) => void;
	removeCartItem: (productId: string, variantId: string) => void;
	emptyCart: () => void;
}

export default function CartContextProvider({
	children,
}: CartContextProviderProps) {
	const { toast } = useToast();
	const [cart, setCart] = useState<ExtendedCartItemInterface[] | null>(null);
	const { user } = useContext(AuthContext);
	const { data, isLoading, isError } = useQuery({
		queryKey: ["cart"],
		queryFn: () => cartApi.fetchCart(),
		enabled: !!user,
	});

	const { mutateAsync: updateCartMutation } = useMutation({
		mutationFn: cartApi.updateCart,
		onError: (error: AxiosError) => {
			toast({
				title: "Error",
				description: error.message,
				variant: "destructive",
			});
		},
	});

	useEffect(() => {
		if (!user) {
			queryClient.removeQueries({ queryKey: ["cart"] });
			setCart(null);
		}
	}, [user]);

	useEffect(() => {
		const localCart = getLocalCart();
		if (!user && !cart) {
			setCart(localCart);
		} else if (user) {
			if (localCart && localCart.length > 0) {
				setCart(localCart);
				localStorage.removeItem("cart");
			} else if (data && (!cart || cart?.length === 0)) {
				setCart(data.cart);
			}
		}
	}, [cart, data, user]);

	useEffect(() => {
		if (user && cart && cart.length > 0) {
			const updateCartTimeout = setTimeout(async () => {
				const formattedCart = cart.map((item) => {
					return {
						productId: item.productId,
						variantId: item.variantId,
						quantity: item.quantity,
					};
				});

				await updateCartMutation(formattedCart);
			}, 1000);

			return () => clearTimeout(updateCartTimeout);
		}
	}, [cart, updateCartMutation, user]);

	const updateCart = (
		productId: string,
		variantId: string,
		quantity: number
	) => {
		if (quantity <= 0) return;
		// if (quantity > 10) return;

		if (!user) {
			const localCart = getLocalCart();
			const updatedCart = updateItemInCart(
				localCart,
				productId,
				variantId,
				quantity
			);
			saveCartToLocal(updatedCart);
			setCart(updatedCart);
		} else if (data !== undefined) {
			const updatedCart = updateItemInCart(
				JSON.parse(JSON.stringify(cart)),
				productId,
				variantId,
				quantity
			);
			setCart(updatedCart);
		}
	};

	const addCartItem = (product: ProductInterface, variantId: string) => {
		if (!user) {
			const localCart = getLocalCart();
			const updatedCart = addItemToCart(localCart, product, variantId);
			saveCartToLocal(updatedCart);
			setCart(updatedCart);
		} else if (data !== undefined) {
			const updatedCart = addItemToCart(
				JSON.parse(JSON.stringify(cart)),
				product,
				variantId
			);
			setCart(updatedCart);
		}
	};

	const removeCartItem = (productId: string, variantId: string) => {
		if (!user) {
			const localCart = getLocalCart();
			const updatedCart = removeItemFromCart(
				localCart,
				productId,
				variantId
			);
			saveCartToLocal(updatedCart);
			setCart(updatedCart);
		} else if (data !== undefined) {
			const updatedCart = removeItemFromCart(
				JSON.parse(JSON.stringify(cart)),
				productId,
				variantId
			);
			setCart(updatedCart);
		}
	};

	const emptyCart = async () => {
		setCart([]);
	};

	const contextValue = {
		cart,
		isLoading,
		isError,
		addCartItem,
		updateCart,
		removeCartItem,
		emptyCart,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
}
