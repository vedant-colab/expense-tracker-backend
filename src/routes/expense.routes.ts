import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { expenseSchema, updateExpenseSchema } from "../dto/expense.dto";
import { createExpense, deleteExpense, getAllExpenses, getExpense, updateExpense } from "../controllers/expense.controller";
import { validatePathParam } from "../middleware/pathValidation.middleware";
import { idParamSchema } from "../dto/pathParams.dto";

const router = Router();

router.post("/expense", protect, validate(expenseSchema), createExpense);
router.put("/expense/:id", protect,validatePathParam(idParamSchema), validate(updateExpenseSchema), updateExpense);
router.delete("/expense/:id", protect,validatePathParam(idParamSchema), deleteExpense);
router.get("/expense", protect, getAllExpenses);
router.get("/expense/:id", protect,validatePathParam(idParamSchema), getExpense);

export default router;
