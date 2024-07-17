import axios from "./axios"; 

export const RegisterRequest = async (data) =>{
    return await axios.post('/singUp',data)
} 
export const LoginRequest = async (data) =>{
    return await axios.post('/singIn',data)
}
export const verifyTokenRequest = async () =>{
    return await axios.get('/verify');
}

export const UserDetailsRequest = async () =>{
    return await axios.get('/user-details')
}

export const logoutRequest = async () =>{
    return await axios.get('/logout')
}

export const AllUserRequest = async () =>{
    return await axios.get('/all-user')
}

export const UpdateUserRequest = async (id,payload) =>{
    return await axios.put(`/update-user/${id}`,payload)
} 

export const UploadImageRequest = async (payload) =>{
    return await axios.post(`/upload-product`,payload)
} 

export const AllProductRequest = async () =>{
    return await axios.get("/get-product")
} 

export const UpdateProductRequest = async (id,payload) =>{
    return await axios.put(`/update-product/${id}`,payload)
} 

export const categoryProductRequest = async () =>{
    return await axios.get(`/get-categoryProduct`)
} 


