import mongoose, { Document } from "mongoose";
interface IMilestone {
    stage: string;
    description: string;
    estimated_time: string;
    dependencies: string;
}
interface ISkill {
    name: string;
    importance: string;
    level: "Foundational" | "Intermediate" | "Advanced" | string;
}
interface ICourse {
    name: string;
    provider: string;
    cost: string;
    link: string;
}
interface IRoadmapDocument extends Document {
    userId: mongoose.Types.ObjectId;
    milestones: IMilestone[];
    skills: ISkill[];
    courses: ICourse[];
    jobs: string[];
    tips: string[];
    userProfile: {
        skills: string;
        experience: string;
        careerGoal: string;
    };
    createdAt: Date;
    updatedAt: Date;
}
export declare const CareerRoadmap: mongoose.Model<IRoadmapDocument, {}, {}, {}, mongoose.Document<unknown, {}, IRoadmapDocument, {}, {}> & IRoadmapDocument & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
export {};
//# sourceMappingURL=career.model.d.ts.map