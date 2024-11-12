import { Article } from "../modules/index.js";
import { createArticleService, deleteArticleService, getAllArticleService, updateArticleService } from "../service/article.service.js";
import { ApiError, errorMessages, statusCodes } from "../utils/index.js";

export const createArticleController = async (req, res, next) => {
  try {
    const { title } = req.body;
    const currentArticle = await createArticleService(title, req.body);
    if(!currentArticle){
      return res.status(statusCodes.NOT_FOUND).send(errorMessages.NOT_FOUND)
    }
    return res.status(statusCodes.OK).send("Add article")
  } catch (error) {
    console.log(error);
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const getAllArticleController = async (req, res, next) => {
  try {
    const currentArticle = await getAllArticleService();
    if (!currentArticle) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }
    return res.status(statusCodes.OK).send({
      data:currentArticle
    })
  } catch (error) {
    next(new ApiError(error.statusCodes, error.message));
  }
};

export const updateArticleController = async (req, res, next) => {
  try {
    const title = req.params.title;
    const currentCategory = await updateArticleService(title,  req.body);
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

export const deleteArticleController = async (req, res, next) => {
  try {
    const payload = req.user;
    const title = req.params.title;
    const currentCategory = await deleteArticleService(title);
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
