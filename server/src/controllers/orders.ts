import { NextFunction, Request, Response } from "express";
import { validationResult } from "express-validator";
import Stripe from "stripe";

import { emptyUserCart, getUserCartInfo } from "../utils/cartUtils";
import {
	cancelReservation,
	reserveProducts,
	setOrderStatus,
} from "../utils/orderHandling";
import Order from "../models/Order";
import HttpError from "../exeptions/HttpError";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export const getOrders = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const orders = await Order.find({ userId: req.user._id }).sort({
			createdAt: -1,
		});
		res.status(200).json({ orders });
	} catch (err) {
		next(err);
	}
};

export const handleCheckout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { firstName, lastName, address, city, country, postalCode } =
			req.body;
		const user_id = req.user._id;

		const extendedCart = await getUserCartInfo(user_id.toString());
		if (!extendedCart) {
			throw new HttpError(404, "Cart not found");
		}

		const totalPrice = extendedCart.reduce((acc, product) => {
			return acc + product.price * product.quantity;
		}, 0);

		const order = new Order({
			userId: user_id,
			products: extendedCart.map((p) => {
				return {
					productId: p.productId,
					variantId: p.variantId,
					name: p.formattedName,
					image: p.image,
					quantity: p.quantity,
					price: p.price,
				};
			}),
			totalPrice: totalPrice,
			status: "pending",
			shippingAddress: {
				firstName: firstName,
				lastName: lastName,
				address: address,
				city: city,
				country: country,
				postalCode: postalCode,
			},
		});

		const reservationRes = await reserveProducts(extendedCart);
		if (!reservationRes.success) {
			return res
				.status(400)
				.json({
					message: `The ordered quantity for ${reservationRes.productName} exceeds the available stock`,
				});
		}

		const session = await stripe.checkout.sessions.create({
			mode: "payment",
			client_reference_id: order._id.toString(),
			success_url: `${process.env.CLIENT_URL}/orders?success=true`,
			cancel_url: `${process.env.CLIENT_URL}/orders?canceled=true`,
			line_items: extendedCart.map((p) => {
				return {
					price_data: {
						currency: "usd",
						product_data: {
							name: p.formattedName,
						},
						unit_amount: p.price * 100,
					},
					quantity: p.quantity,
				};
			}),
		});

		await order.save();
		await emptyUserCart(user_id.toString());

		res.status(200).json({ url: session.url });
	} catch (err) {
		next(err);
	}
};

export const updateOrderStatus = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const { orderId, status } = req.body;
		if (status === "cancelled") {
			await cancelReservation(orderId, res);
		}

		await setOrderStatus(orderId, status);
		res.status(200).json({ message: "Order status updated successfully" });
	} catch (err) {
		next(err);
	}
};

export const webhookCheckout = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	const sig = req.headers["stripe-signature"];

	let event;

	event = stripe.webhooks.constructEvent(
		req.body,
		sig as string,
		process.env.STRIPE_WEBHOOK_SECRET as string
	);

	try {
		let orderId: string;
		switch (event.type) {
			case "checkout.session.completed":
				const checkoutSessionCompleted = event.data.object;
				orderId = checkoutSessionCompleted.client_reference_id!;

				await setOrderStatus(orderId, "paid");

				break;
			case "checkout.session.expired":
				const checkoutSessionExpired = event.data.object;
				orderId = checkoutSessionExpired.client_reference_id!;

				await setOrderStatus(orderId, "cancelled");
				await cancelReservation(orderId, res);

				break;
			default:
				console.log(`Unhandled event type ${event.type}`);
		}

		res.status(200).json({ received: true });
	} catch (err) {
		next(err);
	}
};
