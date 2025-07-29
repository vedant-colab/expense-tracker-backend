import type { Document } from "mongoose";
import type { IExpense } from "../types/expense.types";
import mongoose, { Schema } from "mongoose";


export interface IExpenseModel extends IExpense, Document { }

const expenseSchema = new Schema({
    title: { type: String, required: true },
    amount: { type: Number, required: true },
    category: { type: String, required: true },
    note: { type: String },
    type: { type: String, enum: ['income', 'expense'], required: true },
    date: { type: Date, default: Date.now },
    userID: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true }
})

export const Expense = mongoose.model<IExpenseModel>("Expense", expenseSchema);