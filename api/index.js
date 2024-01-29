import express from 'express';
import dotenv from 'dotenv';
import mongoose from 'mongoose';

dotenv.config();
const app = express();
app.use(express.json());
const PORT = process.env.PORT || 3000;

mongoose.connect(process.env.MONGODB_URI).then(() => {
    console.log('Connected to MongoDB!!');
}).catch((err) => {
    console.log('Error connecting to MongoDB', err);
});

app.listen(PORT, () => {
    console.log(`Example app listening on port ${PORT}!!`);
});