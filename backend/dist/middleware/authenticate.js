"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.authenticate = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const JWT_SECRET = process.env.JWT_SECRET;
const authenticate = (req, res, next) => {
    // Try to get token from multiple sources
    let token = req.cookies?.token; // From cookies
    // If no token in cookies, check Authorization header
    if (!token) {
        const authHeader = req.header('Authorization');
        if (authHeader && authHeader.startsWith('Bearer ')) {
            token = authHeader.replace('Bearer ', '');
        }
    }
    if (!token) {
        return res.status(401).json({
            success: false,
            message: "Authentication required - no token provided"
        });
    }
    try {
        // Verify the token
        const decoded = jsonwebtoken_1.default.verify(token, JWT_SECRET);
        console.log("Decoded token:", decoded);
        req.user = { id: decoded.id };
        next();
    }
    catch (err) {
        console.log("Token verification error:", err);
        return res.status(401).json({
            success: false,
            message: "Invalid or expired token"
        });
    }
};
exports.authenticate = authenticate;
//# sourceMappingURL=authenticate.js.map