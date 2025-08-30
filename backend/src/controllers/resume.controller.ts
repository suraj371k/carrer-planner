import { GoogleGenerativeAI } from "@google/generative-ai";
import fs from "fs";
import mammoth from "mammoth";
import pdf from "pdf-parse";
import { Request, Response } from "express";
import cloudinary from "../utils/cloudinary";
import Resume from "../models/resume.model";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

async function extractTextFromBuffer(
  fileBuffer: Buffer,
  fileExtension: string
) {
  try {
    switch (fileExtension.toLowerCase()) {
      case "pdf":
        const pdfData = await pdf(fileBuffer);
        return pdfData.text;

      case "doc":
      case "docx":
        const docData = await mammoth.extractRawText({ buffer: fileBuffer });
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
  } catch (error: any) {
    throw new Error(`Error extracting text: ${error.message}`);
  }
}

// Analyze resume using Gemini AI
export const analyzeResumeWithGemini = async (resumeText: string) => {
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
  } catch (error: any) {
    console.error("Gemini AI Error:", error);
    throw new Error(`AI analysis failed: ${error.message}`);
  }
};

export const uploadResume = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const userId = (req as any).user?.id;
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
    const cloudinaryResult = await new Promise<any>((resolve, reject) => {
      const stream = cloudinary.uploader.upload_stream(
        {
          resource_type: "raw",
          folder: "resume_uploads",
          public_id: originalName.split(".")[0] + "-" + Date.now(),
        },
        (error, result) => {
          if (error) reject(error);
          else resolve(result);
        }
      );
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
    const analysis = await analyzeResumeWithGemini(resumeText);

    // Save record to database
    const resumeRecord = new Resume({
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
  } catch (error: any) {
    console.error("Analysis error:", error);
    res.status(500).json({
      error: "Analysis failed",
      message: error.message,
    });
  }
};

// Get user's resume analysis history
export const getUserResumes = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const resumes = await Resume.find({ userId })
      .sort({ analyzeAt: -1 })
      .select('-originalText'); // Exclude the large text field

    res.json({
      success: true,
      resumes,
    });
  } catch (error: any) {
    console.error("Error fetching resumes:", error);
    res.status(500).json({
      error: "Failed to fetch resumes",
      message: error.message,
    });
  }
};

// Get specific resume analysis
export const getResumeById = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const resumeId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({
      success: true,
      resume,
    });
  } catch (error: any) {
    console.error("Error fetching resume:", error);
    res.status(500).json({
      error: "Failed to fetch resume",
      message: error.message,
    });
  }
};

// Delete resume analysis
export const deleteResume = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    const resumeId = req.params.id;

    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const resume = await Resume.findOneAndDelete({ _id: resumeId, userId });
    if (!resume) {
      return res.status(404).json({ error: "Resume not found" });
    }

    res.json({
      success: true,
      message: "Resume deleted successfully",
    });
  } catch (error: any) {
    console.error("Error deleting resume:", error);
    res.status(500).json({
      error: "Failed to delete resume",
      message: error.message,
    });
  }
};
  
// Get analytics/stats for user
export const getResumeAnalytics = async (req: Request, res: Response) => {
  try {
    const userId = (req as any).user?.id;
    if (!userId) {
      return res.status(401).json({ error: "User not authenticated" });
    }

    const resumes = await Resume.find({ userId });

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

    const strengthCounts: { [key: string]: number } = {};
    const weaknessCounts: { [key: string]: number } = {};

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
      sectionAverages[key as keyof typeof sectionAverages] = Math.round(sectionAverages[key as keyof typeof sectionAverages] * 100) / 100;
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

  } catch (error: any) {
    console.error("Error fetching analytics:", error);
    res.status(500).json({
      error: "Failed to fetch analytics",
      message: error.message
    });
  }
};
  