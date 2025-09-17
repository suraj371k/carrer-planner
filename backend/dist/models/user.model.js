"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.User = void 0;
const mongoose_1 = require("mongoose");
const UserSchema = new mongoose_1.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true, index: true },
    password: { type: String, required: true },
    skills: { type: String, default: "" },
    experience: { type: String, required: true },
    testsTakenToday: { type: Number, default: 0 },
    lastTestDate: { type: Date, default: null },
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
        required: true,
    },
}, { timestamps: true });
exports.User = (0, mongoose_1.model)("User", UserSchema);
//# sourceMappingURL=user.model.js.map