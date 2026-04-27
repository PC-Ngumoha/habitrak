import express from 'express';
import cors from 'cors';
import { errorHandler } from './middleware/errorHandler';
import habitRoutes from './routes/habitRoutes';
import userRoutes from './routes/userRoutes';

const app = express();

app.use(express.json());
app.use(cors()); // Access-Control-Allow-Origin: *

// Routers
app.use('/api/users', userRoutes);
app.use('/api/habits', habitRoutes);

// Global error handler
app.use(errorHandler)

export default app;
