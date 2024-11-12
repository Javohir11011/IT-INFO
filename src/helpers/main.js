import { config } from "dotenv";
import nodemailer from "nodemailer";

config();

console.log(process.env.MAILTERAP_PASSWORD);
const transport = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: "ajavohir545@gmail.com",
    pass: process.env.MAILTERAP_PASSWORD,
  },
});

const mailOptions = {
  from: "ajavohir545@gmail.com",
  to: "samandarshavkatov07@gmail.com",
  subject: "Sendening Email using Node.js",
  text: "Samandar sila kochavali xoji aka!",
};

export const sendMail = (to, subject, text) => {
  transport.sendMail({
      from: "ajavohir545@gmail.com", to, subject, text
  },
    function (error, info) {
      if (error) {
        console.log(error);
      } else {
        console.log("email sent: " + info.response);
      }
    }
  );
};
