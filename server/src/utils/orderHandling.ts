import { Response } from "express";
import HttpError from "../exeptions/HttpError";
import Order from "../models/Order";
import { Product } from "../models/Product";
import { ExtendedCartItemInterface } from "../types/types";
import { formatProductVariantName } from "./utils";

export const setOrderStatus = async (orderId: string, status: string) => {
	const order = await Order.findById(orderId);
	if (!order) {
		throw new Error("Order not found");
	}
	order.status = status;
	await order.save();

	return order;
};

export const reserveProducts = async (
	extendedCart: ExtendedCartItemInterface[]
) => {
	for (const p of extendedCart) {
		const product = await Product.findOne({
			_id: p.productId,
			"variants._id": p.variantId,
		});
		if (!product) {
			throw new HttpError(
				400,
				`Product (${p.productId}) or variant (${p.variantId}) not found`
			);
		}

		const variant = product.variants.find(
			(variant) => variant._id!.toString() === p.variantId.toString()
		);

		if (variant && variant.inStock - p.quantity < 0) {
			return {
				success: false,
				productName: formatProductVariantName(
					product.name,
					variant.toJSON().attributes as unknown as Record<
						string,
						string | Record<string, string>
					>
				),
			};
		}
		variant!.inStock -= p.quantity;

		await product.save();
	}

	return { success: true, productName: null };
};

export const cancelReservation = async (orderId: string, res: Response) => {
	const order = await Order.findById(orderId);

	if (!order) {
		throw new HttpError(400, `Order ${orderId} not found`);
	}

	for (const p of order.products) {
		const product = await Product.findOne({
			_id: p.productId,
			"variants._id": p.variantId,
		});
		if (!product) {
			throw new Error("Product not found");
		}

		product.variants.map((variant) => {
			if (variant._id!.toString() === p.variantId!.toString()) {
				variant.inStock += p.quantity;
			}
		});
	}

	await order.save();
};
