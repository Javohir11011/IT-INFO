import mongoose from "mongoose";


const courseSchema = new mongoose.Schema({
    name : {
        type : String,
        require:true,
    },
    description:{
        type:String
    },
    category_id : {
        type:mongoose.Schema.Types.ObjectId,
        ref:"Categoriy"
    },
},
{
    timestamps : true
}
);


export const Course = mongoose.model("course", courseSchema);