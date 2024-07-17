import UserModel from "../../models/auth.js";

export const updateUser = async (req, res) => {
  try {
    const { id } = req.params;
    const { role } = req.body;

    const payload = {
      ...(role && { role: role }),
    };

    const user = await UserModel.findById(req.user.id);

    const updateUser = await UserModel.findByIdAndUpdate(
      id,
      { role: role },
      { new: true }
    );

    res.json({
      data: updateUser,
      message: "User updated successfully",
      success: true,
      error: false,
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
