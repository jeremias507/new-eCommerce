import mongoose from "mongoose"; 
export const connectDb = async()=>{
    try {
      await mongoose.connect(process.env.MONGODB_URI)
      console.log("MongoDB is connected")
    } catch (error) {
        console.log("Error al conectar la DB", error)
    }
}   