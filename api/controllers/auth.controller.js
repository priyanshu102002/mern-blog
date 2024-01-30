import User from "../models/user.model.js"
import bcryptjs from "bcryptjs";
import jwt from "jsonwebtoken";
import { errorHandler } from "../utils/error.js";

export const signup = async (req, res, next) => {
    const { username, email, password } = req.body;

    try {
        const hashPassword = await bcryptjs.hash(password, 10);

        // Creating a new user
        const newUser = new User({
            username,
            email,
            password: hashPassword,
        })

        // Saving the user to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });

    } catch (error) {
        next(error);
    }
}

export const signin = async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password || email === "" || password === "") {
        next(errorHandler(400, "Email and password are required"));
    }

    try {
        const validUser = await User.findOne({ email });
        if (!validUser) {
            return next(errorHandler(404, "User not found"));
        }
        const validPassword = await bcryptjs.compare(password, validUser.password);
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }

        const token = jwt.sign({ id: validUser._id }, process.env.JWT_SECRET, {
            expiresIn: "1d",
        })

        // Destructuring the user object to remove the password
        const { password: userPassword, ...rest } = validUser._doc;

        res.status(200).cookie("access_token", token, { httpOnly: true }).json(rest);
    } catch (error) {
        next(error);
    }

}