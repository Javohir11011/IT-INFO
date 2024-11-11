import mongoose from "mongoose";

const commentSchema = new mongoose.Schema(
  {
    content: {
      type: String,
      required: true, 
    },
    article_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "article",
    },
    user_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "user",
    },
    course_id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "course",
    },
  },
  {
    timestamps: true, 
  }
);

export const Comment = mongoose.model("comments", commentSchema);
