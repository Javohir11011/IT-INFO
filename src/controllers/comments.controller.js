import {Comment } from "../modules/index.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const createCommentController = async (req, res, next) => {
    try {
      const {content} = req.body;
      const currentComment = await Comment.findOne({content});
  
      if (!currentComment) {
        const comment = new Comment(req.body);
  
        await comment.save();
        return res.status(statusCodes.CREATED).send("created");
      }
      return res
        .status(statusCodes.CONFLICT)
        .send(errorMessages.EMAIL_ALREADY_EXISTS
        );
    } catch (error) {
      console.log(error)
      next(new ApiError(error.statusCodes, error.message));
    }
  };

  export const getAllCommentController = async (req, res, next) => {
    try {
        const currentCategory = await Comment.find();
        if (!currentCategory) {
            return res
                .status(statusCodes.NOT_FOUND)
                .send(errorMessages.USER_NOT_FOUND);
        }
        console.log(currentCategory);
        res.send(currentCategory);
    } catch (error) {
        next(new ApiError(error.statusCodes, error.message));
    }
};

export const updateCommentController = async (req, res, next) => {
  try {
      const name = req.params.name
      const currentCourse = await Comment.findOneAndUpdate({name}, req.body);
      if (!currentCourse) {
          return res
              .status(statusCodes.NOT_FOUND)
              .send(errorMessages.USER_NOT_FOUND);
      }
      console.log(currentCourse);
      res.send(currentCourse);
  } catch (error) {
      next(new ApiError(error.statusCodes, error.message));
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
      const payload = req.user
      const title = req.params.title
      const currentCategory = await Comment.findOneAndDelete({title});
      if (!currentCategory) {
          return res
              .status(statusCodes.NOT_FOUND)
              .send(errorMessages.USER_NOT_FOUND);
      }
      console.log(currentCategory);
      res.send(currentCategory);
  } catch (error) {
      next(new ApiError(error.statusCodes, error.message));
  }
}