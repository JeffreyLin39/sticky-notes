import { Request, Response } from "express";
import { Account } from "../models/account";
import bcrypt from "bcrypt";

const router = require("express").Router();

router.post("/register", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw Error("Invalid or missing parameters...");
		}
		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		const user = new Account({ email, password: encryptedPassword, notes: [] });
		user
			.save()
			.then((response) => {
				res.status(200).json({
					status: 200,
					message: "Action accepted",
					data: { user: response },
				});
			})
			.catch((error: any | unknown) => {
				console.error(error);
				res.status(400).json({ status: 400, message: error.toString() });
			});
	} catch (error: any | unknown) {
		console.error(error);
		res.status(400).json({ status: 400, message: error.toString() });
	}
});

router.post("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw Error("Invalid or missing parameters...");
		}

		const user = await Account.findOne({ email });

		if (!user) {
			throw Error("Email or password incorrect...");
		}
		bcrypt
			.compare(password, user.password)
			.then((response) => {
				if (response) {
					res.status(200).json({
						status: 200,
						message: "Action accepted",
						data: { user },
					});
				} else {
					throw Error("Email or password incorrect...");
				}
			})
			.catch((error: any | unknown) => {
				console.error(error);
				res.status(400).json({ status: 400, message: error.toString() });
			});
	} catch (error: any | unknown) {
		console.error(error);
		res.status(400).json({ status: 400, message: error.toString() });
	}
});

module.exports = router;
