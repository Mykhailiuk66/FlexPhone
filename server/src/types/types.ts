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

export interface ProductVariantInterface {
	_id: ObjectId;
	attributes: Record<string, string | Record<string, string>>;
	price: number;
	inStock?: number;
	images: string[];
	createdAt?: Date;
	updatedAt?: Date;
}

export interface CartProductInterface {
	productId: ProductInterface;
	variantId: ObjectId;
	quantity: number;
}

export interface ExtendedCartInterface {
	product: ProductInterface;
	quantity: number;
	price: number;
}
