import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./database/connection";
import booksRouter from "./routes/books";
import recommendationsRouter from "./routes/recommendations";

const APP_PORT = process.env.APP_PORT || 5002;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const startServer = async () => {
  const db = await connectDb();
  app.set("db", db);
  app.use("/books", booksRouter);
  app.use("/recommendations", recommendationsRouter);
  app.listen(APP_PORT, () => {
    console.log(`Server started on http://localhost:${APP_PORT}`);
  });
};

startServer().catch((error) => console.error(error));
