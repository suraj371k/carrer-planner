import { Request, Response } from "express";
import { IQuestion } from "../models/interview.model";
export declare const startInterview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const submitAnswer: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare function generateQuestions(track: string): Promise<IQuestion[]>;
export declare function getAllTracks(req: Request, res: Response): Promise<void>;
export declare function getUserSession(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
export declare function getALlSessions(req: Request, res: Response): Promise<Response<any, Record<string, any>>>;
//# sourceMappingURL=interview.controller.d.ts.map