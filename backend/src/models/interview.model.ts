import { Document, Model, Schema, model } from "mongoose";

export interface IQuestion {
  questionId: string;
  questionText: string;
  options: string[];
  correctAnswer: string;
  userAnswer?: string;

  isCorrect?: boolean;
}

export interface IInterviewSession extends Document {
  userId: Schema.Types.ObjectId;
  track: "frontend" | "backend" | "fullstack" | "devops";
  questions: IQuestion[];
  currentQuestionIndex: number;
  startTime: Date;
  duration: number;
  score: number;
  completed: boolean;
  createdAt: Date;
  completedAt?: Date;
}

const QuestionSchema = new Schema<IQuestion>({
  questionId: { type: String, required: true },
  questionText: { type: String, required: true },
  options: { type: [String], required: true },
  correctAnswer: { type: String, required: true },
  userAnswer: { type: String },
  isCorrect: { type: Boolean },
});

const InterviewSessionSchema = new Schema<IInterviewSession>({
  userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
  track: {
    type: String,
    required: true,
    enum: ["frontend", "backend", "fullstack", "devops"],
  },
  questions: { type: [QuestionSchema], required: true },
  currentQuestionIndex: { type: Number, default: 0 },
  score: { type: Number, default: 0 },
  completed: { type: Boolean, default: false },
  startTime: { type: Date, default: Date.now }, // Session starts immediately
  duration: { type: Number, default: 20 * 60 * 1000 }, // 20 minutes in ms

  createdAt: { type: Date, default: Date.now },
  completedAt: { type: Date },
});

export const InterviewSession: Model<IInterviewSession> =
  model<IInterviewSession>("InterviewSession", InterviewSessionSchema);
