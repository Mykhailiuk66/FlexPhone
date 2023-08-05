import { Request, Response, NextFunction } from "express";
import Cart from "../models/Cart";
import { validationResult } from "express-validator";

export const getCart = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const user = req.user;
		const cart = await Cart.findOne({ userId: user._id });
		if (!cart) {
			return res.status(404).json({
				message: "Cart not found",
			});
		}
		res.status(200).json(cart);
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
		const { productId, variantId } = req.body;
		const quantity = Number(req.body.quantity);

		let cart = await Cart.findOne({ userId: user._id });
		if (!cart) {
			cart = new Cart({
				userId: user._id,
			});
		}

		const productIndex = cart.products.findIndex(
			(p: any) =>
				p.productId.toString() === productId &&
				p.variantId.toString() === variantId
		);

		if (productIndex === -1) {
			if (quantity <= 0) {
				return res.status(404).json({
					message: "Product not found in cart",
				});
			}
			cart.products.push({ productId, variantId, quantity });
		} else {
			if (quantity <= 0) {
				cart.products.splice(productIndex, 1);
			} else {
				cart.products[productIndex].quantity = quantity;
			}
		}

		await cart.save();
		res.status(200).json(cart);
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
		const user = req.user;
		const cart = await Cart.findOne({ userId: user._id });
		if (!cart) {
			return res.status(404).json({
				message: "Cart not found",
			});
		}

		cart.products.splice(0, cart.products.length);

		await cart.save();
		res.status(200).json({
			message: "Cart emptied",
		});
	} catch (err) {
		next(err);
	}
};
