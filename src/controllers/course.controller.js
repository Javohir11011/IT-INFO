import {Course } from "../modules/index.js";
import { createCourseService, deleteCourseService, getAllCourseService, updateCourseService } from "../service/course.service.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const createCourseController = async (req, res, next) => {
    try {
      const {name} = req.body;
      const currentArticle = await createCourseService(name, req.body)
      if (!currentArticle) {
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

  export const getAllCourseController = async (req, res, next) => {
    try {
        const currentCategory = await getAllCourseService()
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

export const updateCourseController = async (req, res, next) => {
  try {
      const name = req.params.name
      const currentCourse = await updateCourseService(name, req.body)
      if (!currentCourse) {
          return res
              .status(statusCodes.NOT_FOUND)
              .send(errorMessages.USER_NOT_FOUND);
      }
      // console.log(currentCourse);
      res.send(currentCourse);
  } catch (error) {
      next(new ApiError(error.statusCodes, error.message));
  }
};

export const deleteCourseController = async (req, res, next) => {
  try {
      const payload = req.user
      const name = req.params.name
      const currentCategory = await deleteCourseService(name)
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