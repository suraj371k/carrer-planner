import mongoose, { Schema, Document, Model } from "mongoose";

// Transcript sub-document type
export interface ITranscript {
  question: string;
  answer: string;
  evaluation: string;
}

// Main Interview document type
export interface IInterview extends Document {
  userId: mongoose.Types.ObjectId;   // Reference to User
  type: "frontend" | "backend" | "react" | "javascript" | "behavioral" | "system-design";
  questions: string[];
  transcripts: ITranscript[];
  score?: number;
  status: "ongoing" | "completed";
  createdAt: Date;
  updatedAt: Date;
}

const TranscriptSchema = new Schema<ITranscript>(
  {
    question: { type: String, required: true },
    answer: { type: String, required: true },
    evaluation: { type: String, required: true },
  },
  { _id: false }
);

const InterviewSchema = new Schema<IInterview>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },

    type: {
      type: String,
      enum: ["frontend", "backend", "react", "javascript", "behavioral", "system-design"],
      required: true,
    },

    questions: [{ type: String, required: true }],
    transcripts: [TranscriptSchema],
    score: { type: Number },
    status: {
      type: String,
      enum: ["ongoing", "completed"],
      default: "ongoing",
    },
  },
  { timestamps: true }
);

export const Interview: Model<IInterview> =
  mongoose.models.Interview || mongoose.model<IInterview>("Interview", InterviewSchema);
