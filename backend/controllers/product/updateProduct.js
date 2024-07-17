import productModel from "../../models/productModel.js";
import { uploadProductPermission } from "../../helpers/permission.js";

export const updateProductController = async (req, res) => {
  try {
    const sessionUserId = req.user.id;

    if (!uploadProductPermission(sessionUserId)) {
      throw new Error("Permission denied");
    }

    const { id } = req.params;

    const {
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice,
    } = req.body;

    const updatedProduct = await productModel.findByIdAndUpdate(
      id,
      {
        productName,
        brandName,
        category,
        productImage,
        description,
        price,
        sellingPrice,
      },
      { new: true }
    );

    res.status(200).json({
      data: updatedProduct,
      success: true,
      error: false,
      message: "Product updated successfully",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
