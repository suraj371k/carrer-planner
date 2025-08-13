import { GoogleGenerativeAI } from "@google/generative-ai";
import { Request, Response } from "express";
import { InterviewSession, IQuestion } from "../models/interview.model";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

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

export const startInterview = async (req: Request, res: Response) => {
  try {
    const { track } = req.body;
    const userId = req.user?.id;

    if (!["frontend", "backend", "fullstack", "devops"].includes(track)) {
      return res.status(400).json({
        success: false,
        message: "Invalid track specified",
      });
    }

    const questions = await generateQuestions(track);

    //create new session
    const session = new InterviewSession({
      userId,
      track,
      questions,
    });

    await session.save();

    res.status(201).json({
      success: true,
      sessionId: session._id,
      track: session.track,
      currentQuestion: session.questions[0],
      currentIdex: 0,
      totalQuestions: questions.length,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to start interview session",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

export const submitAnswer = async (req: Request, res: Response) => {
  try {
    const { sessionId, answerIndex } = req.body;
    const userId = req.user?.id;

    const session = await InterviewSession.findOne({
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
    const scoreChange = isCorrect ? 4 : -1;
    session.score += scoreChange;

    // Update question with user's answer if currentQuestion exists
    if (currentQuestion) {
      currentQuestion.userAnswer = answerStr;
      currentQuestion.isCorrect = isCorrect;
    }

    //move to the next question or complete the session
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
      });
    } else {
      //complete session
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
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to submit answer",
      error: error instanceof Error ? error.message : "Unknown error",
    });
  }
};

async function generateQuestions(track: string): Promise<IQuestion[]> {
  const model = genAI.getGenerativeModel({ 
    model: "gemini-2.5-pro",
    generationConfig: {
      responseMimeType: "application/json",
    },
  });

  const prompt = `You are an expert technical interviewer. ${TRACK_PROMPTS[track as keyof typeof TRACK_PROMPTS]}
  
  Strictly follow these rules:
  1. Generate exactly 20 questions
  2. Each question must have 4 options
  3. Format must be perfect JSON
  4. correctAnswer must be the index (0-3)
  
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
    if (cleanText.startsWith('```json')) {
      cleanText = cleanText.slice(7);
    }
    if (cleanText.endsWith('```')) {
      cleanText = cleanText.slice(0, -3);
    }
    cleanText = cleanText.trim();

    // Validate JSON structure
    const questions: IQuestion[] = JSON.parse(cleanText);
    
    if (!Array.isArray(questions) || questions.length !== 20) {
      throw new Error('Invalid number of questions generated');
    }

    // Validate each question
    questions.forEach((q, i) => {
      if (!q.questionText || !q.options || q.options.length !== 4 || !q.correctAnswer) {
        throw new Error(`Invalid question format at index ${i}`);
      }
      if (isNaN(parseInt(q.correctAnswer)) || parseInt(q.correctAnswer) < 0 || parseInt(q.correctAnswer) > 3) {
        throw new Error(`Invalid correctAnswer at question ${i}`);
      }
    });

    // Add question IDs
    return questions.map((q, i) => ({
      ...q,
      questionId: `q_${Date.now()}_${i}`,
    }));
    
  } catch (error) {
    console.error("AI question generation failed:", error);
    throw new Error("Failed to generate valid questions. Please try again.");
  }
}
