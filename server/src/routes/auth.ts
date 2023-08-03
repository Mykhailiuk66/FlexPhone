import { body } from "express-validator";

import { Router } from "express";
import * as authController from "../controllers/auth";
import User from "../models/User";

const router = Router();

router.post(
	"/register",
	[
		body("firstName")
			.trim()
			.isLength({ min: 2, max: 30 })
			.isAlpha()
			.withMessage(
				"First name must be between 2 and 30 characters and only contain letters"
			),
		body("lastName")
			.trim()
			.isLength({ min: 2, max: 30 })
			.isAlpha()
			.withMessage(
				"Last name must be between 2 and 30 characters and only contain letters"
			),
		body("email")
			.trim()
			.toLowerCase()
			.isEmail()
			.withMessage("Please enter a valid email address")
			.custom(async (email) => {
				const existingUser = await User.findOne({ email });

				if (existingUser) {
					throw new Error("Email already in use");
				}
			}),
		body("password")
			.trim()
			.isStrongPassword({
				minLength: 8,
				minUppercase: 1,
				minNumbers: 1,
				minSymbols: 0,
			})
			.withMessage(
				"Password must be at least 8 characters long and contain at least one uppercase letter, one number"
			),
	],
	authController.register
);

router.post("/login", authController.login);

export default router;
