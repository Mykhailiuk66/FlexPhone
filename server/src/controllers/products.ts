import { NextFunction, Request, Response } from "express";
import { Product } from "../models/Product";
import HttpError from "../exeptions/HttpError";
import { validationResult } from "express-validator";

export const getProductsVariants = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const currentPage = parseInt(req.query.page as string) || 1;
		const { color, storage, ram, brand, minPrice, maxPrice } = req.query;

		const query: any = {};
		query["variants.inStock"] = { $gt: 0 };

		if (minPrice || maxPrice) {
			query["variants.price"] = {};
			if (minPrice) query["variants.price"]["$gte"] = Number(minPrice);
			if (maxPrice) query["variants.price"]["$lte"] = Number(maxPrice);
		}

		if (storage) {
			const storages = Array.isArray(storage) ? storage : [storage];
			query["variants.attributes.storage"] = { $in: storages };
		}
		if (ram) {
			const rams = Array.isArray(ram) ? ram : [ram];
			query["characteristics.RAM"] = { $in: rams };
		}
		if (brand) {
			const brands = Array.isArray(brand) ? brand : [brand];
			query["characteristics.Brand"] = { $in: brands };
		}

		const perPage = 12;
		const skip = (currentPage - 1) * perPage;
		const products = await Product.aggregate([
			{ $unwind: "$variants" },
			{ $match: query },
			{
				$project: {
					_id: 1,
					name: 1,
					description: 1,
					characteristics: 1,
					defaultImages: 1,
					variants: {
						$cond: {
							if: { $isArray: "$variants" },
							then: "$variants",
							else: ["$variants"],
						},
					},
					createdAt: 1,
					updatedAt: 1,
				},
			},
			{ $sort: { "variants.price": -1 } },
			{ $skip: skip },
			{ $limit: perPage },
		]);

		const countResult = await Product.aggregate([
			{ $unwind: "$variants" },
			{ $match: query },
			{ $count: "totalCount" },
		]);

		const totalProducts = countResult[0]?.totalCount || 0;
		const totalPages = Math.ceil(totalProducts / perPage);

		res.status(200).json({
			products,
			totalProducts,
			totalPages,
			currentPage,
		});
	} catch (err) {
		next(err);
	}
};

export const getAllProducts = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const products = await Product.find();
		res.status(200).json({ products });
	} catch (err) {
		next(err);
	}
};

export const getProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findById(productId);
		if (!product) {
			throw new HttpError(404, "Product not found");
		}

		res.status(200).json(product);
	} catch (err) {
		next(err);
	}
};

export const createProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const errors = validationResult(req);
		if (!errors.isEmpty()) {
			return res.status(422).json({ errors: errors.array() });
		}

		let defaultImages = [];
		if (req.files) {
			defaultImages = JSON.parse(JSON.stringify(req.files)).map(
				(file: Express.Multer.File) => file.path.replace(/\\/g, "/")
			);
		}

		const newProduct = new Product({
			name: req.body.name,
			description: req.body.description,
			characteristics: { ...req.body.characteristics },
			defaultImages: defaultImages,
		});

		const savedProduct = await newProduct.save();
		res.status(201).json(savedProduct);
	} catch (err) {
		next(err);
	}
};

export const updateProduct = async (
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
		let defaultImages = req.body.defaultImages || [];
		if (req.files) {
			defaultImages = JSON.parse(JSON.stringify(req.files)).map(
				(file: Express.Multer.File) => file.path.replace(/\\/g, "/")
			);
		}

		const product = await Product.findByIdAndUpdate(
			productId,
			{
				name: req.body.name,
				description: req.body.description,
				characteristics: { ...req.body.characteristics },
				defaultImages: defaultImages,
			},
			{ new: true }
		);

		if (!product) {
			throw new HttpError(404, "Product not found");
		}

		const updatedProduct = await product.save();
		res.status(200).json(updatedProduct);
	} catch (err) {
		next(err);
	}
};

export const deleteProduct = async (
	req: Request,
	res: Response,
	next: NextFunction
) => {
	try {
		const productId = req.params.productId;
		const product = await Product.findByIdAndDelete(productId);
		if (!product) {
			throw new HttpError(404, "Product not found");
		}
		res.status(200).json({ message: "Product deleted successfully" });
	} catch (err) {
		next(err);
	}
};
