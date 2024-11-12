import jwt from "jsonwebtoken";
import { User } from "../modules/index.js";
import {
  statusCodes,
  errorMessages,
  ApiError,
  logger,
} from "../utils/index.js";
import { genSalt, hash } from "bcrypt";
import { otpGenerator, sendMail } from "../helpers/index.js";
import { OTP } from "../modules/otp.model.js";

export const registerController = async (req, res, next) => {
  try {
    const { email, role } = req.body;
    const currentUser = await User.findOne({ email });

    if (!currentUser) {
      const otp = otpGenerator();
      sendMail(email, `OTP", "THIS IS YOUR OTP:${otp}`);

      const user = new User(req.body);
      const db_otp = new OTP({
        user_id: user._id,
        opt_code: otp,
      });
      await db_otp.save();
      await user.save();
      return res.status(statusCodes.CREATED).send("created");
    }
    return res
      .status(statusCodes.CONFLICT)
      .send(errorMessages.EMAIL_ALREADY_EXISTS);
  } catch (error) {
    console.log(error);
    next(new ApiError(error.statusCode, error.message));
  }
};

export const loginController = async (req, res, next) => {
  try {
    const { email, password } = req.body;
    const currentUser = await User.findOne({ email });
    if(currentUser.is_active === false){
      return res.status(statusCodes.BAD_REQUEST).send("is_activ false")
    }
    if (!currentUser) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.USER_NOT_FOUND);
    }

    const passwordIsEqual = currentUser.compare(password);

    if (!passwordIsEqual) {
      return res
        .status(statusCodes.BAD_REQUEST)
        .send(errorMessages.INVALID_CREDENTIALS);
    }

    const payload = {
      sub: email,
      role: currentUser.role,
    };

    const accessSecretKey = process.env.JWT_ACCESS_SECRET;
    const refreshSecretKey = process.env.JWT_REFRESH_SECRET;

    const accessToken = jwt.sign(payload, accessSecretKey, {
      expiresIn: process.env.JWT_ACCESS_EXPORES_IN,
    });

    const refreshToken = jwt.sign(payload, refreshSecretKey, {
      expiresIn: process.env.JWT_REFRESH_EXPORES_IN,
    });

    return res.send({
      accessToken,
      refreshToken,
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const refreshTokenController = async (req, res, next) => {
  try {
    const { token } = req.body;
    jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, decode) => {
      if (err) throw new Error(statusCodes.FORBIDDEN, message.FORBIDDEN);

      logger.info({ decode });
      const accessToken = jwt.sign(
        {
          sub: decode.sub,
          role: decode.role,
        },
        process.env.JWT_ACCESS_SECRET,
        {
          expiresIn: process.env.JWT_ACCESS_EXPORES_IN,
        }
      );

      return res.send({ accessToken, refreshToken: token });
    });
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const adminController = async (req, res, next) => {
  try {
    const { email } = req.body;
    const currentAdmin = await User.findOne({ email });
    logger.info(currentAdmin);
    if (!currentAdmin) {
      console.log({ currentAdmin });
      const admin = new User(req.body);

      await admin.save();
      return res.status(statusCodes.CREATED).send("created");
    }
    return res.send("User already register...");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const updateAdminController = async (req, res, next) => {
  try {
    const email = req.params.email;
    const { newpassword, password, email2 } = req.body;

    const currentAdmin = await User.findOne({ email });
    if (!currentAdmin) {
      return res
        .status(statusCodes.NOT_FOUND)
        .send(errorMessages.EMAIL_ALREADY_EXISTS);
    }
    const checkPassword = await currentAdmin.compare(password);
    if (!checkPassword) {
      return res.status(400).send("False");
    }

    if (newpassword) {
      const salt = await genSalt(10);
      currentAdmin.password = await hash(newpassword, salt);
    }

    if (email2) {
      currentAdmin.email = email2;
    }

    await User.updateOne({ email }, currentAdmin);

    return res.status(statusCodes.OK).send("Admin updated...");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
export const deleteAdminController = async (req, res, next) => {
  try {
    const email = req.params.email;
    const currentAdmin = await User.findOneAndDelete({ email });
    if (!currentAdmin) {
      return res.status(statusCodes.NOT_FOUND).send(errorMessages.NOT_FOUND);
    }
    return res.status(statusCodes.OK).send("Delete Admin...");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};

export const verifyController = async (req, res, next) => {
  try {
      const { otp, email } = req.body;
      const currentUser = await User.findOne({ email });
      const currentOtp = await OTP.findOne({ user_id: currentUser._id });
      const isEqual = currentOtp.verify(otp);
      if (!isEqual) {
          return res.send("OTP is not valid");
      }
      await OTP.deleteOne({ user_id: currentUser._id });
      await User.updateOne({ email }, { is_active: true });
      res.send("User is activated");
  } catch (error) {
      next(new ApiError(error.statusCode, error.message));
  }
};

export const forgetPassword = async (req, res, next) => {
  try {
    const { email, otp, newpassword } = req.body;
    const currentUser = await User.findOne({ email });
    if (!currentUser) {
      return res.status(statusCodes.NOT_FOUND).send(errorMessages.NOT_FOUND);
    }
    sendMail(
      email,
      `New Password`,
      `Here is your new password: ${newpassword}`
    );

    const salt = await genSalt(10);
    const hashPassword = await hash(newpassword, salt);
    await User.updateOne({ email }, { password: hashPassword });
    return res.status(statusCodes.OK).send("ok");
  } catch (error) {
    next(new ApiError(error.statusCode, error.message));
  }
};
