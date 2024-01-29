import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        // Creating a new user
        const newUser = new User({
            username,
            email,
            password: await bcryptjs.hash(password, 10),
        })

        // Saving the user to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}