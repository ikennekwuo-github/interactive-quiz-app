Interactive Quiz Application
Description

This is an interactive quiz application built with Node.js, Express, and MongoDB. It allows users to take a quiz, see their scores, and saves the results to a database.
Features

    Dynamic loading of questions from a MongoDB database
    Interactive user interface with immediate feedback on answers
    Score tracking and display at the end of the quiz
    Option to restart the quiz after completion
    Backend API for retrieving questions and submitting scores

Technologies Used

    Frontend: HTML, CSS, JavaScript
    Backend: Node.js, Express.js
    Database: MongoDB
    ODM: Mongoose

Prerequisites

    Node.js (v12 or higher)
    MongoDB Atlas account (or local MongoDB installation)

Installation
Clone the repository:

git clone https://github.com/ikennekwuo-github/interactive-quiz-app
Navigate to the project directory:

cd interactive-quiz-app

Install dependencies:

npm install express mongoose

Create a .env file in the root directory and add your MongoDB URI:

MONGODB_URI=your_mongodb_connection_string

Running the Application
Start the server:

node server.js

    Open a web browser and navigate to http://localhost:12000

Project Structure

projectquiz-main/
├── appquiz/
│   ├── public/
│   │   ├── index.html
│   │   ├── style.css
│   │   └── script.js
│   ├── models.js
│   ├── server.js
│   ├── populateDb.js
│   ├── .env
│   ├── package.json
│   └── package-lock.json
└── README.md

API Endpoints

    GET /api/questions: Retrieves all questions from the database
    POST /api/scores: Submits a user's score to the database

Future Enhancements

    User authentication
    Leaderboard functionality
    Multiple quiz categories
    Timed quizzes

Contributing
Contributions are welcome! Please feel free to submit a Pull Request.