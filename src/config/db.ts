import mongoose from 'mongoose';
import logger from '../utils/logger';

export const connectDB = async() => {
    try {
        const dbURI : string = process.env.MONGO_URI ?? ""
        await mongoose.connect(dbURI)
        logger.info("Mongo Connected")
    } catch(error : unknown){
        if( error instanceof Error) {
            logger.error(error)
            process.exit(1)
        }
    }
}