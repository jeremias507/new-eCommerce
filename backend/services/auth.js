import userModel from "../models/auth.js";
import { encryptPassword, verified } from "../utils/encrypt.js";
import { createAccesToken } from "../utils/jwt.js";

export const signUpServices = async (data) => {
  try {
    const {
      email,
      password,
   
    } = data;

    const userFoud = await userModel.findOne({ email });
   
    if (userFoud) return "The email is all ready in use";
   

    const passwordHash = await encryptPassword(password);
   
    const newUser = new userModel({
      ...data,
      password: passwordHash,
      role:"GENERAL"
    });

    const userSaved = await newUser.save();

    const  token = await createAccesToken({id:userSaved._id})

    return {
      user: {
         data:userSaved
      },
      token
    }
  } catch (error) {
    console.log(error);
  }
};

export const signInService = async (data) => {
  try {
    const { email, password } = data;
    const userFound = await userModel.findOne({ email });

    if (!userFound){
      return "The email is not defined";
    }

    const isMatch = await verified(password, userFound.password);

    if (!isMatch){
      return "Password incorrect";
    }

    const token = await  createAccesToken({ id: userFound._id });

    return {
      user: {
       data:userFound
      },
      token,
    };

  } catch (error) {
    console.error(error);
    console.log("Error al intentar iniciar sesión");
    throw new Error("Error al intentar iniciar sesión");
  }
};


