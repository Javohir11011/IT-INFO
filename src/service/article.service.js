import { Article } from "../modules/index.js";

export const getAllArticleService = async () => {
  try {
    const result = await Article.find();
    if (!result) {
      throw new Error("not found");
    }
    return result;
  } catch (error) {
    return error.message;
  }
};

export const createArticleService = async (title, body) => {
  try {
    const currentArticle = await Article.findOne({ title });
    if (!currentArticle) {
      const article = new Article(body);
      await article.save();
    }
    return article;
  } catch (error) {
    return error.message;
  }
};

export const updateArticleService = async (title, body) => {
  try {
    const currentCategory = await Article.findOneAndUpdate({ title }, body);
    if (!currentCategory) {
      throw new Error("Error");
    }
    return currentCategory;
  } catch (error) {
    return error.message;
  }
};

export const deleteArticleService = async (title, body) => {
  try {
    const currentCategory = await Article.findOneAndDelete({ title });
    if (!currentCategory) {
      throw new Error("Error");
    }
    return currentCategory;
  } catch (error) {
    return error.message;
  }
};
