import User from "../models/user.model.js";
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
        });

        // Saving the user to the database
        await newUser.save();
        res.status(201).json({ message: "User created successfully" });
    } catch (error) {
        next(error);
    }
};

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
        const validPassword = await bcryptjs.compare(
            password,
            validUser.password
        );
        if (!validPassword) {
            return next(errorHandler(400, "Invalid password"));
        }

        const token = jwt.sign(
            { id: validUser._id, isAdmin: validUser.isAdmin },
            process.env.JWT_SECRET,
            {
                expiresIn: "1d",
            }
        );

        // Destructuring the user object to remove the password
        const { password: userPassword, ...rest } = validUser._doc;

        res.status(200)
            .cookie("access_token", token, { httpOnly: true })
            .json(rest);
    } catch (error) {
        next(error);
    }
};

export const google = async (req, res, next) => {
    const { email, name, googlePhotoUrl } = req.body;
    try {
        // if user already exists, then sign in
        const user = await User.findOne({ email });
        if (user) {
            const token = jwt.sign(
                { id: user._id, isAdmin: user.isAdmin },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );
            const { password, ...rest } = user._doc;
            res.status(200)
                .cookie("access_token", token, { httpOnly: true })
                .json(rest);
        } else {
            // if user doesn't exist, then create new user
            const generatedPassword = Math.random().toString(36).slice(-8);
            const hashPassword = await bcryptjs.hash(generatedPassword, 10);

            const newUser = new User({
                // Priyanshu Kumar => priyanshukumar4395
                username:
                    name.split(" ").join("").toLowerCase() +
                    Math.random().toString(9).slice(-4),
                email,
                password: hashPassword,
                profilePicture: googlePhotoUrl,
            });

            await newUser.save();
            const token = jwt.sign(
                { id: newUser._id, isAdmin: newUser.isAdmin },
                process.env.JWT_SECRET,
                {
                    expiresIn: "1d",
                }
            );
            const { password, ...rest } = newUser._doc;
            res.status(200)
                .cookie("access_token", token, { httpOnly: true })
                .json(rest);
        }
    } catch (error) {
        next(error);
    }
};

export const signout = (req, res, next) => {
    try {
        res.clearCookie("access_token");
        res.status(200).json({ message: "Signout successfully" });
    } catch (error) {
        next(error);
    }
};
