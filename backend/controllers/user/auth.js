import { signInService, signUpServices } from "../../services/auth.js";
import jwt from "jsonwebtoken";
import User from "../../models/auth.js";
export const signUp = async (req, res) => {
  try {
    const response = await signUpServices(req.body);
    if (response === "The email is all ready in use") {
      return res.status(400).json({
        message: ["The email is all ready in use"],
        error: true,
        succes: false,
      });
    }

    const { token, user } = response;
    res.cookie("token", token);
    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "User created Successfully!",
    });
  } catch (error) {
    res.status(401).json({
      message: error,
      error: true,
      succes: false,
    });
  }
};

export const signIn = async (req, res) => {
  try {
    const response = await signInService(req.body);

    if (response === "The email is not defined") {
      return res.status(400).json({ message: ["The email is not undefined"] });
    }

    if (response === "Password incorrect") {
      return res.status(400).json({ message: ["Password incorrect"] });
    }

    const { token, user } = response;
    res.cookie("token", token);
    res.status(200).json({
      data: user,
      success: true,
      error: false,
      message: "Login Successfully!",
    });
  } catch (error) {
    res.status(401).json({
      message: error,
      error: true,
      succes: false,
    });
  }
};

export const verifyToken = async (req, res) => {
  const { token } = req.cookies;
  if (!token) return res.send(false);

  jwt.verify(token, "1234eersd", async (error, user) => {
    if (error) return res.sendStatus(401);

    const userFound = await User.findById(user.id);
    if (!userFound) return res.sendStatus(401);

    return res.json({
      id: userFound._id,
      lastname: userFound.lastname,
      firstname: userFound.firstname,
      email: userFound.email,
    });
  });
};

export const logout = async (req, res) => {
  try {
    res.clearCookie("token");

    res.json({
      message: "Logged out successfully",
      error: false,
      success: true,
      data: [],
    });
  } catch (error) {
    res.json({
      message: error.mensaje || error,
      error: true,
      success: false,
    });
  }
};
