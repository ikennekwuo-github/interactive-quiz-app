const mongoose = require('mongoose');

const questionSchema = new mongoose.Schema({
    question: String,
    answers: [String],
    correct: Number
});

const scoreSchema = new mongoose.Schema({
    user: String,
    score: Number
});

const Question = mongoose.model('Question', questionSchema);
const Score = mongoose.model('Score', scoreSchema);

module.exports = { Question, Score };