import { Router } from "express";
import { userDetailsController } from "../controllers/user/authDetails.js";

import {
  signIn,
  signUp,
  verifyToken,
  logout,
} from "../controllers/user/auth.js";
import { signInSchema, signUpSchema } from "../schemas/auth.schema.js";
import { validatorSchema } from "../middleware/validator.schema.js";
import { authToken } from "../middleware/authToken.js";
import { allUser } from "../controllers/user/allUsers.js";
import { updateUser } from "../controllers/user/updateUser.js";
import { uploadProducts } from "../controllers/product/uploadProducts.js";
import { getProductController } from "../controllers/product/getProduct.js";
import { updateProductController } from "../controllers/product/updateProduct.js";
import { getCategoryProduct } from "../controllers/product/getCategoryProduct.js";

const router = Router();

router.post("/singUp", validatorSchema(signUpSchema), signUp);
router.post("/singIn", validatorSchema(signInSchema), signIn);
router.get("/verify", verifyToken);
router.get("/logout", logout);
router.get("/user-details", authToken, userDetailsController);

// Admin Panel
router.get("/all-user", authToken, allUser);
router.put("/update-user/:id", authToken, updateUser);

//product
router.post("/upload-product", authToken, uploadProducts);
router.get("/get-product", getProductController);
router.put("/update-product/:id", authToken, updateProductController);
router.get("/get-categoryProduct",getCategoryProduct);


export default router;
