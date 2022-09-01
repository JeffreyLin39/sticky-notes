import { Request, response, Response } from "express";
import { Note } from "../models/note";
import { Account } from "../models/account";

const router = require("express").Router();

router.post("/createNote/:uid", (req: Request, res: Response) => {
	try {
		const { title } = req.body;
		const { uid } = req.params;
		if (!title || !uid) {
			throw Error("Invalid or missing parameters...");
		}
		const note = new Note({ title, value: "" });
		let id: string;
		note
			.save()
			.then((response) => {
				id = response._id.toString();
				return Account.updateOne(
					{ _id: uid },
					{ $push: { notes: { id: response._id.toString(), title } } }
				);
			})
			.then(() => {
				res.status(200).json({
					status: 200,
					message: "Action accepted",
					data: { id },
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

router.put("/updateNote/:uid/:id", (req: Request, res: Response) => {
	try {
		const { title, value } = req.body;
		const { uid, id } = req.params;
		if (!uid || !id || !(title || value)) {
			throw Error("Invalid or missing parameters...");
		}

		Note.updateOne({ _id: id }, { $set: { title, value } })
			.then(() =>
				Account.updateOne(
					{ _id: uid, "notes.id": id },
					{ $set: { "notes.$.title": title, "notes.$.value": value } }
				)
			)
			.then(() => {
				res.status(200).json({
					status: 200,
					message: "Action accepted",
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

router.get("/getNote/:id", (req: Request, res: Response) => {
	try {
		const { id } = req.params;
		if (!id) {
			throw Error("Invalid or missing parameters...");
		}

		Note.find({ _id: id })
			.then((response) => {
				res.status(200).json({
					status: 200,
					message: "Action accepted",
					data: response,
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

router.delete("/deleteNote/:uid/:id", (req: Request, res: Response) => {
	try {
		const { uid, id } = req.params;
		if (!uid || !id) {
			throw Error("Invalid or missing parameters...");
		}

		Note.deleteOne({ _id: id })
			.then(() => {
				return Account.updateOne({ _id: uid }, { $pull: { notes: { id } } });
			})
			.then(() => {
				res.status(200).json({
					status: 200,
					message: "Action accepted",
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

module.exports = router;
