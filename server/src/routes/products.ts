import { Router } from "express";
import { body } from "express-validator";

import * as productsController from "../controllers/products";
import * as productVariantsController from "../controllers/productVariants";
import upload from "../utils/fileHandling";
import { isAdmin, isAuth } from "../middleware/isAuth";

const router = Router();

router.get("/", productsController.getAllProducts);
router.get("/:productId", productsController.getProduct);
router.delete(
	"/:productId",
	[isAuth, isAdmin],
	productsController.deleteProduct
);

router.post(
	"/",
	[isAuth, isAdmin],
	upload.array("defaultImages"),
	[
		body("name").trim().notEmpty().withMessage("Name is required"),
		body("description")
			.trim()
			.notEmpty()
			.withMessage("Description is required"),
	],
	productsController.createProduct
);

router.put(
	"/:productId",
	[isAuth, isAdmin],
	upload.array("defaultImages"),
	[
		body("name").trim().notEmpty().withMessage("Name is required"),
		body("description")
			.trim()
			.notEmpty()
			.withMessage("Description is required"),
	],
	productsController.updateProduct
);

router.put(
	"/:productId/variants",
	[isAuth, isAdmin],
	upload.array("images"),
	[
		body("price")
			.toFloat()
			.not()
			.equals("0")
			.withMessage("Price must be greater than 0")
			.isFloat({ min: 0 })
			.withMessage("Price must be greater than 0"),
		body("inStock")
			.toInt()
			.isInt({ min: 0 })
			.withMessage("Instock must be positive number"),
	],
	productVariantsController.createProductVariant
);

router.delete(
	"/:productId/variants/:variantId",
	[isAuth, isAdmin],
	productVariantsController.deleteProductVariant
);

export default router;
