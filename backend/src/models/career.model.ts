import mongoose, { Document, Schema } from "mongoose";

// Interface for milestone
interface IMilestone {
  stage: string;
  description: string;
  estimated_time: string;
  dependencies: string;
}

// Interface for skill
interface ISkill {
  name: string;
  importance: string;
  level: "Foundational" | "Intermediate" | "Advanced" | string;
}

// Interface for course
interface ICourse {
  name: string;
  provider: string;
  cost: string;
  link: string;
}

// Interface for the roadmap document
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

// Define the roadmap schema
const roadmapSchema = new Schema<IRoadmapDocument>(
  {
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    milestones: [
      {
        stage: { type: String, required: true },
        description: { type: String, required: true },
        estimated_time: { type: String, required: true },
        dependencies: { type: String, required: true },
      },
    ],
    skills: [
      {
        name: { type: String, required: true },
        importance: { type: String, required: true },
        level: { 
          type: String, 
          required: true,
          enum: ["Foundational", "Intermediate", "Advanced", "Expert"]
        },
      },
    ],
    courses: [
      {
        name: { type: String, required: true },
        provider: { type: String, required: true },
        cost: { type: String, required: true },
        link: { type: String, required: true },
      },
    ],
    jobs: [{ type: String, required: true }],
    tips: [{ type: String, required: true }],
    userProfile: {
      skills: { type: String, required: true },
      experience: { type: String, required: true },
      careerGoal: { type: String, required: true },
    },
  },
  {
    timestamps: true, // This adds createdAt and updatedAt automatically
  }
);

// Index for faster queries
roadmapSchema.index({ userId: 1, createdAt: -1 });

// Export the model
export const CareerRoadmap = mongoose.model<IRoadmapDocument>("CareerRoadmap", roadmapSchema);