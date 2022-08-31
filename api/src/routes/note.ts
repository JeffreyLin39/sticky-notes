import express, { Request, Response } from "express";
import { Note } from "../models/note";
import { Account } from "../models/account";

express.Router().post("/createNote/:uid", (req: Request, res: Response) => {
	try {
		const { title } = req.body;
		const { uid } = req.params;
		if (!title || !uid) {
			throw Error("Invalid or missing parameters...");
		}
		const note = new Note({ title, value: "" });
		note
			.save()
			.then((response) =>
				Account.updateOne(
					{ _id: uid },
					{ $push: { notes: { id: response._id, title } } }
				)
			)
			.catch((error: any | unknown) => {
				console.error(error);
				res.status(400).json({ status: 400, message: error.toString() });
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

express.Router().put("/updateNote/:uid/:id", (req: Request, res: Response) => {
	try {
		const { title, value } = req.body;
		const { uid, id } = req.params;
		if (!uid || !id || !(title || value)) {
			throw Error("Invalid or missing parameters...");
		}
		const note = new Note({ title, value: "" });
		note
			.save()
			.then((response) =>
				Account.updateOne(
					{ _id: uid },
					{ $push: { notes: { id: response._id, title } } }
				)
			)
			.catch((error: any | unknown) => {
				console.error(error);
				res.status(400).json({ status: 400, message: error.toString() });
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
express.Router().get("/getNote:id", (req: Request, res: Response) => {});
express.Router().delete("/deleteNote", (req: Request, res: Response) => {});
