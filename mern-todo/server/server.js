const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const authRoutes = require("./routes/auth");
const todoRoutes = require("./routes/todo");

const app = express();
app.use(express.json());
app.use(cors());

mongoose.connect("mongodb://localhost:27017/test");

app.use("/", authRoutes);    
app.use("/", todoRoutes);      

app.listen(8080, () => {
  console.log("Server running on port 8080");
});
