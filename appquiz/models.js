const mongoose = require('mongoose');
const {Schema} = mongoose;

const quizSchema = new Schema({
    title: {
        type: String,
        required: [true, 'Title is required'],
        trim: true,
        minlength: [3, 'Title must be at least 3 characters long']
    },
    description: {
        type: String,
        default: 'No description provided',
        trim: true
    },
    questions: [{
        questionText: {
            type: String,
            required: [true, 'Question text is required'],
            trim: true,
        },
        options: [{
            optionText: {
                type: String,
                required: [true, 'Option text is required'],
                trim: true
            },
            isCorrect: {
                type: Boolean,
                default: false
            }
        }],
        required: [true, 'At least one question is required']
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

const Quiz = mongoose.model('Quiz', quizSchema);
module.exports = Quiz;