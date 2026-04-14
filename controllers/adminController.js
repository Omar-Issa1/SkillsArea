import User from "../models/User.js";
import CustomError from "../error/customError.js";
import { StatusCodes } from "http-status-codes";

export const createUser = async (req, res, next) => {
  try {
    const { username, password, role } = req.body;

    // validation
    if (!username || !password) {
      throw new CustomError("Username and password are required", 400);
    }

    // check if user exists
    const existingUser = await User.findOne({ username });
    if (existingUser) {
      throw new CustomError("Username already exists", 400);
    }

    const user = await User.create({
      username,
      password,
      role: role || "user",
    });

    res.status(StatusCodes.CREATED).json({
      success: true,
      user: {
        id: user._id,
        username: user.username,
        role: user.role,
      },
    });
  } catch (error) {
    next(error);
  }
};
