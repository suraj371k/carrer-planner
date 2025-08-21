import { Request, Response } from "express";
export declare const startVoiceInterview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
export declare const vapiWebhook: (req: Request, res: Response) => Promise<void>;
export declare const finishVoiceInterview: (req: Request, res: Response) => Promise<Response<any, Record<string, any>> | undefined>;
//# sourceMappingURL=voiceInterview.controller.d.ts.map