import mongoose, { Document } from "mongoose";
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
declare const Resume: mongoose.Model<IResumeDocument, {}, {}, {}, mongoose.Document<unknown, {}, IResumeDocument, {}, {}> & IResumeDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export default Resume;
//# sourceMappingURL=resume.model.d.ts.map