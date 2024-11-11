import { User } from "../modules/index.js"
import { statusCodes, errorMessages, ApiError } from "../utils/index.js";
export const userController = async (req, res, next) => {
    try {
        const payload = req.user;
        const currentUser = await User.find({ email: payload.sub });
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        console.log(currentUser);
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const getAllController = async (req, res, next) => {
    try {
        // const payload = req.user;
        const currentUser = await User.find();
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        console.log(currentUser);
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const updateUserController = async (req, res, next) => {
    try {
        const email = req.params.email
        // const {name} = req.body;
        const currentUser = await User.findOneAndUpdate({email}, req.body);
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        console.log(currentUser);
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};
export const deleteUserController = async (req, res, next) => {
    try {
        const payload = req.user
        const email = req.params.email
        const currentUser = await User.findOneAndDelete({email});
        if (!currentUser) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        console.log(currentUser);
        res.send(currentUser);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};