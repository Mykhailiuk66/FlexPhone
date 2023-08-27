import express from "express";
import path from "path";
import cors from "cors";

import "./config/loadEnv";
import { connectToDB } from "./config/connectToDB";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/auth";
import productRouter from "./routes/products";
import cartRouter from "./routes/cart";
import checkoutRouter from "./routes/orders";
import { webhookCheckout } from "./controllers/orders";

const app = express();

connectToDB();

app.use(cors());

app.post(
	"/webhook-checkout",
	express.raw({ type: "application/json" }),
	webhookCheckout
);

app.use(express.json());

app.use("/images", express.static(path.join(__dirname, "images")));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);
app.use("/api/orders", checkoutRouter);

app.use(errorHandler);

const port = process.env.PORT || 8000;
app.listen(port, () => {
	console.log(`Express server is listening on port ${port}`);
});
