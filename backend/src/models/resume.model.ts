import mongoose, { Schema, Document } from "mongoose";

export interface IResumeDocument extends Document {
  userId: mongoose.Types.ObjectId;
  filename: string;
  originalText: string;
  analysis: {
    overallScore: number;
    strengths: string[];
    weaknesses: string[];
    improvements: string[];
    keywordAnalysis: {
      present: string[];
      missing: string[];
    };
  };
  sections: {
    contactInfo: {
      score: number;
      feedback: string;
    };
    summary: {
      score: number;
      feedback: string;
    };
    experience: {
      score: number;
      feedback: string;
    };
    education: {
      score: number;
      feedback: string;
    };
    skills: {
      score: number;
      feedback: string;
    };
  };
  formatting: {
    score: number;
    feedback: string;
  };
  recommendations: string[];
  analyzeAt: Date;
}

const ResumeSchema: Schema = new Schema<IResumeDocument>(
  {
    userId: { type: Schema.Types.ObjectId, ref: "User", required: true },
    filename: { type: String, required: true },
    originalText: { type: String, required: true },
    analysis: {
      overallScore: { type: Number, required: true },
      strengths: [{ type: String }],
      weaknesses: [{ type: String }],
      improvements: [{ type: String }],
      keywordAnalysis: {
        present: [{ type: String }],
        missing: [{ type: String }],
      },
    },
    sections: {
      contactInfo: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
      summary: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
      experience: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
      education: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
      skills: {
        score: { type: Number, default: 0 },
        feedback: { type: String, default: "" },
      },
    },
    formatting: {
      score: { type: Number, default: 0 },
      feedback: { type: String, default: "" },
    },
    recommendations: [{ type: String }],
    analyzeAt: { type: Date, default: Date.now },
  },
  { timestamps: true }
);

const Resume = mongoose.model<IResumeDocument>("Resume", ResumeSchema);

export default Resume;
