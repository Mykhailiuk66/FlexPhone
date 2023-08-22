import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart";
import { validationResult } from "express-validator";
import { Product } from "../models/Product";
import {
	emptyUserCart,
	getExtendedCartInfo,
	getOrCreateCart,
	getUserCartInfo,
} from "../utils/cartUtils";
import HttpError from "../exeptions/HttpError";
import { CartItemInterface } from "../types/types";

export const getCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const cart = await getUserCartInfo(req.user._id.toString());
		if (!cart) {
			return res.status(200).json({ cart: [] });
		}
		return res.status(200).json({ cart });
	} catch (err) {
		next(err);
	}
};

export const updateCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const user = req.user;
		const cart = await getOrCreateCart(user._id.toString());

		const { cart: newCartItems }: { cart: CartItemInterface[] } = req.body;

		cart.items.splice(0, cart.items.length);
		newCartItems.forEach((item) => {
			if (!item.productId || !item.variantId || !item.quantity) {
				throw new HttpError(400, "Invalid cart format");
			}
			cart.items.push({
				productId: item.productId,
				variantId: item.variantId,
				quantity: item.quantity,
			});
		});
		await cart.save();

		return res.status(200).json({ message: "Cart updated" });
	} catch (err) {
		next(err);
	}
};

export const addCartItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const user = req.user;
		const { productId, variantId } = req.body;

		const result = await Product.findOne({
			_id: productId,
			"variants._id": variantId,
		});
		if (!result) {
			throw new HttpError(404, "Product not found");
		}

		const cart = await getOrCreateCart(user._id.toString());

		const productIndex = cart.items.findIndex(
			(p: any) =>
				p.productId.toString() === productId &&
				p.variantId.toString() === variantId
		);

		if (productIndex === -1) {
			cart.items.push({ productId, variantId, quantity: 1 });
		} else {
			cart.items[productIndex].quantity += 1;
		}

		await cart.save();

		res.status(200).json({
			message: "Cart item added successfully",
		});
	} catch (err) {
		next(err);
	}
};

export const updateCartItem = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const user = req.user;
		const { productId, variantId } = req.body;
		const quantity = Number(req.body.quantity);

		const result = await Product.findOne({
			_id: productId,
			"variants._id": variantId,
		});
		if (!result) {
			throw new HttpError(404, "Product not found");
		}

		const cart = await getOrCreateCart(user._id.toString());

		const productIndex = cart.items.findIndex(
			(p: any) =>
				p.productId.toString() === productId &&
				p.variantId.toString() === variantId
		);

		if (productIndex === -1) {
			if (quantity > 0) {
				cart.items.push({ productId, variantId, quantity });
			}
		} else {
			if (quantity <= 0) {
				cart.items.splice(productIndex, 1);
			} else {
				cart.items[productIndex].quantity = quantity;
			}
		}

		await cart.save();

		res.status(200).json({
			message: "Cart updated",
		});
	} catch (err) {
		next(err);
	}
};

export const emptyCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user_id = req.user._id.toString();
		await emptyUserCart(user_id);

		res.status(200).json({
			message: "Cart emptied",
		});
	} catch (err) {
		next(err);
	}
};
