const express = require("express");
const mongoose = require("mongoose");
const CORS = require("cors");

const app = express();
app.use(express.json());
app.use(CORS());

app.listen(8080, () => {
  console.log("Server started on port 8080");
});

mongoose.connect("mongodb://localhost:27017/test");

const todoSchema = new mongoose.Schema({
  title: String,
  is_completed: {
    type: Boolean,
    default: false,
  },
});

const Todo = mongoose.model("Todo", todoSchema);

app.get("/get_all", async (req, res) => {
  const todos = await Todo.find();
  return res.json({ todos });
});

app.post("/complete", async (req, res) => {
  const { id } = req.body;

  const todo = await Todo.findById(id);
  todo.is_completed = !todo.is_completed;
  await todo.save();

  const todos = await Todo.find();
  res.json(todos);
});

app.post("/create", async (req, res) => {
  const { todo } = req.body;
  await Todo.create({ title: todo });
  const todos = await Todo.find();
  res.json(todos);
});

app.post("/delete", async (req, res) => {
  const { id } = req.body;
  await Todo.findByIdAndDelete(id);
  const todos = await Todo.find();
  res.json(todos);
});
