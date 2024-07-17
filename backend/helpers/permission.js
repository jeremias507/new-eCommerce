import userModel from '../models/auth.js'

export const uploadProductPermission = async(userId) =>{
    const user = userModel.findById(userId)
    if(!user){
        throw new Error("User not found")
    }
  
    if(user.role !== "ADMIN"){
        return false  
    }

    return true;
}