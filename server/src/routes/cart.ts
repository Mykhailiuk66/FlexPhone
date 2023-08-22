import { Router } from "express";
import * as cartControllers from "../controllers/cart";
import { isAuth } from "../middleware/isAuth";
import { body } from "express-validator";

const router = Router();

router.get("/", isAuth, cartControllers.getCart);
router.put(
	"/",
	isAuth,
	[body("cart").isArray().withMessage("Invalid cart format")],
	cartControllers.updateCart
);
router.delete("/", isAuth, cartControllers.emptyCart);

router.put(
	"/add",
	isAuth,
	[
		body("productId")
			.trim()
			.notEmpty()
			.withMessage("Product ID is required"),
		body("variantId")
			.trim()
			.notEmpty()
			.withMessage("Variant ID is required"),
	],
	cartControllers.addCartItem
);
router.put(
	"/update",
	isAuth,
	[
		body("productId")
			.trim()
			.notEmpty()
			.withMessage("Product ID is required"),
		body("variantId")
			.trim()
			.notEmpty()
			.withMessage("Variant ID is required"),
		body("quantity")
			.toInt()
			.isInt()
			.withMessage("Quantity must be an whole number")
			.notEmpty()
			.withMessage("Quantity is required"),
	],
	cartControllers.updateCartItem
);

export default router;
