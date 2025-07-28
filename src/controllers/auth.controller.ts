import type { Request, Response } from "express";
import { User } from "../models/User";
import { signToken } from "../utils/jwt";
import { statusCodes } from "../config/config";
import logger from "../utils/logger";

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { name, email, password } = req.body;

    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(statusCodes.BAD_REQUEST).json({ message: "Email already in use" });
    }

    const user = await User.create({ name, email, password });

    const token = signToken(user._id as string);
    res.status(statusCodes.CREATED).json({
      message: "User registered successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    logger.error("Register error", err);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};

export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user || !(await user.comparePassword(password))) {
      return res.status(statusCodes.UNAUTHORIZED).json({ message: "Invalid credentials" });
    }

    const token = signToken(user._id as string);
    res.status(statusCodes.OK).json({
      message: "Logged in successfully",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });
  } catch (err) {
    logger.error("Login error", err);
    res.status(statusCodes.INTERNAL_SERVER_ERROR).json({ message: "Something went wrong" });
  }
};
