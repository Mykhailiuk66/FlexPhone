import { Router } from "express";
import * as checkoutController from "../controllers/orders";
import { isAdmin, isAuth } from "../middleware/isAuth";
import { body } from "express-validator";

const router = Router();

router.get("/", isAuth, checkoutController.getOrders);

router.post(
	"/checkout",
	[
		isAuth,

		body("firstName")
			.trim()
			.notEmpty()
			.withMessage("First name is required"),
		body("lastName").trim().notEmpty().withMessage("Last name is required"),
		body("address").trim().notEmpty().withMessage("Address is required"),
		body("city").trim().notEmpty().withMessage("City is required"),
		body("country").trim().notEmpty().withMessage("Country is required"),
		body("postalCode")
			.trim()
			.notEmpty()
			.isPostalCode("any")
			.withMessage("Postal code is required"),
	],
	checkoutController.handleCheckout
);
router.put(
	"/update-status",
	[isAuth, isAdmin],
	[
		body("orderId").trim().notEmpty().withMessage("Order ID is required"),
		body("status")
			.trim()
			.notEmpty()
			.withMessage("Status is required")
			.isIn(["pending", "paid", "shipped", "delivered", "cancelled"])
			.withMessage(
				"Status must be one of the following: 'pending', 'paid', 'shipped', 'delivered', 'cancelled'"
			),
	],
	checkoutController.updateOrderStatus
);

export default router;
