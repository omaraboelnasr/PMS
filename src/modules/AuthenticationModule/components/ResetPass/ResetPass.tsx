import { useState } from 'react';
import logo from '../../../../assets/PMS 3.png';
import { useForm, SubmitHandler } from 'react-hook-form';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

interface FormData {
  email: string;
  seed: string;
  password: string;
  confirmPassword: string;
}

export default function ResetPass() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false); // State to toggle password visibility
  const [showConfirmPassword, setShowConfirmPassword] = useState(false); // State to toggle confirm password visibility

  const { register, handleSubmit, formState: { errors } } = useForm<FormData>();

  const submitForm: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post("https://upskilling-egypt.com:3003/api/v1/Users/Reset", data);
      console.log(response);
      toast.success('Reset Password Successfully');
      navigate('/login');
    } catch (error) {
      toast.error(error?.response?.data?.message || 'An error occurred'); // Handling error and displaying error message
    }
  };

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword); // Toggle password visibility
  };

  const toggleConfirmPasswordVisibility = () => {
    setShowConfirmPassword(!showConfirmPassword); // Toggle confirm password visibility
  };

  return (
    <>
      <ToastContainer />
      <div className='resetPass'>
        <div className="container">
          <div className='row justify-content-center'>
            <div className='col-md-5'>
              <div className='reset-logo text-center'>
                <img src={logo} alt="" />
              </div>
              <div className='reset-form px-5 py-2'>
                <div className='my-4'>
                  <p className='my-0 text-white'>Welcome to PMS</p>
                  <h3 className='text-main'><span className='text-decoration-underline'>R</span>eset Password</h3>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                  {/* Email input */}
                  <div className='my-3'>
                    <label className="form-label text-main my-0">E-mail</label>
                    <input
                      type="text"
                      className="form-control px-0 text-white"
                      placeholder="Enter your email"
                      {...register("email", {
                        required: "Email is required",
                        pattern: {
                          value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i,
                          message: 'Invalid email format'
                        }
                      })}
                    />
                    {errors.email && <p className='text-warning'>*{errors.email.message}</p>}
                  </div>
                  {/* OTP verification input */}
                  <div className='my-3'>
                    <label className="form-label text-main my-0">OTP Verification</label>
                    <input
                      type="text"
                      className="form-control px-0 text-white"
                      placeholder="Enter OTP"
                      {...register("seed", { required: "OTP is required" })}
                    />
                    {errors.seed && <p className='text-warning'>*{errors.seed.message}</p>}
                  </div>
                  {/* New password input */}
                  <div className='my-3'>
                    <label className="form-label text-main my-0">New Password</label>
                    <div className="input-group">
                      <input
                        type={showPassword ? "text" : "password"}
                        className="form-control px-0 text-white"
                        placeholder='Enter your New Password'
                        {...register("password", { required: "Password is required" })}
                      />
                      <button
                        type="button"
                        className="btn btn-transparent"
                        onClick={togglePasswordVisibility}
                      >
                        {showPassword ? <i className="fa-regular fa-eye-slash"></i> : <i className="fa-regular fa-eye"></i>} {/* Show/hide eye icon */}
                      </button>
                    </div>
                    {errors.password && <p className='text-warning'>*{errors.password.message}</p>}
                  </div>
                  {/* Confirm password input */}
                  <div className='my-3'>
                    <label className="form-label text-main my-0">Confirm Password</label>
                    <div className="input-group">
                      <input
                        type={showConfirmPassword ? "text" : "password"}
                        className="form-control px-0 text-white"
                        placeholder='Confirm New Password'
                        {...register("confirmPassword", { required: "Confirm password is required" })}
                      />
                      <button
                        type="button"
                        className="btn btn-transparent"
                        onClick={toggleConfirmPasswordVisibility}
                      >
                        {showConfirmPassword ? <i className="fa-regular fa-eye-slash "></i> : <i className="fa-regular fa-eye"></i>} {/* Show/hide eye icon */}
                      </button>
                    </div>
                    {errors.confirmPassword && <p className='text-warning'>*{errors.confirmPassword.message}</p>}
                  </div>
                  {/* Submit button */}
                  <button className='w-100 my-3 btn-save'>Save</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
