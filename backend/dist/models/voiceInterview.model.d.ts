import mongoose, { Document, Model } from "mongoose";
export interface ITranscript {
    question: string;
    answer: string;
    evaluation: string;
}
export interface IInterview extends Document {
    userId: mongoose.Types.ObjectId;
    type: "frontend" | "backend" | "react" | "javascript" | "behavioral" | "system-design";
    questions: string[];
    transcripts: ITranscript[];
    score?: number;
    status: "ongoing" | "completed";
    createdAt: Date;
    updatedAt: Date;
}
export declare const Interview: Model<IInterview>;
//# sourceMappingURL=voiceInterview.model.d.ts.map