import express, { Request, Response } from "express";
import { Todo } from "models/todoModel";

const router = express.Router();

router.get("/getall", async (req: Request, res: Response) => {
  const todo = await Todo.find({});
  return res.status(200).json(todo);
});

router.post("/add", async (req: Request, res: Response) => {
  const todo = await Todo.create(req.body);
  return res.status(201).send(todo);
});

router.delete("/delete", async (req: Request, res: Response) => {
  const todo = await Todo.find({ _id: req.headers.id });
  if (todo) {
    try {
      const response = await Todo.deleteOne({ _id: req.headers.id });
      return res.status(201).send(response);
    } catch (error) {
      return res.status(400).send(error);
    }
  }
  return res.status(400).send("Bad Request");
});

export { router as todoRouter };
