import { Document } from "mongoose";
export interface IUser extends Document {
    name: string;
    email: string;
    password: string;
    skills: string;
    experience: string;
    careerGoal: "Frontend Developer" | "Full Stack Developer" | "Backend Developer" | "Data Scientist" | "AI Engineer" | "Cybersecurity Engineer" | "DevOps Engineer" | "UI/UX Designer" | string;
}
export declare const User: import("mongoose").Model<IUser, {}, {}, {}, Document<unknown, {}, IUser, {}, {}> & IUser & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>;
//# sourceMappingURL=user.model.d.ts.map