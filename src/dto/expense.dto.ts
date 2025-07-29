import z from 'zod';
import { createExpense } from '../controllers/expense.controller';
export const expenseSchema = z.object({
    title: z.string().min(1, "Title is required"),
    amount: z.number().positive("Amount must be greater than 0"),
    category: z.string().min(1, "Category is required"),
    note: z.string().optional(),
    type: z.enum(['income', 'expense']),
    date: z.coerce.date().optional(),
}).strict();

export type ExpenseDTO = z.infer<typeof expenseSchema>;


export const updateExpenseSchema = z.object({
    title : z.string().optional(),
    amount : z.number().positive("Amount must be greater than zero"),
    category : z.string().optional(),
    type : z.enum(['income', 'expense'])
}).strict()

export type UpdateExpenseDTO = z.infer<typeof updateExpenseSchema>