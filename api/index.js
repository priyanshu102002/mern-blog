import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';
import userRoutes from './routes/user.route.js';
import authRoutes from "./routes/auth.route.js";

const app = express();
app.use(express.json());

dotenv.config();
const PORT = process.env.PORT || 3000;

app.use('/api/user', userRoutes)
app.use('/api/auth', authRoutes)

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB!!');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

app.listen(PORT, () => {
    console.log(`app listening on port ${PORT}!!`);
});