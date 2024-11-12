import { Course } from "../modules/index.js";

export const getAllCourseService = async () => {
  try {
    const result = await Course.find();
    if (!result) {
      throw new Error("not found");
    }
    return result;
  } catch (error) {
    return error.message;
  }
};

export const createCourseService = async (title, body) => {
  try {
    const currentArticle = await Course.findOne({ title });
    if (!currentArticle) {
      const article = new Course(body);
      await article.save();

    }
    return article;
  } catch (error) {
    return error.message;
  }
};


export const updateCourseService = async (title, body) => {
    try {
        const currentCategory = await Course.findOneAndUpdate({ title }, body);
        if (!currentCategory) {
          throw new Error("Error")
        }
        return currentCategory;
    } catch (error) {
      return error.message;
    }
  };

export const deleteCourseService = async (title, body) => {
    try {
        const currentCategory = await Course.findOneAndDelete({ title });
        if (!currentCategory) {
          throw new Error("Error")
        }
        return currentCategory;
    } catch (error) {
      return error.message;
    }
  };
  