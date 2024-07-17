import productModel from "../models/productModel.js";

export const createProduct = async (data) => {
  const {
    productName,
    brandName,
    category,
    productImage,
    description,
    price,
    sellingPrice,
  } = data;
  
  try {
    const newProduct = new productModel({
      productName,
      brandName,
      category,
      productImage,
      description,
      price,
      sellingPrice,
    });

    const saveProduct = await newProduct.save();
    return saveProduct;
  } catch (error) {
    console.log(error);
  }
};
