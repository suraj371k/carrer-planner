import { Request, Response } from "express";
import { User } from "../models/user.model";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

export const createUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password, skills, careerGoal , experience } = req.body;

    if (!name || !email || !password || !careerGoal || !skills || !experience) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existingUser = await User.findOne({ email }).select("_id");
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    //  Hash password securely
    const hashedPassword = await bcrypt.hash(password, 10);

    // Insert user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
      skills,
      careerGoal,
      experience
    });

    res.status(201).json({
      message: "User created successfully",
      user: { id: user._id, name: user.name, email: user.email, skills },
    });
  } catch (error) {
    console.error("Error creating user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res
        .status(400)
        .json({ message: "Email and password are required" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    //create jwt token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET!, {
      expiresIn: "7d",
    });

        // Send token in HTTP-only cookie
        res.cookie("token", token, {
          httpOnly: true, // Can't be accessed via JS
          secure: process.env.NODE_ENV === "production", // HTTPS only in prod
          sameSite: "lax", // CSRF protection
          maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
        });
    

    res.status(200).json({
      message: "Login successful",
      user: { id: user._id, name: user.name, email: user.email },
    });
  } catch (error) {
    console.error("Error logging in user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const logoutUser = (req: Request, res: Response) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
    });
    res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out user:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

export const getUserProfile = async (req: Request, res: Response) => {
  try {
    // req.user is set by authentication middleware
    const userId = req.user?.id;
    if (!userId) {
      return res.status(401).json({ message: "Unauthorized" });
    }

    // Exclude password field
    const user = await User.findById(userId).select("-password");
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.status(200).json({ user });
  } catch (error) {
    console.error("Error fetching user profile:", error);
    res.status(500).json({ message: "Internal server error" });
  }
};

