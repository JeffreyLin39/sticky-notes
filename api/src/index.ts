import express, { Express } from "express";
import morgan from "morgan";
import cors from "cors";
import mongoose from "mongoose";
const app: Express = express();
const port: number = 8080;
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
