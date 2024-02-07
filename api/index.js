import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import cors from 'cors';
import cookieParser from 'cookie-parser';

import userRoutes from './routes/user.route.js';
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());
app.use(cookieParser());

// CORS
app.use(cors({
    origin: "http://localhost:5173",
    credentials: true
}))

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

// Error handling middleware(universal error handling midd) -> next(err)
app.use((err, req, res, next) => {
    const statusCode = err.statusCode || 500;
    const message = err.message || 'Internal Server Error';
    res.status(statusCode).json({
        success: false,
        message,
        statusCode
    })
})

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB!!');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!!`);
});