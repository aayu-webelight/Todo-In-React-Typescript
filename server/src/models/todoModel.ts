import mongoose from "mongoose";
import { arrayBuffer } from "stream/consumers";

interface ITodo {
  task: string;
}

interface todoModelInterface extends mongoose.Model<TodoDoc> {
  build(attr: ITodo): TodoDoc;
}

interface TodoDoc extends mongoose.Document {
  task: string;
}

const todoSchema = new mongoose.Schema({
  task: {
    type: String,
    required: true,
  }
  
});

const Todo = mongoose.model<TodoDoc, todoModelInterface>("Todo", todoSchema);

export { Todo };
