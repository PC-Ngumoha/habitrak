import express from 'express';
import { errorHandler } from './middleware/errorHandler';
import habitRoutes from './routes/habitRoutes';

const app = express();

app.use(express.json());

// Routers
app.use('/api/habits', habitRoutes);

// Global error handler
app.use(errorHandler)

export default app;
