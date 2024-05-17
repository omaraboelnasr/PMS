import React, { useContext } from 'react'
import logo from '../../../../assets/PMS 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { ApiContext } from '../../../SharedModule/components/ApiContext/ApiContext';
import { validateEmail, validatePassword } from '../../../validation'

export default function Login() {

  const {baseUrl} = useContext(ApiContext)

  const { register, handleSubmit, formState: { errors , isDirty , isValid } } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (data:any) => {
    try {
      const response = await axios.post(`${baseUrl}/Users/Login`, data)
      localStorage.setItem('token', response.data.token)
         toast.success( response.data.message || "logged in successfully", {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
         });
      navigate('/dashboard')
    } catch (error) {
         toast.error(error.response.data.message || 'Unable to log in', {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
       });
    }
  }

  return (
    <>
      <div className="login-bg  min-vh-100 d-flex justify-content-center align-items-center  ">
        <div className="container ">
          <div className="row justify-content-center align-items-center  ">
            <div className="col-md-6 ">
              <div className="logo text-center ">
                <img src={logo} className='w-50' alt="" />
              </div>
              <div className="login-form p-5 my-2 rounded-4 ">
                <div className="login-title mb-3">
                  <p className='my-0 text-white small '>welcome to PMS</p>
                  <h2  >
                    Login
                  </h2>
                </div>
                <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group my-3  ">
                    <label >E-mail</label>
                    <input type="text" className='w-100 p-2 ' placeholder='Enter Your E-mail'
                      {...register('email', {required:validateEmail.required ,   pattern: {
                          value: validateEmail.pattern.value,
                          message: validateEmail.pattern.message,
                        }})} />
                  </div>
                  {errors.email && (<p className='alert alert-danger'>{errors.email.message}</p>)}
                  <div className="input-group my-3 ">
                  <label >Password</label>
                  <input type="text" className='w-100 p-2' placeholder='Enter Your Password'
                      {...register('password', {required: validatePassword.required , pattern: {
                        value: validatePassword.pattern.value,
                        message:validatePassword.pattern.message
                  }})} />
                  </div>
                  {errors.password && (<p className='alert alert-danger'>{errors.password.message}</p>)}
                  <div className="login-links d-flex  justify-content-between ">
                  <Link to={'/register'}>Register Now ?</Link>
                  <Link to={'/forget-pass'}>Forget Password ?</Link>
                  </div>
                  <div className="button m-1">
                    <button
                      disabled={!isDirty || !isValid}
                      className={` ${!isDirty || !isValid ? 'disabled form-button w-100 py-3 rounded-5 mt-3 text-white opacity-50' : 'form-button w-100 py-3 rounded-5 mt-3 text-white'}`}>Login</button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
