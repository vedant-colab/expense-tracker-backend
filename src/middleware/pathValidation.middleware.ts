import type { Request, Response, NextFunction } from "express";
import { idParamSchema } from "../dto/pathParams.dto";
import type { ZodSchema } from "zod";

export const validatePathParam = (schema: ZodSchema<any>) => (req: Request, res: Response, next: NextFunction) => {
  const result = schema.safeParse(req.params);
  if (!result.success) {
    return res.status(400).json(result.error);
  }
  next();
};