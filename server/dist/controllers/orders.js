"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.webhookCheckout = exports.updateOrderStatus = exports.handleCheckout = exports.getOrders = void 0;
const express_validator_1 = require("express-validator");
const stripe_1 = __importDefault(require("stripe"));
const cartUtils_1 = require("../utils/cartUtils");
const orderHandling_1 = require("../utils/orderHandling");
const Order_1 = __importDefault(require("../models/Order"));
const HttpError_1 = __importDefault(require("../exeptions/HttpError"));
const stripe = new stripe_1.default(process.env.STRIPE_SECRET_KEY);
const getOrders = async (req, res, next) => {
    try {
        const orders = await Order_1.default.find({ userId: req.user._id }).sort({
            createdAt: -1,
        });
        res.status(200).json({ orders });
    }
    catch (err) {
        next(err);
    }
};
exports.getOrders = getOrders;
const handleCheckout = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { firstName, lastName, address, city, country, postalCode } = req.body;
        const user_id = req.user._id;
        const extendedCart = await (0, cartUtils_1.getUserCartInfo)(user_id.toString());
        if (!extendedCart) {
            throw new HttpError_1.default(404, "Cart not found");
        }
        const totalPrice = extendedCart.reduce((acc, product) => {
            return acc + product.price * product.quantity;
        }, 0);
        const order = new Order_1.default({
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
        const reservationRes = await (0, orderHandling_1.reserveProducts)(extendedCart);
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
        await (0, cartUtils_1.emptyUserCart)(user_id.toString());
        res.status(200).json({ url: session.url });
    }
    catch (err) {
        next(err);
    }
};
exports.handleCheckout = handleCheckout;
const updateOrderStatus = async (req, res, next) => {
    try {
        const errors = (0, express_validator_1.validationResult)(req);
        if (!errors.isEmpty()) {
            return res.status(422).json({ errors: errors.array() });
        }
        const { orderId, status } = req.body;
        if (status === "cancelled") {
            await (0, orderHandling_1.cancelReservation)(orderId, res);
        }
        await (0, orderHandling_1.setOrderStatus)(orderId, status);
        res.status(200).json({ message: "Order status updated successfully" });
    }
    catch (err) {
        next(err);
    }
};
exports.updateOrderStatus = updateOrderStatus;
const webhookCheckout = async (req, res, next) => {
    const sig = req.headers["stripe-signature"];
    let event;
    event = stripe.webhooks.constructEvent(req.body, sig, process.env.STRIPE_WEBHOOK_SECRET);
    try {
        let orderId;
        switch (event.type) {
            case "checkout.session.completed":
                const checkoutSessionCompleted = event.data.object;
                orderId = checkoutSessionCompleted.client_reference_id;
                await (0, orderHandling_1.setOrderStatus)(orderId, "paid");
                break;
            case "checkout.session.expired":
                const checkoutSessionExpired = event.data.object;
                orderId = checkoutSessionExpired.client_reference_id;
                await (0, orderHandling_1.setOrderStatus)(orderId, "cancelled");
                await (0, orderHandling_1.cancelReservation)(orderId, res);
                break;
            default:
                console.log(`Unhandled event type ${event.type}`);
        }
        res.status(200).json({ received: true });
    }
    catch (err) {
        next(err);
    }
};
exports.webhookCheckout = webhookCheckout;
