import mongoose from 'mongoose';
import { logger } from '../common/utils/logger.js';

const MONGO_URL = process.env.MONGO_URL;

export const conectMongoDB = async () => {
    try {
        await mongoose.connect(MONGO_URL);
        logger.info('MongoDB connection established successfully');
    } catch (error) {
        logger.error(error)
    }
}; 