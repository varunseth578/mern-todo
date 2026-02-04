const express = require("express");
const Todo = require("../models/todo");
const auth = require("../middle/auth");

const router = express.Router();

// GET ALL TODOS
router.get("/get_all", auth, async (req, res) => {
  const todos = await Todo.find({ user: req.userId });
  res.json({ todos });
});

// CREATE TODO
router.post("/create", auth, async (req, res) => {
  const { todo } = req.body;

  await Todo.create({
    title: todo,
    user: req.userId,
  });

  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
});

// COMPLETE TODO
router.post("/complete", auth, async (req, res) => {
  const { id } = req.body;

  const todo = await Todo.findById(id);
  todo.is_completed = !todo.is_completed;
  await todo.save();

  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
});

// DELETE TODO
router.post("/delete", auth, async (req, res) => {
  const { id } = req.body;

  await Todo.findByIdAndDelete(id);
  const todos = await Todo.find({ user: req.userId });
  res.json(todos);
});

module.exports = router;
