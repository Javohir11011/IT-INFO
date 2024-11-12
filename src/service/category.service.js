import { Categoriya } from "../modules/index.js";

export const getAllCategoryleService = async () => {
  try {
    const result = await Categoriya.find();
    if (!result) {
      throw new Error("not found");
    }
    return result;
  } catch (error) {
    return error.message;
  }
};

export const createCategoryService = async (title, body) => {
  try {
    const currentCategory = await Categoriya.findOne({ title });
    if (!currentCategory) {
      const article = new Categoriya(body);
      await article.save();

    }
    return article;
  } catch (error) {
    return error.message;
  }
};


export const updateCategoryService = async (title, body) => {
    try {
        const currentCategory = await Categoriya.findOneAndUpdate({ title }, body);
        if (!currentCategory) {
          throw new Error("Error")
        }
        return currentCategory;
    } catch (error) {
      return error.message;
    }
  };

export const deleteCategoryService = async (title, body) => {
    try {
        const currentCategory = await Categoriya.findOneAndDelete({ title });
        if (!currentCategory) {
          throw new Error("Error")
        }
        return currentCategory;
    } catch (error) {
      return error.message;
    }
  };
  