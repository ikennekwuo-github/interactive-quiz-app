const mongoose = require('mongoose');
const Quiz = require('./models');
require('dotenv').config();

const MONGODB_URI = process.env.MONGODB_URI;

if (!MONGODB_URI) {
    console.error('Error: MONGODB_URI is not defined in the environment variables.');
    process.exit(1);
}

mongoose.connect(MONGODB_URI, { useNewUrlParser: true, useUnifiedTopology: true })
    .then(() => {
        console.log('Connected to MongoDB');
        return populateDatabase();
    })
    .catch(err => {
        console.error('Error connecting to MongoDB:', err);
        process.exit(1);
    });

async function populateDatabase() {
    try {
        const quiz = new Quiz({
            title: 'Sample Quiz',
            description: 'This is a sample quiz',
            questions: [
                {
                    questionText: 'What is the capital of France?',
                    options: [
                        { optionText: 'Paris', isCorrect: true },
                        { optionText: 'London', isCorrect: false },
                        { optionText: 'Berlin', isCorrect: false },
                        { optionText: 'Madrid', isCorrect: false }
                    ]
                }
            ]
        });

        await quiz.save();
        console.log('Database populated successfully');
    } catch (err) {
        console.error('Error populating database:', err);
    } finally {
        mongoose.connection.close();
    }
}