import productModel from "../../models/productModel.js";

export const getCategoryProduct = async (req, res) => {
  try {
    const productCategory = await productModel.distinct("category");

    //array to store one product from each category
    const productByCategory = [];
    for (const category of productCategory) {
      const product = await productModel
        .findOne({ category: category })
        .limit(1);

      if (product) {
        productByCategory.push(product);
      }
    }

    res.status(200).json({
      data: productByCategory,
      success: true,
      error: false,
      message: "category",
    });
  } catch (error) {
    res.status(401).json({
      message: error.message || error,
      error: true,
      success: false,
    });
  }
};
