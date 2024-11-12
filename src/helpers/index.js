import { generate } from "otp-generator"

export * from "./main.js"
export * from "./otp.js"


export const otpGenerator = ()=>{
    return generate(6, {upperCaseAlphabets:false, specialChars:false})
};


