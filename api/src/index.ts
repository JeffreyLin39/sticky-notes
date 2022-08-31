import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";

const authRoute = require("./routes/auth");
const noteRoute = require("./routes/note");

const app: Express = express();
const port: number = 8080;

dotenv.config();
const dbURI = process.env.DBURI!;

mongoose
	.connect(dbURI)
	.then(() => {
		console.log("Database connected...");
		app.listen(port, () => {
			console.log("Server started...");
		});
	})
	.catch((error: any | unknown) => {
		console.error(error);
	});

app.use(morgan("common"));
app.use(express.json());
app.use(cors({ origin: "*" }));

app.use("/api/v1/auth", authRoute);
app.use("/api/v1/note", noteRoute);
