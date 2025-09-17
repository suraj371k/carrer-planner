"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getResumeAnalytics = exports.deleteResume = exports.getResumeById = exports.getUserResumes = exports.analyzeResume = exports.analyzeResumeWithGemini = void 0;
const generative_ai_1 = require("@google/generative-ai");
const mammoth_1 = __importDefault(require("mammoth"));
const pdf_parse_1 = __importDefault(require("pdf-parse"));
const cloudinary_1 = __importDefault(require("../utils/cloudinary"));
const resume_model_1 = __importDefault(require("../models/resume.model"));
const genAI = new generative_ai_1.GoogleGenerativeAI(process.env.GEMINI_API_KEY);
async function extractTextFromBuffer(fileBuffer, fileExtension) {
    try {
        switch (fileExtension.toLowerCase()) {
            case "pdf":
                const pdfData = await (0, pdf_parse_1.default)(fileBuffer);
                return pdfData.text;
            case "doc":
            case "docx":
                const docData = await mammoth_1.default.extractRawText({ buffer: fileBuffer });
                return docData.value;
            case "txt":
                return fileBuffer.toString("utf8");
            case "rtf":
                // For RTF files, you might need a different library
                // For now, we'll convert to string and try to extract text
                return fileBuffer.toString("utf8");
            default:
                throw new Error("Unsupported file format");
        }
    }
    catch (error) {
        throw new Error(`Error extracting text: ${error.message}`);
    }
}
// Analyze resume using Gemini AI
const analyzeResumeWithGemini = async (resumeText) => {
    try {
        const model = genAI.getGenerativeModel({ model: "gemini-2.0-flash-exp" });
        const prompt = `
    Analyze the following resume and provide detailed feedback in JSON format. Please evaluate:

    1. Overall score (0-100)
    2. Strengths (array of strings)
    3. Weaknesses (array of strings) 
    4. Specific improvements needed (array of strings)
    5. Keyword analysis (present keywords and missing important keywords)
    6. Section-wise analysis (contact info, summary, experience, education, skills) with scores and feedback
    7. Formatting feedback
    8. Specific recommendations for improvement

    Resume content:
    ${resumeText}

    Please respond with valid JSON in this exact format:
    {
      "overallScore": 85,
      "strengths": ["Strong technical skills", "Clear work experience"],
      "weaknesses": ["Missing professional summary", "Weak action verbs"],
      "improvements": ["Add quantified achievements", "Include relevant keywords"],
      "keywordAnalysis": {
        "present": ["JavaScript", "React", "Node.js"],
        "missing": ["MongoDB", "Express", "Leadership"]
      },
      "sections": {
        "contactInfo": {
          "score": 90,
          "feedback": "Complete contact information provided"
        },
        "summary": {
          "score": 60,
          "feedback": "Consider adding a professional summary"
        },
        "experience": {
          "score": 80,
          "feedback": "Good experience but needs more quantified results"
        },
        "education": {
          "score": 85,
          "feedback": "Education section is well formatted"
        },
        "skills": {
          "score": 75,
          "feedback": "Skills listed but could be better organized"
        }
      },
      "formatting": {
        "score": 70,
        "feedback": "Generally well formatted but could use better spacing"
      },
      "recommendations": [
        "Add metrics to quantify achievements",
        "Use stronger action verbs",
        "Include a professional summary"
      ]
    }
    `;
        const result = await model.generateContent(prompt);
        const response = await result.response;
        const text = response.text();
        // Clean up the response to extract JSON
        const jsonStart = text.indexOf("{");
        const jsonEnd = text.lastIndexOf("}") + 1;
        const jsonText = text.slice(jsonStart, jsonEnd);
        return JSON.parse(jsonText);
    }
    catch (error) {
        console.error("Gemini AI Error:", error);
        throw new Error(`AI analysis failed: ${error.message}`);
    }
};
exports.analyzeResumeWithGemini = analyzeResumeWithGemini;
const analyzeResume = async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const fileBuffer = req.file.buffer;
        const originalName = req.file.originalname;
        const fileExtension = req.file.originalname.split(".").pop()?.toLowerCase();
        if (!fileExtension) {
            return res.status(400).json({ error: "Invalid file extension" });
        }
        // Upload to Cloudinary
        const cloudinaryResult = await new Promise((resolve, reject) => {
            const stream = cloudinary_1.default.uploader.upload_stream({
                resource_type: "raw",
                folder: "resume_uploads",
                public_id: originalName.split(".")[0] + "-" + Date.now(),
            }, (error, result) => {
                if (error)
                    reject(error);
                else
                    resolve(result);
            });
            stream.end(fileBuffer);
        });
        // Extract text from file buffer
        console.log("Extracting text from file...");
        const resumeText = await extractTextFromBuffer(fileBuffer, fileExtension);
        if (!resumeText || resumeText.trim().length === 0) {
            return res.status(400).json({ error: "Could not extract text from the file" });
        }
        // Analyze resume using Gemini AI
        console.log("Analyzing resume with Gemini AI...");
        const analysis = await (0, exports.analyzeResumeWithGemini)(resumeText);
        // Save record to database
        const resumeRecord = new resume_model_1.default({
            userId,
            filename: originalName,
            originalText: resumeText,
            analysis: {
                overallScore: analysis.overallScore,
                strengths: analysis.strengths,
                weaknesses: analysis.weaknesses,
                improvements: analysis.improvements,
                keywordAnalysis: analysis.keywordAnalysis,
            },
            sections: analysis.sections,
            formatting: analysis.formatting,
            recommendations: analysis.recommendations,
            analyzeAt: new Date(),
        });
        await resumeRecord.save();
        res.json({
            success: true,
            message: "Resume analyzed successfully",
            resumeId: resumeRecord._id,
            fileUrl: cloudinaryResult.secure_url,
            analysis,
        });
    }
    catch (error) {
        console.error("Analysis error:", error);
        res.status(500).json({
            error: "Analysis failed",
            message: error.message,
        });
    }
};
exports.analyzeResume = analyzeResume;
// Get user's resume analysis history
const getUserResumes = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const resumes = await resume_model_1.default.find({ userId })
            .sort({ analyzeAt: -1 })
            .select('-originalText'); // Exclude the large text field
        res.json({
            success: true,
            resumes,
        });
    }
    catch (error) {
        console.error("Error fetching resumes:", error);
        res.status(500).json({
            error: "Failed to fetch resumes",
            message: error.message,
        });
    }
};
exports.getUserResumes = getUserResumes;
// Get specific resume analysis
const getResumeById = async (req, res) => {
    try {
        const userId = req.user?.id;
        const resumeId = req.params.id;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const resume = await resume_model_1.default.findOne({ _id: resumeId, userId });
        if (!resume) {
            return res.status(404).json({ error: "Resume not found" });
        }
        res.json({
            success: true,
            resume,
        });
    }
    catch (error) {
        console.error("Error fetching resume:", error);
        res.status(500).json({
            error: "Failed to fetch resume",
            message: error.message,
        });
    }
};
exports.getResumeById = getResumeById;
// Delete resume analysis
const deleteResume = async (req, res) => {
    try {
        const userId = req.user?.id;
        const resumeId = req.params.id;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const resume = await resume_model_1.default.findOneAndDelete({ _id: resumeId, userId });
        if (!resume) {
            return res.status(404).json({ error: "Resume not found" });
        }
        res.json({
            success: true,
            message: "Resume deleted successfully",
        });
    }
    catch (error) {
        console.error("Error deleting resume:", error);
        res.status(500).json({
            error: "Failed to delete resume",
            message: error.message,
        });
    }
};
exports.deleteResume = deleteResume;
// Get analytics/stats for user
const getResumeAnalytics = async (req, res) => {
    try {
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ error: "User not authenticated" });
        }
        const resumes = await resume_model_1.default.find({ userId });
        if (resumes.length === 0) {
            return res.json({
                success: true,
                data: {
                    totalAnalyses: 0,
                    averageScore: 0,
                    topStrengths: [],
                    commonWeaknesses: [],
                    improvementTrend: [],
                    sectionAverages: {
                        contactInfo: 0,
                        summary: 0,
                        experience: 0,
                        education: 0,
                        skills: 0,
                        formatting: 0
                    }
                }
            });
        }
        const totalAnalyses = resumes.length;
        const averageScore = resumes.reduce((sum, resume) => sum + (resume.analysis.overallScore || 0), 0) / totalAnalyses;
        // Get top strengths and weaknesses
        const allStrengths = resumes.flatMap(resume => resume.analysis.strengths || []);
        const allWeaknesses = resumes.flatMap(resume => resume.analysis.weaknesses || []);
        const strengthCounts = {};
        const weaknessCounts = {};
        allStrengths.forEach(strength => {
            strengthCounts[strength] = (strengthCounts[strength] || 0) + 1;
        });
        allWeaknesses.forEach(weakness => {
            weaknessCounts[weakness] = (weaknessCounts[weakness] || 0) + 1;
        });
        const topStrengths = Object.entries(strengthCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([strength, count]) => ({ strength, count }));
        const commonWeaknesses = Object.entries(weaknessCounts)
            .sort((a, b) => b[1] - a[1])
            .slice(0, 5)
            .map(([weakness, count]) => ({ weakness, count }));
        // Score improvement trend (last 10 analyses)
        const recentResumes = resumes
            .sort((a, b) => new Date(a.analyzeAt).getTime() - new Date(b.analyzeAt).getTime())
            .slice(-10);
        const improvementTrend = recentResumes.map(resume => ({
            date: resume.analyzeAt,
            score: resume.analysis.overallScore || 0
        }));
        // Calculate section averages
        const sectionAverages = {
            contactInfo: resumes.reduce((sum, resume) => sum + (resume.sections.contactInfo.score || 0), 0) / totalAnalyses,
            summary: resumes.reduce((sum, resume) => sum + (resume.sections.summary.score || 0), 0) / totalAnalyses,
            experience: resumes.reduce((sum, resume) => sum + (resume.sections.experience.score || 0), 0) / totalAnalyses,
            education: resumes.reduce((sum, resume) => sum + (resume.sections.education.score || 0), 0) / totalAnalyses,
            skills: resumes.reduce((sum, resume) => sum + (resume.sections.skills.score || 0), 0) / totalAnalyses,
            formatting: resumes.reduce((sum, resume) => sum + (resume.formatting.score || 0), 0) / totalAnalyses
        };
        // Round all averages to 2 decimal places
        Object.keys(sectionAverages).forEach(key => {
            sectionAverages[key] = Math.round(sectionAverages[key] * 100) / 100;
        });
        res.json({
            success: true,
            data: {
                totalAnalyses,
                averageScore: Math.round(averageScore * 100) / 100,
                topStrengths,
                commonWeaknesses,
                improvementTrend,
                sectionAverages
            }
        });
    }
    catch (error) {
        console.error("Error fetching analytics:", error);
        res.status(500).json({
            error: "Failed to fetch analytics",
            message: error.message
        });
    }
};
exports.getResumeAnalytics = getResumeAnalytics;
//# sourceMappingURL=resume.controller.js.map