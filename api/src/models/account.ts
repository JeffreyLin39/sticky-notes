import mongoose from "mongoose";

const accountSchema = new mongoose.Schema({
	email: { type: String, required: true, unique: true },
	password: { type: String, required: true },
});

export const Account = mongoose.model("Account", accountSchema);
