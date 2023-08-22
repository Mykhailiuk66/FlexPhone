import { ObjectId } from "mongoose";

export interface ProductInterface {
	_id: ObjectId;
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
	_id: ObjectId;
	attributes: ProductVariantAttributesType;
	price: number;
	inStock?: number;
	images: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CartItemInterface {
	_id: ObjectId | string;
	productId: ProductInterface;
	variantId: ObjectId;
	quantity: number;
}

export interface ExtendedCartItemInterface {
	cartItemId: ObjectId | string;
	productId: ObjectId;
	variantId: ObjectId;
	formattedName: string;
	image: string;
	quantity: number;
	price: number;
}
