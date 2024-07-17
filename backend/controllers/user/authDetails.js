import UserModel from "../../models/auth.js";

export const userDetailsController = async (req, res) => {
  try {
    const user = await UserModel.findById(req.user.id);

    res.status(200).json({
      data: user,
      error: false,
      success: true,
      message: "User details",
    });
  } catch (error) {
    res.status(400).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
