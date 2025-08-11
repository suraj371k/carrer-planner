import { Schema, model, Document } from "mongoose";

export interface IUser extends Document {
  name: string;
  email: string;
  password: string;
  skills: string;
  experience: string;
  careerGoal:
    | "Frontend Developer"
    | "Full Stack Developer"
    | "Backend Developer"
    | "Data Scientist"
    | "AI Engineer"
    | "Cybersecurity Engineer"
    | "DevOps Engineer"
    | "UI/UX Designer"
    | string;
}

const UserSchema = new Schema<IUser>(
  {
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true  , index: true},
    password: { type: String, required: true },
    skills: { type: String, default:"" },
    experience: {type: String , required: true},
    careerGoal: {
      type: String,
      enum: [
        "Frontend Developer",
        "Full Stack Developer", 
        "Backend Developer",
        "Data Scientist",
        "AI Engineer",
        "Cybersecurity Engineer",
        "DevOps Engineer",
        "UI/UX Designer",
      ],
      required: true
    }
  },
  { timestamps: true }
);

export const User = model<IUser>("User", UserSchema);
