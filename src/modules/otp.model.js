// import { date, required } from "joi";
import mongoose from "mongoose";

const optSchema = new mongoose.Schema({
    user_id:{
        type: mongoose.Schema.Types.ObjectId,
        ref:"user",
        required:true
    },
    opt_code:{
        type:String,
        required:true,
    },
    expres_at:{
        type:Date,
        default:new Date()+60*15*100
    },
})

optSchema.method("verify", function(userOtp){
    return userOtp == this.opt_code;
})


export const OTP = mongoose.model("otp", optSchema)