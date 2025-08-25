import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import dotenv from 'dotenv';
import authRoutes from './routes/auth';
import userRoutes from './routes/user';
import kycRoutes from './routes/kyc'
// Load environment variables 
dotenv.config();

const app = express();

// Middleware 
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json());

// Routes 
app.use('/auth', authRoutes); // Add this line
app.use('/user', userRoutes);
app.use('/kyc', kycRoutes);
export default app;



