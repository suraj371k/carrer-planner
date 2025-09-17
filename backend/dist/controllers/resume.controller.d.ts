import { Request, Response } from "express";
export declare const analyzeResumeWithGemini: (resumeText: string) => Promise<any>;
export declare const analyzeResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getUserResumes: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getResumeById: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const deleteResume: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const getResumeAnalytics: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=resume.controller.d.ts.map