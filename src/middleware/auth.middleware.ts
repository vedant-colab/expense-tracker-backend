import type { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";
import { User } from "../models/User";
import { statusCodes } from "../config/config";

export const protect = async (req: Request, res: Response, next: NextFunction) => {
  let token;

  if (req.headers.authorization?.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1];
  }

  if (!token) {
    return res.status(statusCodes.UNAUTHORIZED).json({ message: "Not authorized, token missing" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET!) as { id: string };
    const user = await User.findById(decoded.id).select("-password");
    if (!user) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: "User not found" });
    }

    (req as any).user = { id: decoded.id };;
    next();
  } catch (err) {
    res.status(statusCodes.UNAUTHORIZED).json({ message: "Invalid token" });
  }
};
