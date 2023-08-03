import express from "express";

import "./config/loadEnv";
import { connectToDB } from "./config/connectToDB";
import authRouter from "./routes/auth";
import productRouter from "./routes/products";

const app = express();

connectToDB();

app.use(express.json());

app.use("/api/auth", authRouter);
app.use("/api/products", productRouter);

app.listen(process.env.PORT || 8000, () => {
	console.log(
		`Express server is listening on port ${"http://127.0.0.1:"}8000`
	);
});
