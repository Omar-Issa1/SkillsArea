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
export const getAllUsers = async (req, res, next) => {
  try {
    const users = await User.find().select("-password -refreshToken");

    res.json({ users });
  } catch (error) {
    next(error);
  }
};
export const updateUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndUpdate(id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ user });
  } catch (error) {
    next(error);
  }
};
export const deleteUser = async (req, res, next) => {
  try {
    const { id } = req.params;

    const user = await User.findByIdAndDelete(id);

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    res.json({ message: "User deleted" });
  } catch (error) {
    next(error);
  }
};
export const getUsers = async (req, res, next) => {
  try {
    let { q, page = 1, limit = 10 } = req.query;

    page = Number(page);
    limit = Number(limit);

    if (limit > 50) limit = 50;

    const queryObject = {};

    if (q) {
      queryObject.username = { $regex: q, $options: "i" };
    }

    const skip = (page - 1) * limit;

    const users = await User.find(queryObject)
      .select("-password -refreshToken")
      .skip(skip)
      .limit(limit)
      .sort("-createdAt");

    const total = await User.countDocuments(queryObject);

    res.json({
      total,
      page,
      pages: Math.ceil(total / limit),
      users,
    });
  } catch (error) {
    next(error);
  }
};
