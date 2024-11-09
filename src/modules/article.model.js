// import { ref, string } from "joi";
// import { string } from "joi";
import mongoose from "mongoose";

const articleSchema = new mongoose.Schema(
    {
    title : {
        type : String,
        require:true
    },
    content : {
        type: String,
    },
    author_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "user"
    },
    category_id :{
        type : mongoose.Schema.Types.ObjectId,
        ref: "Categoriy"
    }
},
{
    timeseries:true
}
);

export const Article = mongoose.model("article", articleSchema)
