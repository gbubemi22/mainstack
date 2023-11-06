import * as dotenv from "dotenv";
dotenv.config();
import "express-async-errors";
import { configs } from "./config/configs";

import express, { Application, Request, Response, NextFunction } from "express";
const app: Application = express();

import cors from "cors";
import morgan from "morgan";
import cookieParser from "cookie-parser";
import bodyParser from "body-parser";

import helmet from "helmet";
const rateLimitPromise = import("express-rate-limit");
import mongoSanitize from "express-mongo-sanitize";

//import DB
import connectDB from "./DB/connect";
const sanitizeOptions = {
  replaceWith: "_", // Define the replacement character
};

import routers from "./routers/index";

app.use(morgan("dev"));
app.use(cors());
app.use(bodyParser.json());
app.use(cookieParser(configs.JWT_COOKIE));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(mongoSanitize());

const applyRateLimiter = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { default: rateLimit } = await rateLimitPromise;

  const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 50, // limit each IP to 100 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
  });

  limiter(req, res, next);
};

app.use(applyRateLimiter);
app.use(helmet());

app.get("/", (req, res) => {
  res.json({ message: "Welcome to MY App" });
});

// USE ROUTES

app.use(routers);

//ErrorHandlerMiddleware
import notFound from "./middleware/not-found";
import errorHandlerMiddleware from "./middleware/error-handler";

app.use(notFound);
app.use(errorHandlerMiddleware);

//port
const port = process.env.PORT || 4000;
const start = async () => {
  try {
    await connectDB(configs.MONGO_URI);
    app.listen(port, () => {
      console.info(`⚡️Listening on port ${port}...`);
    });
  } catch (error) {
    console.error("An error occurred:", error);
  }
};

start();
