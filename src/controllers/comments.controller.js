import {Comment } from "../modules/index.js";
import { createCommentService, deleteCommentService, getAllCommentService, updateCommentService } from "../service/comments.service.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const createCommentController = async (req, res, next) => {
    try {
      const {content} = req.body;
      const currentComment = await createCommentService(content, req.body)
  
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
        const currentCategory = await getAllCommentService()
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
    const title = req.params.title;
    const currentComment = await updateCommentService(title, req.body);
    if (!currentComment) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }
    console.log(currentComment);
    res.send(currentComment);
  } catch (error) {
    next(new ApiError(statusCodes.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const deleteCommentController = async (req, res, next) => {
  try {
      const payload = req.user
      const title = req.params.title
      const currentCategory = await deleteCommentService(title);
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