import { emailValidation } from "../Validator/Validator.js";
import { useNavigate } from 'react-router-dom';
import  { useState } from 'react'
import logo from "../../../../assets/PMS 3.svg";
import { useForm } from 'react-hook-form';
import { baseUrl } from '../../../../Context/baseUrl.js';
import axios from 'axios';
import { toast } from 'react-toastify';
const ForgetPass = () => {
  const navigate=useNavigate();
  
const [isLoading,setIsLoading]=useState(false);


const {register,handleSubmit,formState:{errors}}=useForm();


const submitEmail=async(data:any)=>{
  try {
    setIsLoading(true);
    const response = await axios.post(`${baseUrl}/Users/Reset/Request`,data);
      console.log(response);
      toast("Check your email please")
    
      navigate("/reset-password")
  
  } catch (error) {
    // console.log(error)
    toast.error(error?.response?.data?.message);
    setIsLoading(false);
  }
  }
  return (
    <>
<div className="auth-container vh-100  d-flex flex-column justify-content-center align-items-center  overflow-auto pageOverflow">
        <div className="logo">
          <img className="form-logo pb-2 " src={logo} alt="logo" />
        </div>
        <form
          onSubmit={handleSubmit(submitEmail)}
          className="form col-xl-5 col-lg-6 col-md-7 col-sm-9 col-10 bg-info rounded-4 p-sm-5 p-3"
        >
          <p className="text-light mb-0 mt-3">welcome to PMS</p>
          <h2 className="form-Name">
            <span>F</span>orget Password
          </h2>

          <div className="  d-flex flex-column gap-3  mt-4">
            <div className=" one-input-group">
              <div
                className="form-outline my-2  text-start   "
                data-mdb-input-init
              >
                <label className="form-label  fw-bold mb-0">E-mail</label>
                <input
                  {...register("email", emailValidation)}
                  className="form-input form-control bg-transparent border-0 rounded-bottom-0   border-secondary border-bottom text-white p-1"
                  type="text"
                  placeholder="Enter your E-mail"
                  aria-label="readonly input example"
                />
                {errors?.email && (
                  <p className="mt-1  text-danger">{errors?.email?.message}</p>
                )}
              </div>
            </div>
          </div>
      

          <div className=" text-center mt-5">
            <button
              type="submit"
              className={`btn btn warningg text-center fw-bold text-white w-75 rounded-5  ${
                isLoading ? "noClick" : ""
              }`}
            >
              {isLoading ?(
                <i className="fas fa-spinner fa-spin"></i>
              ) : "Verify"}
            </button>
          </div>
        </form>
      </div>
    </>
  )
}

export default ForgetPass
