require("dotenv").config();
const mongoose = require("mongoose");
const { Question } = require("./models");

const MONGODB_URI = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_URI, {
    serverSelectionTimeoutMS: 5000,
    connectTimeoutMS: 10000,
  })
  .then(() => console.log("Connected to MongoDB Atlas"))
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
    process.exit(1);
  });

const sampleQuestions = [
  {
    question: "What is the capital of France?",
    answers: ["London", "Berlin", "Paris", "Madrid"],
    correct: 2,
  },
  {
    question: "Which planet is known as the Red Planet?",
    answers: ["Mars", "Jupiter", "Venus", "Saturn"],
    correct: 0,
  },
  {
    question: "Who painted the Mona Lisa?",
    answers: [
      "Vincent van Gogh",
      "Leonardo da Vinci",
      "Pablo Picasso",
      "Michelangelo",
    ],
    correct: 1,
  },
  {
    question: "What is the largest ocean on Earth?",
    answers: [
      "Atlantic Ocean",
      "Indian Ocean",
      "Arctic Ocean",
      "Pacific Ocean",
    ],
    correct: 3,
  },
  {
    question: "In what year did World War II end?",
    answers: ["1943", "1945", "1947", "1950"],
    correct: 1,
  },
];

async function populateDb() {
  try {
    console.log("Starting database operations...");
    console.log("Clearing existing questions...");
    await Question.deleteMany({});
    console.log("Existing questions cleared. Adding new questions...");
    const result = await Question.insertMany(sampleQuestions);
    console.log(`${result.length} questions have been added to the database.`);
  } catch (error) {
    console.error("Error populating database:", error);
  } finally {
    console.log("Closing database connection...");
    await mongoose.connection.close();
    console.log("Database connection closed.");
  }
}

mongoose.connection.on("connected", () => {
  console.log("Mongoose connected to db");
  populateDb();
});

// Add this to ensure the script doesn't exit prematurely
process.on("exit", (code) => {
  console.log(`About to exit with code: ${code}`);
});
