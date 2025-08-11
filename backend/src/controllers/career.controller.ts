import { Request, Response } from "express";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY!);

export const generateCareerPath = async (req: Request, res: Response) => {
  try {
    const { skills, experience, careerGoal } = req.body;

    if (!skills || !experience || !careerGoal) {
      return res
        .status(400)
        .json({ message: "Skills, interests, and career goal are required" });
    }

    const prompt = `
    You are a career coach.
    Based on the following user details:
    - Skills: ${skills.join(", ")}
    - Experience: ${experience} years
    - Career Goal: ${careerGoal}
    
    Create a structured career roadmap with:
    1. Main milestones (in sequence)
    2. Skills to acquire
    3. Recommended certifications or courses (with provider name if possible)
    4. Suggested job titles or roles to target after completion
    Format the answer in JSON with keys: milestones, skills, courses, jobs.
    `;
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-pro" });

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Try to parse the JSON response (Gemini might add markdown formatting)
    let jsonResponse;
    try {
      // Handle cases where response might be markdown with ```json ```
      const jsonString = text.replace(/```json|```/g, "").trim();
      jsonResponse = JSON.parse(jsonString);
    } catch (e) {
      // If parsing fails, return the raw text
      console.error("Failed to parse Gemini response as JSON:", e);
      return res.status(200).json({ roadmap: text });
    }

    res.status(200).json({ roadmap: jsonResponse });
  } catch (error) {
    console.error("Error generating career path:", error);
    res.status(500).json({ message: "Failed to generate career path" });
  }
};
