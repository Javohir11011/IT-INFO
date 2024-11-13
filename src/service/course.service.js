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
    return currentArticle;
  } catch (error) {
    return error.message;
  }
};


export const updateCourseService = async (title, body) => {
    try {
        const currentCategory = await Course.findOneAndUpdate({ name:title }, body, {new:true});
        console.log(currentCategory);
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
        const currentCategory = await Course.findOneAndDelete({name: title });
        if (!currentCategory) {
          throw new Error("Error")
        }
        return currentCategory;
    } catch (error) {
      return error.message;
    }
  };
  