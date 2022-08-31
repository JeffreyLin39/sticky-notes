import express, { Request, Response } from "express";
import { Account } from "../models/account";
import bcrypt from "bcrypt";

express.Router().post("/register", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw Error("Invalid or missing parameters...");
		}
		const salt = await bcrypt.genSalt(10);
		const encryptedPassword = await bcrypt.hash(password, salt);

		const user = new Account({ email, encryptedPassword, notes: [] });
		user
			.save()
			.then((response) => {
				res.status(200).json({
					status: 200,
					message: "Action accepted",
					data: { id: response._id.toString() },
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

express.Router().put("/login", async (req: Request, res: Response) => {
	try {
		const { email, password } = req.body;
		if (!email || !password) {
			throw Error("Invalid or missing parameters...");
		}

		let accountUser: any;

		Account.findOne({ email })
			.then((user) => {
				if (user) {
					accountUser = user;
					return bcrypt.compare(user.password, password);
				} else {
					throw Error("Email or password incorrect...");
				}
			})
			.catch((error: any | unknown) => {
				console.error(error);
				res.status(400).json({ status: 400, message: error.toString() });
			})
			.then((response) => {
				if (response && accountUser) {
					res.status(200).json({
						status: 200,
						message: "Action accepted",
						data: { user: accountUser },
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

module.exports = express.Router();
