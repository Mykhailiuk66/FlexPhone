import express from "express";
import path from "path";

import "./config/loadEnv";
import { connectToDB } from "./config/connectToDB";
import errorHandler from "./middleware/errorHandler";
import authRouter from "./routes/auth";
import productRouter from "./routes/products";
import cartRouter from "./routes/cart";

const app = express();

connectToDB();

app.use(express.json());

app.use("/images", express.static(path.join("images")));

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);
app.use("/api/cart", cartRouter);

app.use(errorHandler);

app.listen(process.env.PORT || 8000, () => {
	console.log(
		`Express server is listening on port ${"http://127.0.0.1:"}8000`
	);
});
