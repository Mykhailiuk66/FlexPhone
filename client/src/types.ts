export interface ShippingInfo {
	firstName: string;
	lastName: string;
	address: string;
	city: string;
	country: string;
	postalCode: string;
}

export interface ProductsResponseInterface {
	products: ProductInterface[];
	currentPage: number;
	totalPages: number;
	totalProducts: number;
}

export type ProductCharacteristicsType = Record<string, string>;

export interface ProductInterface {
	_id: string;
	name: string;
	description: string;
	characteristics: ProductCharacteristicsType;
	variants: ProductVariantInterface[];
	defaultImages: string[];
	createdAt?: string;
	updatedAt?: string;
}

export type ProductVariantAttributesType = Record<
	string,
	string | Record<string, string>
>;

export interface ProductVariantInterface {
	_id: string;
	attributes: ProductVariantAttributesType;
	price: number;
	inStock?: number;
	images: string[];
	createdAt?: string;
	updatedAt?: string;
}

export interface UserInterface {
	_id: string;
	isAdmin: boolean;
	firstName: string;
	lastName: string;
	exp: number;
	iat: number;
	jti: string;
	token_type: string;
}

export interface LoginParams {
	email: string;
	password: string;
}

export interface RegisterParams {
	firstName: string;
	lastName: string;
	email: string;
	password: string;
}

export interface OrderedProductInterface {
	productId: string;
	variantId: string;
	name: string;
	image: string;
	quantity: number;
	price: number;
}

export interface OrderInterface {
	_id: string;
	userId: string;
	products: OrderedProductInterface[];
	totalPrice: number;
	status: "pending" | "paid" | "shipped" | "delivered" | "cancelled";
	shippingAddress: ShippingInfo;
	createdAt?: string;
	updatedAt?: string;
}

export interface OrdersResponseInterface {
	orders: OrderInterface[];
}

export interface CartItemInterface {
	productId: string;
	variantId: string;
	quantity: number;
}

export interface ExtendedCartItemInterface {
	cartItemId: string;
	productId: string;
	variantId: string;
	formattedName: string;
	image: string;
	quantity: number;
	price: number;
}

export interface CartResponseInterface {
	cart: ExtendedCartItemInterface[];
}
