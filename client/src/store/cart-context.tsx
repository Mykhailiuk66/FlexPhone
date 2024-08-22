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
} from "../utils/cart-utils";

export const CartContext = createContext<CartContextInterface>(
	{} as CartContextInterface
);

interface CartContextProviderProps {
	children: ReactNode;
}

interface CartContextInterface {
	cart: ExtendedCartItemInterface[];
	addCartItem: (product: ProductInterface, variantId: string) => void;
	updateCart: (
		productId: string,
		variantId: string,
		quantity: number,
		isIncrement?: boolean
	) => void;
	removeCartItem: (productId: string, variantId: string) => void;
}

export default function CartContextProvider({
	children,
}: CartContextProviderProps) {
	const [cart, setCart] = useState<ExtendedCartItemInterface[]>([]);
	const { user } = useContext(AuthContext);

	useEffect(() => {
		if (!user) {
			const localCart = getLocalCart();
			setCart(localCart);
		}
	}, [user]);

	const updateCart = (
		productId: string,
		variantId: string,
		quantity: number
	) => {
		if (quantity <= 0) return;

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
		}
	};

	const addCartItem = (product: ProductInterface, variantId: string) => {
		if (!user) {
			const localCart = getLocalCart();
			const updatedCart = addItemToCart(localCart, product, variantId);
			saveCartToLocal(updatedCart);
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
		}
	};

	const contextValue = {
		cart,
		addCartItem,
		updateCart,
		removeCartItem,
	};

	return (
		<CartContext.Provider value={contextValue}>
			{children}
		</CartContext.Provider>
	);
}
