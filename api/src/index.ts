import './types/express';
import express from "express";
import cors from "cors";
import bodyParser from "body-parser";
import { connectDb } from "./database/connection";
import bookRouter from "./routes/book";
import libraryRouter from "./routes/library";
import type { Request, Response } from "express";

const APP_PORT = process.env.APP_PORT || 5002;

const app = express();

app.use(cors());
app.use(bodyParser.json());

const startServer = async () => {
  const db = await connectDb();
  app.use((req: Request, _res: Response, next) => {
    req.db = db;
    next();
  });
  app.use("/book", bookRouter);
  app.use("/library", libraryRouter);
  app.listen(APP_PORT, () => {
    console.log(`Server started on http://localhost:${APP_PORT}`);
  });
};

startServer().catch((error) => console.error(error));
