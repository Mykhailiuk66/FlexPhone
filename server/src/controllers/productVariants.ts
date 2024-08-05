import { Request, Response, NextFunction } from "express";
import { Product } from "../models/Product";
import HttpError from "../exeptions/HttpError";
import { validationResult } from "express-validator";

export const createProductVariant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		const productId = req.params.productId;
		const product = await Product.findById(productId);
		if (!product) {
			throw new HttpError(404, "Product not found");
		}

		const { attributes, price, inStock } = req.body;
		let images = [];
		if (req.files) {
			images = JSON.parse(JSON.stringify(req.files)).map(
				(file: Express.Multer.File) => file.path.replace(/\\/g, "/")
			);
		}

		const newVariant = {
			attributes: { ...attributes },
			price: price,
			inStock: inStock,
			images: images,
		};

		product.variants.push(newVariant);
		const updatedProduct = await product.save();

		res.status(201).json(updatedProduct);
	} catch (err) {
		next(err);
	}
};

export const deleteProductVariant = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const productId = req.params.productId;
		const variantId = req.params.variantId;

		const result = await Product.updateOne(
			{ _id: productId, "variants._id": variantId },
			{ $pull: { variants: { _id: variantId } } }
		);

		if (result.modifiedCount === 0) {
			throw new HttpError(404, "Product or variant not found");
		}

		res.status(201).json({
			message: "Product variant deleted successfully",
		});
	} catch (err) {
		next(err);
	}
};
