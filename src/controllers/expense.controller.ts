import type { Request, Response, NextFunction } from 'express';
import { statusCodes } from '../config/config';
import { Expense } from '../models/Expense';


export const createExpense = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const { title, category, amount, type, date, note } = req.body;
    const userID = (req as any).user.id;
    const expenseDate = date || new Date().toISOString().split('T')[0];
    const result = await Expense.create({
      title,
      amount,
      type,
      category,
      note,
      date: expenseDate,
      userID
    })
    return res.status(statusCodes.CREATED).json({
      success: true,
      message: 'Expense/Income added successfully',
      data: result,
    });

  } catch (error: unknown) {
    if (error instanceof Error) {
      return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        error: error.message,
      });
    }

    return res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
      success: false,
      error: 'Unknown error occurred',
    });
  }
}

export const updateExpense = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const userID = (req as any).user.id;
    const expenseID = req.params.id;
    const result = await Expense.findOneAndUpdate({ userID: userID, _id: expenseID },
      req.body,
      { new: true }
    )
    if (!result) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "No expense found or unauthorized"
      })
    }
    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      data: result
    })
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Some error occured"
      })
    }
  }
}

export const deleteExpense = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const userID = (req as any).user.id;
    const expenseID = req.params.id;
    const result = await Expense.findOneAndDelete({ userID: userID, _id: expenseID }
    )
    if (!result) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "No expense found or unauthorized"
      })
    }
    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
      data: result
    })
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Some error occured"
      })
    }
  }
}

export const getAllExpenses = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const userID = (req as any).user.id;
    const result = await Expense.find({ userID: userID }
    )
    if (!result) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "No expense found or unauthorized"
      })
    }
    res.status(200).json({
      success: true,
      message: "Expenses fetched successfully",
      data: result
    })
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Some error occured"
      })
    }
  }
}

export const getExpense = async (req: Request, res: Response, _next: NextFunction) => {
  try {
    const userID = (req as any).user.id;
    const expenseId = req.params.id
    const result = await Expense.findOne({ userID: userID, _id : expenseId }
    )
    if (!result) {
      return res.status(statusCodes.NOT_FOUND).json({
        success: false,
        message: "No expense found or unauthorized"
      })
    }
    res.status(200).json({
      success: true,
      message: "Expense fetched successfully",
      data: result
    })
  } catch (error: any) {
    if (error instanceof Error) {
      res.status(statusCodes.INTERNAL_SERVER_ERROR).json({
        success: false,
        message: "Some error occured"
      })
    }
  }
}