import { Router } from "express";

import Product from "../models/Product";

const router = Router();

router.get("/", async (req, res) => {
	const products = await Product.find({});
	res.status(200).json(products);
});

router.post("/", async (req, res) => {
  console.log(req.body);
	const newProduct = new Product(req.body);
	const savedProduct = await newProduct.save();
	res.status(200).json(savedProduct);
});

export default router;
