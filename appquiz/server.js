const express = require("express");
const mongoose = require("mongoose");
const app = express();
const PORT = 12000;

// Make sure you've set up your .env file with the MONGODB_URI
require("dotenv").config();

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI)
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => console.error("Error connecting to MongoDB Atlas:", err));

app.use(express.json());
app.use(express.static("public"));

const { Question, Score } = require("./models");

app.get("/api/questions", async (req, res) => {
  try {
    const questions = await Question.find();
    res.json(questions);
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.post("/api/scores", async (req, res) => {
  try {
    const score = new Score(req.body);
    await score.save();
    res.status(201).send();
  } catch (error) {
    res.status(500).send(error.message);
  }
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
