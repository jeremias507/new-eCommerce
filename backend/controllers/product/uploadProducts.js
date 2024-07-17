import { uploadProductPermission } from "../../helpers/permission.js";
import { createProduct } from "../../services/product.js";

export const uploadProducts = async (req, res) => {
  try {
    const sessionUserId = req.user.id;
    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const response = await createProduct(req.body);

    const dataProduct = response;

    res.status(200).json({
      data: dataProduct,
      success: true,
      error: false,
      message: "Product upload successfully!!",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
