import { Router } from "express";
import { registerUser, loginUser } from "../controllers/auth.controller";
import { protect } from "../middleware/auth.middleware";
import { validate } from "../middleware/validation.middleware";
import { expenseSchema, updateExpenseSchema } from "../dto/expense.dto";
import { createExpense, deleteExpense, getAllExpenses, getExpense, updateExpense } from "../controllers/expense.controller";
import { validatePathParam } from "../middleware/pathValidation.middleware";
import { idParamSchema } from "../dto/pathParams.dto";
import { cache } from "../middleware/cache.middleware";

const router = Router();

router.post("/expense", protect, validate(expenseSchema), createExpense);
router.put("/expense/:id", protect,validatePathParam(idParamSchema), validate(updateExpenseSchema), updateExpense);
router.delete("/expense/:id", protect,validatePathParam(idParamSchema), deleteExpense);
router.get("/expense", protect,cache((req) => `user:${(req as any).user.id}:data`, 300), getAllExpenses);
router.get("/expense/:id", protect,validatePathParam(idParamSchema),cache((req) => `item:${req.params.id}:data`, 300), getExpense);

export default router;
