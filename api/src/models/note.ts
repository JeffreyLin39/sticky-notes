import mongoose from "mongoose";

const noteSchema = new mongoose.Schema({
	title: { type: String, required: true },
	value: { type: String, required: true },
});

export const Note = mongoose.model("Note", noteSchema);
