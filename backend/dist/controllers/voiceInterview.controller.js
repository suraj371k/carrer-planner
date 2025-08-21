"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.finishVoiceInterview = exports.vapiWebhook = exports.startVoiceInterview = void 0;
const generative_ai_1 = require("@google/generative-ai");
const voiceInterview_model_1 = require("../models/voiceInterview.model");
const user_model_1 = require("../models/user.model");
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
const startVoiceInterview = async (req, res) => {
    try {
        const userId = req.user?.id;
        const { type } = req.body;
        if (!userId) {
            return res
                .status(404)
                .json({ success: false, message: "user not found" });
        }
        const user = await user_model_1.User.findById(userId);
        // Use Gemini to generate questions
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const prompt = `
      Generate 5 ${type} interview questions for a candidate.
      Candidate profile:
      - careerGoal: ${user?.careerGoal || "Not specified"}
      - Skills: ${user?.skills || "Not specified"}
      - Experience: ${user?.experience || "Not specified"} years
      Format questions as plain numbered list.
    `;
        const result = await model.generateContent(prompt);
        const questions = result.response
            .text()
            .split("\n")
            .filter((q) => q.trim());
        const interview = await voiceInterview_model_1.Interview.create({
            userId,
            type,
            questions,
        });
        res.json({ interviewId: interview._id, questions });
    }
    catch (error) {
        console.error(error);
        res.status(500).json({ error: "Failed to start interview" });
    }
};
exports.startVoiceInterview = startVoiceInterview;
const vapiWebhook = async (req, res) => {
    try {
        const { interviewId, question, answer } = req.body;
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const evalPrompt = `
      Interview Question: ${question}
      Candidate Answer: ${answer}
      Evaluate in detail:
      1. Correctness
      2. Clarity
      3. Missing points
      Give rating 1-10.
    `;
        const evaluation = await model.generateContent(evalPrompt);
        const evalText = evaluation.response.text();
        // Save transcript to DB
        await voiceInterview_model_1.Interview.findByIdAndUpdate(interviewId, {
            $push: { transcripts: { question, answer, evaluation: evalText } },
        });
        // Send reply back to Vapi → Vapi will speak this
        res.json({ reply: evalText });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to evaluate answer" });
    }
};
exports.vapiWebhook = vapiWebhook;
const finishVoiceInterview = async (req, res) => {
    try {
        const { interviewId } = req.body;
        const interview = await voiceInterview_model_1.Interview.findById(interviewId);
        if (!interview)
            return res.status(404).json({ error: "Interview not found" });
        const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });
        const reportPrompt = `
      Here are the interview Q&A and evaluations:
      ${JSON.stringify(interview.transcripts, null, 2)}
      Create a final report with:
      - Strengths
      - Weaknesses
      - Role fit
      - Final score (0-100).
    `;
        const report = await model.generateContent(reportPrompt);
        const reportText = report.response.text();
        // Extract score from text if present
        const scoreMatch = reportText.match(/\b\d{1,3}\b/);
        const score = scoreMatch ? parseInt(scoreMatch[0]) : 0;
        interview.status = "completed";
        interview.score = score;
        await interview.save();
        res.json({ report: reportText, score });
    }
    catch (err) {
        console.error(err);
        res.status(500).json({ error: "Failed to finish interview" });
    }
};
exports.finishVoiceInterview = finishVoiceInterview;
//# sourceMappingURL=voiceInterview.controller.js.map