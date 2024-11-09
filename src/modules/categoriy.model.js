// import { ref, string } from "joi";
import mongoose, { Schema } from "mongoose";


const categoriySchema = new mongoose.Schema({
    name : {
        type : String,
        require: true
    },
    description : {
        type: String,
        require : true
    }
},
{
    timeseries : true
}
);
 

export const Categoriya = mongoose.model("Categoriy", categoriySchema)