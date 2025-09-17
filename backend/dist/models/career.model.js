"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || (function () {
    var ownKeys = function(o) {
        ownKeys = Object.getOwnPropertyNames || function (o) {
            var ar = [];
            for (var k in o) if (Object.prototype.hasOwnProperty.call(o, k)) ar[ar.length] = k;
            return ar;
        };
        return ownKeys(o);
    };
    return function (mod) {
        if (mod && mod.__esModule) return mod;
        var result = {};
        if (mod != null) for (var k = ownKeys(mod), i = 0; i < k.length; i++) if (k[i] !== "default") __createBinding(result, mod, k[i]);
        __setModuleDefault(result, mod);
        return result;
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
exports.CareerRoadmap = void 0;
const mongoose_1 = __importStar(require("mongoose"));
// Define the roadmap schema
const roadmapSchema = new mongoose_1.Schema({
    userId: {
        type: mongoose_1.default.Schema.Types.ObjectId,
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
}, {
    timestamps: true, // This adds createdAt and updatedAt automatically
});
// Index for faster queries
roadmapSchema.index({ userId: 1, createdAt: -1 });
// Export the model
exports.CareerRoadmap = mongoose_1.default.model("CareerRoadmap", roadmapSchema);
//# sourceMappingURL=career.model.js.map