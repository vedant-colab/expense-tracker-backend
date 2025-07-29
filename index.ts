import type {Response, Request, NextFunction}   from 'express';
import express from 'express';
import cors from 'cors';
import { configDotenv } from 'dotenv';
import morgan from 'morgan';
import { connectDB } from './src/config/db';
import logger from './src/utils/logger';
import { statusCodes } from './src/config/config';
import authRoutes from './src/routes/auth.routes';
import { swaggerSetup } from './src/utils/swagger';
import expenseRoutes from './src/routes/expense.routes';


configDotenv()

const app = express();

app.use(cors())
app.use(express.json());
app.use(morgan("dev"));
swaggerSetup(app)

app.get("/", (req: Request, res: Response) => {
    res.status(statusCodes.OK).json("Home api for expenseTracker")
})

app.use("/api/v1/auth", authRoutes);
app.use("/api/v1/expense", expenseRoutes);


const PORT = process.env.PORT || 5000;

connectDB().then(() => {
  app.listen(PORT, () => {
    logger.info(`🚀 Server running on http://localhost:${PORT}`);
    logger.info(`🚀 Swagger docs running on http://localhost:${PORT}/api-docs`);
  });
});