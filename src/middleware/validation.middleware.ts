import type { ZodSchema } from "zod";
import type { Request, NextFunction, Response } from 'express';
import { statusCodes } from "../config/config";

export const validate = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
    try {
        const result = schema.safeParse(req.body);
        if (!result.success) {
            return res.status(400).json({
                message: "Validation error",
                errors: result.error.issues.map((e) => ({
                    field: e.path.join("."),
                    message: e.message,
                })),
            });
        }
        req.body = result.data;
        next();
    } catch (error: any) {
        return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ error: error })
    }
}