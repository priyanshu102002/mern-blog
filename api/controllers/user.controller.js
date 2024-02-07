import User from "../models/user.model.js";
import { errorHandler } from "../utils/error.js";
import bcryptjs from "bcryptjs";


export const test = (req, res) => {
    res.send('Api Testing!');
}

export const updateUser = async (req, res, next) => {
    // check the person is auth or not using cookie
    if (req.params.userId !== req.user.id) {
        return next(errorHandler(401, 'You are not authorized to perform this action'));
    }
    if (req.body.password) {
        if (req.body.password < 6) {
            return next(errorHandler(400, 'Password must be at least 6 characters'));
        }
        req.body.password = await bcryptjs.hash(req.body.password, 10);
    }

    if (req.body.username) {
        if (req.body.username.length < 6 || req.body.username.length > 20) {
            return next(errorHandler(400, 'Username length should be between 6 to 20 characters'));
        }
        if (req.body.username.includes(' ')) {
            return next(errorHandler(400, 'Username should not contain any spaces'));
        }
        if (req.body.username !== req.body.username.toLowerCase()) {
            return next(errorHandler(400, 'Username should be in lowercase'));
        }
        if (!req.body.username.match(/^[a-zA-Z0-9]+$/)) {
            return next(errorHandler(400, 'Username should not contain any special characters'));
        }
    }

    try {
        const updatedUser = await User.findByIdAndUpdate(req.params.userId, {
            $set: {
                username: req.body.username,
                email: req.body.email,
                password: req.body.password,
                profilePicture: req.body.profilePicture,
            }
        }, { new: true });
        const { password, ...rest } = updatedUser._doc;

        res.status(200).json(rest);

    } catch (error) {
        return next(errorHandler(500, 'Internal Server Error'));
    }
}

export const deleteUser = async (req, res, next) => {
    if (req.params.userId !== req.user.id) {
        return next(errorHandler(401, 'You are not authorized to perform this action'));
    }
    try {
        await User.findByIdAndDelete(req.params.userId);
        res.status(200).json('User has been deleted');

    } catch (error) {
        next(errorHandler(500, 'Internal Server Error'));
    }
}