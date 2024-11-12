import { Comment } from "../modules/index.js";

export const getAllCommentService = async () => {
  try {
    const result = await Comment.find();
    if (!result) {
      throw new Error("not found");
    }
    return result;
  } catch (error) {
    return error.message;
  }
};

export const createCommentService = async (title, body) => {
  try {
    const currentComment = await Comment.findOne({title});
    if (!currentComment) {
      const article = new Comment(body);
      await article.save();
    }
    return article;
  } catch (error) {
    return error.message;
  }
};


export const updateCommentService = async (title, body) => {
    try {
      const currentComment = await Comment.findOneAndUpdate(
        { title },
        body,
        { new: true }
      );
      if (!currentComment) {
        throw new Error("Comment not found");
      }
      return currentComment;
    } catch (error) {
      return error.message;
    }
  };

export const deleteCommentService = async (title) => {
    try {
        const currentComment = await Comment.findOneAndDelete({ title });
        if (!currentComment) {
          throw new Error("Error")
        }
        return currentComment;
    } catch (error) {
      return error.message;
    }
  };
  