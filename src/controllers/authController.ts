import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import UserRepository from "../repository/userRepository";
import { validatePasswordString } from "../utils/passwordvalidator";
import ConflictError from "../error/conflict";
import jwt from "jsonwebtoken";
import BadRequestError from "../error/bad-request";
import { configs } from "../config/configs";

const AuthController = {
  createUser: async (req: Request, res: Response) => {
    const { first_name, last_name, email, password, phone_number } = req.body;

    

    //check Email  or phone exits

    const userExists = await UserRepository.getUserByEmail(email);

    if (userExists && (userExists.email || userExists.phone_number)) {
      throw new ConflictError("Email or phone number already exists");
    }

    await validatePasswordString(password);

    const user = await UserRepository.createUser(
      first_name,
      last_name,
      email,
      password,
      phone_number
    );

    res.status(StatusCodes.CREATED).json({
      message: "User created successfully",
      data: {
        id: user._id,
        first_name: user.first_name,
        last_name: user.last_name,
        email: user.email,
        phone_number: user.phone_number,
        type: user.type,
        password: user.password,
      },
    });
  },

  login: async (req: Request, res: Response) => {
    const { email, password } = req.body;

    const user = await UserRepository.getUserByEmail(email);

    if (!email || !password) {
      throw new BadRequestError("Please provide email and password");
    }

    if (!user || !(await user.comparePassword(password))) {
      return res
        .status(StatusCodes.UNAUTHORIZED)
        .json({ message: "Invalid email or password" });
    }

    const token = jwt.sign(
      { id: user._id, type: user.type },
      configs.ACCESS_TOKEN_SECRET || "",
      {
        expiresIn: "7d",
      }
    );

    res.status(StatusCodes.OK).json({ user, token });
  },
};

export default AuthController;
