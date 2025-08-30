import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET!;

// Extend Express Request type to include `user`
declare global {
  namespace Express {
    interface Request {
      user?: { id: string };
    }
  }
}

export const authenticate = (req: Request, res: Response, next: NextFunction) => {
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
    const decoded = jwt.verify(token, JWT_SECRET) as { id: string };
    console.log("Decoded token:", decoded); 
    
    req.user = { id: decoded.id }; 
    next();
  } catch (err) {
    console.log("Token verification error:", err); 
    return res.status(401).json({ 
      success: false,
      message: "Invalid or expired token" 
    });
  }
};