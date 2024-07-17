import UserModel from "../../models/auth.js";

export const allUser = async (req, res) => {
  try {
    const allusers = await UserModel.find();

    res.status(200).json({
      data: allusers,
      success: true,
      error: false,
      message: "Login Successfully!",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
