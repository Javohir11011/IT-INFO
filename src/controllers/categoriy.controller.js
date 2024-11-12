import { Categoriya } from "../modules/categoriy.model.js";
import { createCategoryService, getAllCategoryleService, updateCategoryService } from "../service/category.service.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const createCategoryController = async (req, res, next) => {
  try {
    const { name } = req.body;
    const currentCategory = await createCategoryService(name, req.body);

    if (!currentCategory) {
      console.log({ currentCategory });
      const category = new Categoriya(req.body);
      console.log({ category });

      await category.save();
      return res.status(statusCodes.CREATED).send("created");
    }
    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    console.log(error);
    next(new ApiError(statusCodes.INTERNAL_SERVER_ERROR, error.message));
  }
};

export const getAllCategoryController = async (req, res, next) => {
  try {
    // const payload = req.user;
    const currentCategory = await getAllCategoryleService()
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
    const name = req.params.name;
    const currentCategory = await updateCategoryService(name, req.body)
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
    const payload = req.user;
    const name = req.params.name;
    const currentCategory = await Categoriya.findOneAndDelete({ name });
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
