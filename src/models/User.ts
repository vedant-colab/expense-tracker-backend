import mongoose, { Schema, type Document } from "mongoose";
import type { IUser } from "../types/user.types";
import bcrypt from "bcryptjs";

export interface IUserModel extends IUser, Document {}

const UserSchema : Schema<IUserModel> = new Schema({
     name: {
      type: String,
      required: [true, "Name is required"],
      trim: true,
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      lowercase: true,
      trim: true,
    },
    password: {
      type: String,
      required: [true, "Password is required"],
      minlength: 6,
    },
  },
  {
    timestamps: true,
  }
);


UserSchema.pre<IUserModel>("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});


UserSchema.methods.comparePassword = async function (password: string): Promise<boolean> {
  return bcrypt.compare(password, this.password);
};


export const User = mongoose.model<IUserModel>("User", UserSchema);