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

export interface ProductInterface {
	_id: string;
	name: string;
	description: string;
	characteristics: Record<string, string>;
	variants: ProductVariantInterface[];
	defaultImages: string[];
	createdAt?: Date;
	updatedAt?: Date;
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
	createdAt?: Date;
	updatedAt?: Date;
}
