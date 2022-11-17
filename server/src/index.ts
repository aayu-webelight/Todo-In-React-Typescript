import express, { Application, Request, Response } from "express";
import bodyParser from "body-parser";
import mongoose from "mongoose";
import cors from "cors";
import { config } from "dotenv";
import {todoRouter} from 'routes/todoRoute'


const app: Application = express();

config();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

app.use(cors({ origin: "http://localhost:3000" }))

app.use("/todo",todoRouter)

const PORT = process.env.PORT || 3002;

app.listen(PORT, () => {
  console.log(`Server is running on PORT ${PORT}`);
});

mongoose.connect(
  process.env.MONGODB as string,
  () => {
    console.log("connected to database");
  }
);
