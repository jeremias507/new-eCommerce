import productModel from "../../models/productModel.js";

export const getProductController = async (req, res) => {
  try {
    const allProduct = await productModel.find().sort({ createdAt: -1 });

    res.status(200).json({
      data: allProduct,
      success: true,
      error: false,
      message: "All Products",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
