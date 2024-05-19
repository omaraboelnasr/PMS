import axiosInstance from "../axios"


export const userRegister = async (data)=>{
    try{
        const response = await axiosInstance.post('/Users/Register',data)
        return response
    }catch(error){
        throw error;
    }
}

export const userVerifyAccount = async (data)=>{
    try{
        const response = await axiosInstance.put('/Users/verify',data)
        return response
    }catch(error){
        throw error
    }
}