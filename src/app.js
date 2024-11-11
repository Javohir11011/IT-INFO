import express from "express";
import morgan from "morgan";
import dotenv from "dotenv";
import rateLimit from "express-rate-limit";
import {
  articleRouter,
  authRouter,
  blogRouter,
  categoriyRouter,
  userRouter,
} from "./routes/index.js";
// import { logger } from "./utils/index.js";

dotenv.config();

const app = express();

const limiter = rateLimit({
  windowMs: 60 * 1000,
  limit : 6,
});


app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(morgan("dev"));
app.use(limiter);

app.use("/auth", authRouter);
app.use("/blog", blogRouter);
app.use("/api/v1/users", userRouter);
app.use("/category", categoriyRouter);
app.use("/article", articleRouter);

app.use((err, req, res, next) => {
  if (err) {
    return res.status(500).send(err.message);
  }
});

export default app;
