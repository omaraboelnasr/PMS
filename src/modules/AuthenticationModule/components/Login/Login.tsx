import React, { useContext } from 'react'
import logo from '../../../../assets/PMS 3.png'
import { Link, useNavigate } from 'react-router-dom'
import { useForm } from 'react-hook-form';
import axios from 'axios';
import { toast } from 'react-toastify';
import { AuthContext } from '../../../SharedModule/components/AuthContext/AuthContext';

export default function Login() {

  const {baseUrl} = useContext(AuthContext)

  const { register, handleSubmit, formState: { errors } } = useForm()

  const navigate = useNavigate()

  const onSubmit = async (data:any) => {
    try {
      const response = await axios.post(`${baseUrl}/Users/Login`, data)
      localStorage.setItem('token' , response.data.token)
      console.log(response);
         toast.success("logged in successfully", {
         autoClose: 3000,
         hideProgressBar: true,
         pauseOnHover: false
         });
      navigate('/dashboard')
    } catch (error) {
         toast.error(error.response.data.message, {
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
                  <h2 className='main-color' >
                    Login
                  </h2>
                </div>
                <form className='mt-4' onSubmit={handleSubmit(onSubmit)}>
                  <div className="input-group my-3  ">
                    <label className='main-color'>E-mail</label>
                    <input type="text" className='w-100 p-2 ' placeholder='Enter Your E-mail'
                      {...register('email', {required:'Email Is Required' ,   pattern: {
                          value: /^[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,4}$/,
                          message: "Invalid mail",
                        }})} />
                  </div>
                  {errors.email && (<p className='alert alert-danger'>{errors.email.message}</p>)}
                  <div className="input-group my-3 ">
                  <label className='main-color'>Password</label>
                  <input type="text" className='w-100 p-2' placeholder='Enter Your Password'
                  {...register('password', { required: 'Password Is Requires' })} />
                  </div>
                  {errors.password && (<p className='alert alert-danger'>{errors.password.message}</p>)}
                  <div className="login-links d-flex  justify-content-between ">
                  <Link to={'/register'}>Register Now ?</Link>
                  <Link to={'/forget-pass'}>Forget Password ?</Link>
                  </div>
                  <div className="button m-1">
                  <button className='form-button w-100 py-3 rounded-5 mt-3 text-white '>Login</button>
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
