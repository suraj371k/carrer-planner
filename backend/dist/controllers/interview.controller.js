"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.submitAnswer = exports.startInterview = void 0;
exports.generateQuestions = generateQuestions;
exports.getAllTracks = getAllTracks;
exports.getUserSession = getUserSession;
exports.getALlSessions = getALlSessions;
const generative_ai_1 = require("@google/generative-ai");
const interview_model_1 = require("../models/interview.model");
const user_model_1 = require("../models/user.model");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
// Track-specific prompts
const TRACK_PROMPTS = {
    frontend: `Generate 20 frontend web development interview questions focusing on:
  - HTML/CSS fundamentals
  - JavaScript (ES6+)
  - React/Angular/Vue
  - Web performance
  - Accessibility
  Return JSON array with questions, 4 options each, and correct answer index.`,
    backend: `Generate 20 backend development interview questions focusing on:
  - Node.js/Express
  - Database design
  - API development
  - Authentication/Authorization
  - System design
  Return JSON array with questions, 4 options each, and correct answer index.`,
    fullstack: `Generate 20 full-stack development interview questions covering:
  - Frontend frameworks
  - Backend technologies
  - Database management
  - Deployment strategies
  - System architecture
  Return JSON array with questions, 4 options each, and correct answer index.`,
    devops: `Generate 20 DevOps interview questions focusing on:
  - CI/CD pipelines
  - Containerization (Docker)
  - Orchestration (Kubernetes)
  - Cloud platforms (AWS/GCP/Azure)
  - Infrastructure as Code
  Return JSON array with questions, 4 options each, and correct answer index.`,
};
const startInterview = async (req, res) => {
    try {
        const { track } = req.body;
        const userId = req.user?.id;
        const user = await user_model_1.User.findById(userId);
        if (!user) {
            return res
                .status(404)
                .json({ success: false, message: "User not found" });
        }
        if (!["frontend", "backend", "fullstack", "devops"].includes(track)) {
            return res.status(400).json({
                success: false,
                message: "Invalid track specified",
            });
        }
        const questions = await generateQuestions(track);
        //create new session
        const session = new interview_model_1.InterviewSession({
            userId,
            track,
            questions,
            startTime: new Date(),
            duration: 20 * 60 * 1000, // 20 min in ms
        });
        // Update user test count
        user.testsTakenToday += 1;
        await user.save();
        await session.save();
        res.status(201).json({
            success: true,
            sessionId: session._id,
            track: session.track,
            currentQuestion: session.questions[0],
            currentIdex: 0,
            totalQuestions: questions.length,
        });
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to start interview session",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.startInterview = startInterview;
const submitAnswer = async (req, res) => {
    try {
        const { sessionId, answerIndex } = req.body;
        const userId = req.user?.id;
        const session = await interview_model_1.InterviewSession.findOne({
            _id: sessionId,
            userId,
            completed: false,
        });
        if (!session) {
            return res.status(404).json({
                success: false,
                message: "Session not found or already completed",
            });
        }
        // Check if time is up
        const now = Date.now();
        const sessionStart = new Date(session.startTime).getTime();
        if (now - sessionStart >= session.duration) {
            session.completed = true;
            session.completedAt = new Date();
            await session.save();
            return res.status(200).json({
                success: false,
                message: "Time is up! Session ended.",
                completed: true,
                finalScore: session.score,
                totalQuestions: session.questions.length,
            });
        }
        // Get current question
        const currentQuestion = session.questions[session.currentQuestionIndex];
        // Validate answer index
        if (answerIndex < 0 || answerIndex > 3) {
            return res.status(400).json({
                success: false,
                message: "Invalid answer index (must be 0-3)",
            });
        }
        // Check if answer is correct
        const answerStr = answerIndex.toString();
        const isCorrect = currentQuestion?.correctAnswer === answerStr;
        // Update score (+4 for correct, -1 for wrong)
        const scoreChange = isCorrect ? 5 : -1;
        session.score += scoreChange;
        // Save the user's answer
        if (currentQuestion) {
            currentQuestion.userAnswer = answerStr;
            currentQuestion.isCorrect = isCorrect;
        }
        // Move to the next question or complete session
        if (session.currentQuestionIndex < session.questions.length - 1) {
            session.currentQuestionIndex += 1;
            await session.save();
            const nextQuestion = session.questions[session.currentQuestionIndex];
            return res.status(200).json({
                success: true,
                isCorrect,
                scoreChange,
                currentScore: session.score,
                nextQuestion,
                currentIndex: session.currentQuestionIndex,
                completed: false,
                timeRemaining: session.duration - (now - sessionStart), // ms left
            });
        }
        else {
            // Complete session
            session.completed = true;
            session.completedAt = new Date();
            await session.save();
            return res.status(200).json({
                success: true,
                isCorrect,
                scoreChange,
                currentScore: session.score,
                completed: true,
                finalScore: session.score,
                totalQuestions: session.questions.length,
            });
        }
    }
    catch (error) {
        res.status(500).json({
            success: false,
            message: "Failed to submit answer",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
};
exports.submitAnswer = submitAnswer;
async function generateQuestions(track) {
    const model = genAI.getGenerativeModel({
        model: "gemini-2.5-pro",
        generationConfig: {
            responseMimeType: "application/json",
        },
    });
    const prompt = `You are an expert technical interviewer. ${TRACK_PROMPTS[track]}
  
  Strictly follow these rules:
  1. Generate exactly 20 questions
  2. Each question must have 4 options
  3. Format must be perfect JSON
  4. correctAnswer must be the index (0-3)
  Only return JSON array as per format. Do not include any text before or after the JSON.

  Example format:
  [
    {
      "questionText": "Question here?",
      "options": ["A", "B", "C", "D"],
      "correctAnswer": "1"
    }
  ]`;
    try {
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // More robust cleaning of the response
        let cleanText = text.trim();
        // Remove markdown code blocks if present
        if (cleanText.startsWith("```json")) {
            cleanText = cleanText
                .replace(/^```json\s*/i, "")
                .replace(/```$/, "")
                .trim();
        }
        if (cleanText.endsWith("```")) {
            cleanText = cleanText.slice(0, -3);
        }
        cleanText = cleanText.trim();
        if (!cleanText || cleanText.length < 5) {
            throw new Error("Empty or too short AI response");
        }
        // Validate JSON structure
        const questions = JSON.parse(cleanText);
        if (!Array.isArray(questions) || questions.length !== 20) {
            throw new Error("Invalid number of questions generated");
        }
        // Validate each question
        questions.forEach((q, i) => {
            if (!q.questionText ||
                !q.options ||
                q.options.length !== 4 ||
                !q.correctAnswer) {
                throw new Error(`Invalid question format at index ${i}`);
            }
            if (isNaN(parseInt(q.correctAnswer)) ||
                parseInt(q.correctAnswer) < 0 ||
                parseInt(q.correctAnswer) > 3) {
                throw new Error(`Invalid correctAnswer at question ${i}`);
            }
        });
        // Add question IDs
        return questions.map((q, i) => ({
            ...q,
            questionId: `q_${Date.now()}_${i}`,
        }));
    }
    catch (error) {
        console.error("AI question generation failed:", error);
        throw new Error("Failed to generate valid questions. Please try again.");
    }
}
async function getAllTracks(req, res) {
    try {
        let tracks;
        if (req.query.from === "db") {
            //get only tracks that exist in database
            tracks = await interview_model_1.InterviewSession.distinct("track");
        }
        else {
            //get enum values from schema
            tracks = interview_model_1.InterviewSession.schema.path("track").enumValues;
        }
        res.status(200).json({
            success: true,
            data: tracks,
        });
    }
    catch (error) {
        console.error("Error fetching tracks:", error);
        res.status(500).json({
            success: false,
            message: "Failed to fetch tracks",
            error: error.message,
        });
    }
}
async function getUserSession(req, res) {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res
                .status(401)
                .json({ success: false, message: "Unauthorized: user not logged in" });
        }
        //fetch all sessions for this user
        const sessions = await interview_model_1.InterviewSession.find({ userId }).sort({
            startTime: -1,
        });
        //add correct and incorrect count per session
        const sessionWithStats = sessions.map((session) => {
            const correctCount = session.questions.filter((q) => q.isCorrect).length;
            const incorrectCount = session.questions.filter((q) => q.isCorrect === false).length;
            return {
                ...session.toObject(),
                correctCount,
                incorrectCount,
            };
        });
        return res.status(200).json({
            success: true,
            count: sessions.length,
            data: sessionWithStats,
        });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch user sessions",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
async function getALlSessions(req, res) {
    try {
        const sessions = await interview_model_1.InterviewSession.find();
        if (!sessions) {
            return res.status(404).json({ message: "No session found" });
        }
        return res
            .status(200)
            .json({ success: true, count: sessions.length, sessions });
    }
    catch (error) {
        return res.status(500).json({
            success: false,
            message: "Failed to fetch all sessions",
            error: error instanceof Error ? error.message : "Unknown error",
        });
    }
}
//# sourceMappingURL=interview.controller.js.map