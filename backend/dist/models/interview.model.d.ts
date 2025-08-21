import { Document, Model, Schema } from "mongoose";
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
    speechQuestions: Schema.Types.ObjectId[];
    currentQuestionIndex: number;
    startTime: Date;
    duration: number;
    score: number;
    completed: boolean;
    createdAt: Date;
    completedAt?: Date;
}
export declare const InterviewSession: Model<IInterviewSession>;
//# sourceMappingURL=interview.model.d.ts.map