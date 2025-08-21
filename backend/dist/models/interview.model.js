"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InterviewSession = void 0;
const mongoose_1 = require("mongoose");
const QuestionSchema = new mongoose_1.Schema({
    questionId: { type: String, required: true },
    questionText: { type: String, required: true },
    options: { type: [String], required: true },
    correctAnswer: { type: String, required: true },
    userAnswer: { type: String },
    isCorrect: { type: Boolean },
});
const InterviewSessionSchema = new mongoose_1.Schema({
    userId: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
    track: {
        type: String,
        required: true,
        enum: ["frontend", "backend", "fullstack", "devops"],
    },
    questions: { type: [QuestionSchema], required: true },
    speechQuestions: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "SpeechQuestion" }],
    currentQuestionIndex: { type: Number, default: 0 },
    score: { type: Number, default: 0 },
    completed: { type: Boolean, default: false },
    startTime: { type: Date, default: Date.now }, // Session starts immediately
    duration: { type: Number, default: 20 * 60 * 1000 }, // 20 minutes in ms
    createdAt: { type: Date, default: Date.now },
    completedAt: { type: Date },
});
exports.InterviewSession = (0, mongoose_1.model)("InterviewSession", InterviewSessionSchema);
//# sourceMappingURL=interview.model.js.map