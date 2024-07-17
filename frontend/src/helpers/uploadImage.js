const url = `https://api.cloudinary.com/v1_1/${import.meta.env.VITE_CLOUD_NAME_CLOUDINARY}/image/upload`;
import axios from "axios"

export const uploadImage = async (i) => {
  const formData = new FormData();
  formData.append("file", i);
  formData.append("upload_preset","mern_product");


    const dataResponse = axios.post(url,formData)

    

    return dataResponse;

};
