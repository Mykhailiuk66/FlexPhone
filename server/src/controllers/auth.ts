import { Request, Response } from "express";
import { validationResult } from "express-validator";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

import User from "../models/User";

export const register = async (req: Request, res: Response) => {
	const errors = validationResult(req);
	if (!errors.isEmpty()) {
		return res.status(422).json({ errors: errors.array() });
	}

	try {
		const salt = await bcrypt.genSalt(10);
		const hashedPassword = await bcrypt.hash(req.body.password, salt);
		const newUser = new User({
			firstName: req.body.firstName,
			lastName: req.body.lastName,
			email: req.body.email,
			password: hashedPassword,
		});

		const savedUser = await newUser.save();
		res.status(201).json(savedUser);
	} catch (err) {
		res.status(500).json(err);
	}
};

export const login = async (req: Request, res: Response) => {
	try {
		const user = await User.findOne({ email: req.body.email });
		if (!user) return res.status(404).json("User not found!");

		const validPassword = await bcrypt.compare(
			req.body.password,
			user.password
		);
		if (!validPassword) return res.status(401).json("Wrong password!");

		jwt.sign(
			{
				id: user._id.toString(),
				isAdmin: user.isAdmin,
			},
			process.env.JWT_SECRET!,
			{ expiresIn: "3d" },
			(err, token) => {
				if (err) throw err;
				return res.status(200).json({ token });
			}
		);
	} catch (err) {
		res.status(500).json(err);
	}
};
