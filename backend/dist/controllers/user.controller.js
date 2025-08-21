"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.getUserProfile = exports.logoutUser = exports.loginUser = exports.createUser = void 0;
const user_model_1 = require("../models/user.model");
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const createUser = async (req, res) => {
    try {
        const { name, email, password, skills, careerGoal, experience } = req.body;
        if (!name || !email || !password || !careerGoal || !skills || !experience) {
            return res.status(400).json({ message: "All fields are required" });
        }
        // ✅ Ensure email is indexed in MongoDB
        const existingUser = await user_model_1.User.findOne({ email }).select("_id");
        if (existingUser) {
            return res.status(400).json({ message: "User already exists" });
        }
        // ✅ Hash password securely
        const hashedPassword = await bcryptjs_1.default.hash(password, 10);
        // ✅ Insert user
        const user = await user_model_1.User.create({
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
    }
    catch (error) {
        console.error("Error creating user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.createUser = createUser;
const loginUser = async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res
                .status(400)
                .json({ message: "Email and password are required" });
        }
        const user = await user_model_1.User.findOne({ email });
        if (!user) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        const isMatch = await bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid email or password" });
        }
        //create jwt token
        const token = jsonwebtoken_1.default.sign({ id: user._id }, process.env.JWT_SECRET, {
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
    }
    catch (error) {
        console.error("Error logging in user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.loginUser = loginUser;
const logoutUser = (req, res) => {
    try {
        res.clearCookie("token", {
            httpOnly: true,
            secure: process.env.NODE_ENV === "production",
            sameSite: "lax",
        });
        res.status(200).json({ message: "Logout successful" });
    }
    catch (error) {
        console.error("Error logging out user:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.logoutUser = logoutUser;
const getUserProfile = async (req, res) => {
    try {
        // req.user is set by authentication middleware
        const userId = req.user?.id;
        if (!userId) {
            return res.status(401).json({ message: "Unauthorized" });
        }
        // Exclude password field
        const user = await user_model_1.User.findById(userId).select("-password");
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }
        res.status(200).json({ user });
    }
    catch (error) {
        console.error("Error fetching user profile:", error);
        res.status(500).json({ message: "Internal server error" });
    }
};
exports.getUserProfile = getUserProfile;
//# sourceMappingURL=user.controller.js.map