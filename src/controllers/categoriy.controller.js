// import mongoose from "mongoose";
import { Categoriya } from "../modules/categoriy.model.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const createCategoriyController = async (req, res, next) => {
    try {
      const {name} = req.body;
      const currentCategorhy = await Categoriya.findOne({name});
  
      if (!currentCategorhy) {
        console.log({ currentCategorhy });
        const categoriya = new Categoriya(req.body);
        console.log({ categoriya });
  
        await categoriya.save();
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

  export const getAllCategoryController = async (req, res, next) => {
    try {
        // const payload = req.user;
        const currentCategory = await Categoriya.find();
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

export const updateCategoryaController = async (req, res, next) => {
  try {
      const name = req.params.name
      const currentCategory = await Categoriya.findOneAndUpdate({name}, req.body);
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

export const deleteCategoryController = async (req, res, next) => {
  try {
      const payload = req.user
      const name = req.params.name
      const currentCategory = await Categoriya.findOneAndDelete({name});
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