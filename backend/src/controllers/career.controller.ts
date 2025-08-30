import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";
import { User } from "../models/user.model";
import { CareerRoadmap } from "../models/career.model"; 

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

// Interface for the expected response structure
interface CareerRoadmap {
  roadmap: {
    milestones: {
      stage: string;
      description: string;
      estimated_time: string;
      dependencies: string;
    }[];
    skills: {
      name: string;
      importance: string;
      level: "Foundational" | "Intermediate" | "Advanced" | string;
    }[];
    courses: {
      name: string;
      provider: string;
      cost: string;
      link: string;
    }[];
    jobs: string[];
    tips: string[];
  };
}

export const generateCareerPath = async (req: Request, res: Response) => {
  try {
    // Get logged in user ID from middleware
    const userId = req?.user?.id;
 
    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    // Fetch user profile from db
    const user = await User.findById(userId).select("skills experience careerGoal interest");
    if (!user) {
      return res.status(404).json({ success: true, message: "User not found" });
    }

    const { skills, experience, careerGoal } = user;

    if (!skills || !experience || !careerGoal) {
      return res.status(400).json({ 
        success: false,
        message: "User profile is incomplete. Please provide skills, experience, and career goals."
      });
    }

    // Check if user already has a recent roadmap (optional - you can skip this)
    const existingRoadmap = await CareerRoadmap.findOne({ userId })
      .sort({ createdAt: -1 });

    // If you want to prevent generating multiple roadmaps within a certain timeframe
    if (existingRoadmap) {
      const hoursDiff = (Date.now() - existingRoadmap.createdAt.getTime()) / (1000 * 60 * 60);
      if (hoursDiff < 24) { // Allow new roadmap only after 24 hours
        return res.status(200).json({
          success: true,
          message: "Using existing career roadmap",
          roadmap: {
            milestones: existingRoadmap.milestones,
            skills: existingRoadmap.skills,
            courses: existingRoadmap.courses,
            jobs: existingRoadmap.jobs,
            tips: existingRoadmap.tips,
          }
        });
      }
    }

    const prompt = `
You are an experienced career coach and professional mentor with deep knowledge of global job markets, skills demand trends, and learning resources.

Based on the following user details:
- Current Skills: ${skills}
- Years of Experience: ${experience}
- Career Goal / Target Role: ${careerGoal}

Create a comprehensive, realistic career roadmap with the following requirements:

1. MILESTONES (4-6 stages)
   - Format each as: "Stage [X]: [Descriptive Title]"
   - list skills topics and subtopics like ex-hooks topic ,  usestate , useCallback hook etc.
   - Estimated time format: "[X-Y] Months" or "[First X months in role]"
   - Dependencies should list prerequisites clearly

2. SKILLS (8-12 skills)
   - Mix of technical and soft skills
   - Importance should be critical , high and medium in one words
   - Levels: Foundational, Intermediate, or Advanced
   - For technical skills, mention specific technologies/languages

3. COURSES (4-6 recommendations)
   - Include both free and paid options
   - Providers: Coursera, Udemy, edX, Pluralsight, official docs, etc.
   - Cost format: "Free" or "Paid (~$X)" 
   - Include direct links when possible

4. JOB TITLES (5-8 positions)
   - Progressive titles from entry-level to target role
   - Include common variations for the same role

5. TIPS (6-8 actionable items)
   - Focus on practical, specific advice
   - Include portfolio, networking, interview prep, etc.
   - Use markdown bold (**) for key phrases

OUTPUT REQUIREMENTS:
- Return STRICT JSON only (no markdown, no extra text)
- Use exactly this structure:
{
  "roadmap": {
    "milestones": [
      {
        "stage": "Stage 1: [Title]",
        "description": "[Detailed description]",
        "estimated_time": "[Timeframe]",
        "dependencies": "[Prerequisites]"
      }
    ],
    "skills": [
      {
        "name": "[Skill Name]",
        "importance": "[Why it matters]",
        "level": "Foundational/Intermediate/Advanced"
      }
    ],
    "courses": [
      {
        "name": "[Course Name]",
        "provider": "[Provider]",
        "cost": "Free/Paid",
        "link": "[URL]"
      }
    ],
    "jobs": ["Job Title 1", "Job Title 2"],
    "tips": [
      "**Actionable tip** with details",
      "Another **specific suggestion**"
    ]
  }
}

EXAMPLE STRUCTURE (for reference only):
{
  "roadmap": {
    "milestones": [
      {
        "stage": "Stage 1: Solidify Foundations",
        "description": "Begin with...",
        "estimated_time": "0-3 Months",
        "dependencies": "Basic programming knowledge"
      }
    ],
    "skills": [
      {
        "name": "Python Programming",
        "importance": "Essential for data analysis...",
        "level": "Foundational"
      }
    ],
    "courses": [
      {
        "name": "Python for Beginners",
        "provider": "Coursera",
        "cost": "Free",
        "link": "https://example.com"
      }
    ],
    "jobs": ["Junior Developer", "Software Engineer"],
    "tips": [
      "**Build a portfolio** with at least 3 projects",
      "**Network actively** on LinkedIn with professionals"
    ]
  }
}
`;

    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ 
      model: "gemini-2.5-flash",
      generationConfig: {
        responseMimeType: "application/json",
      },
    });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse and validate the response
    let jsonResponse: CareerRoadmap;
    try {
      // Clean the response (remove potential markdown wrappers)
      const cleanText = text.replace(/```json|```/g, "").trim();
      jsonResponse = JSON.parse(cleanText);

      // Validate the response structure
      if (!jsonResponse.roadmap || 
          !Array.isArray(jsonResponse.roadmap.milestones) ||
          !Array.isArray(jsonResponse.roadmap.skills)) {
        throw new Error("Invalid response structure from AI");
      }

      // Additional formatting checks
      jsonResponse.roadmap.milestones.forEach(milestone => {
        if (!milestone.stage.includes("Stage")) {
          milestone.stage = `Stage ${milestone.stage}`;
        }
      });

    } catch (e: any) {
      console.error("Failed to parse or validate Gemini response:", e);
      return res.status(500).json({ 
        success: false,
        message: "Failed to generate a valid career path. Please try again.",
        error: e.message
      });
    }

    // Save the roadmap to database
    try {
      const savedRoadmap = new CareerRoadmap({
        userId: userId,
        milestones: jsonResponse.roadmap.milestones,
        skills: jsonResponse.roadmap.skills,
        courses: jsonResponse.roadmap.courses,
        jobs: jsonResponse.roadmap.jobs,
        tips: jsonResponse.roadmap.tips,
        userProfile: {
          skills: skills,
          experience: experience,
          careerGoal: careerGoal
        }
      });

      await savedRoadmap.save();
      console.log("Career roadmap saved to database successfully");

    } catch (saveError: any) {
      console.error("Error saving roadmap to database:", saveError);
      // Continue with response even if save fails
    }

    // Successful response
    res.status(200).json({
      success: true,
      message: "Career roadmap generated successfully",
      ...jsonResponse
    });

  } catch (error: any) {
    console.error("Error generating career path:", error);
    res.status(500).json({ 
      success: false,
      message: "Internal server error while generating career path",
      error: error.message
    });
  }
};

// Additional controller to get user's roadmap history
export const getUserRoadmaps = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const roadmaps = await CareerRoadmap.find({ userId })
      .sort({ createdAt: -1 })
      .select("-__v")
      .limit(10); // Get last 10 roadmaps

    res.status(200).json({
      success: true,
      roadmaps: roadmaps
    });

  } catch (error: any) {
    console.error("Error fetching user roadmaps:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching roadmap history",
      error: error.message
    });
  }
};

// Controller to get a specific roadmap by ID
export const getRoadmapById = async (req: Request, res: Response) => {
  try {
    const userId = req?.user?.id;
    const { roadmapId } = req.params;

    if (!userId) {
      return res.status(401).json({ success: false, message: "Not authenticated" });
    }

    const roadmap = await CareerRoadmap.findOne({ 
      _id: roadmapId, 
      userId: userId 
    }).select("-__v");

    if (!roadmap) {
      return res.status(404).json({ 
        success: false, 
        message: "Roadmap not found" 
      });
    }

    res.status(200).json({
      success: true,
      roadmap: roadmap
    });

  } catch (error: any) {
    console.error("Error fetching roadmap:", error);
    res.status(500).json({ 
      success: false,
      message: "Error fetching roadmap",
      error: error.message
    });
  }
};