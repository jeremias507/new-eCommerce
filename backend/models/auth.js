import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    firstname: {
      type: String,
      require: true,
      trim: true,
    },
    lastname: {
      type: String,
      require: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    password: {
      type: String,
      required: true,
    },
    profilepic: {
      type: String,
    },
    role:{
      type:String
    }
  },
  {
    timestamps: true,
  }
);


export default mongoose.model("user", userSchema)