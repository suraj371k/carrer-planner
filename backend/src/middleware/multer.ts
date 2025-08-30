import multer from "multer";
import { v2 as cloudinary } from "cloudinary";
import { Request, Response, NextFunction } from "express";

// Multer in-memory storage (files kept in buffer)
const storage = multer.memoryStorage();

export const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    const allowedMimes = [
      "application/pdf", // .pdf
      "application/msword", // .doc
      "application/vnd.openxmlformats-officedocument.wordprocessingml.document", // .docx
      "text/plain", // .txt
      "application/rtf", // .rtf
    ];

    if (allowedMimes.includes(file.mimetype)) {
      cb(null, true);
    } else {
      cb(new Error("Invalid file type. Only PDF, DOC, DOCX, TXT, and RTF are allowed."));
    }
  },
});
