import { useContext, useState } from "react";
import logo from "../../../../assets/PMS 3.png";
import profileImgC from "../../../../assets/Group 48102075.png";

import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../../../Context/ToastContext";
import { countryValidation, emailValidation, passwordValidation, phoneNumberValidation, userNameValidation } from "../../../../lib/inputValidate";
import { userRegister } from "../../../../services/user";
import axiosInstance from "../../../../axios";

const Register = () => {
    const {getToastValue}=useContext(ToastContext)

    const {
        register,
        handleSubmit,
        watch,
        formState: { errors },
    } = useForm();
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [isConfirmPasswordShown, setisConfirmPasswordShown] = useState(false);
    const navigate = useNavigate();

    const appendToFormData = (data) => {
        const formData = new FormData();
        formData.append("userName", data.userName);
        formData.append("email", data.email);
        formData.append("country", data.country);
        formData.append("phoneNumber", data.phoneNumber);
        formData.append("password", data.password);
        formData.append("confirmPassword", data.confirmPassword);
        formData.append("profileImage", data.profileImage);

        return formData;
    };
    const onSubmit = async (data) => {
        const dataFormData: FormData = appendToFormData(data);
        try {
            const response = await userRegister(dataFormData)
                getToastValue('success',response.data.message)
                navigate("/verify-account");
        } catch (error) {
            console.log(error);
            getToastValue('error',error.response.data.message)
        }
    };

    const handlePasswordVisibility = (e,setterFn)=>{
        e.preventDefault();
        setterFn(prev=>!prev);
    }

    return (
        <>
            <div className="register-container">
                <div className="container-fluid vh-100">
                    <div className="row vh-100 justify-content-center align-items-center">
                        <div className="col-md-9">
                            <div className="text-center">
                                <img src={logo} alt="" />
                            </div>
                            <div className="register-form rounded-5 mt-4 p-5">
                                <div className="ms-5 ps-4">
                                    <p className="text-light m-0">welcome to PMS</p>
                                    <h3 className="register-text-color ">
                                        <span className="underLine">C</span>reate New Account
                                    </h3>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className=" pt-4 pb-5">
                                    <div className="row justify-content-center">
                                        <div className="col-md-4">
                                            <div className="input-group mb-3 d-flex justify-content-center">
                                                <input
                                                    type="file"
                                                    id="fileInput"
                                                    className="File-input d-none"
                                                    {...register("profileImage", {})}
                                                />
                                                <label
                                                    htmlFor="fileInput"
                                                    className="custom-file-label justify-content-center"
                                                >   
                                                    <div className="profileImg">
                                                    <img src={profileImgC} alt="" className="cursor-pointer"/>
                                                    </div>
                                                </label>
                                            </div>
                                        </div>
                                    </div>
                                    <div className="row justify-content-evenly">
                                        <div className="col-md-5">
                                            <div className="input-group mb-3">
                                                <p className="my-1 register-text-color">User Name</p>
                                                <input
                                                    type="text"
                                                    className="input-style"
                                                    placeholder="Enter Your User Name"
                                                    {...register("userName", userNameValidation)}
                                                />
                                            </div>
                                            {errors.userName && (
                                                <p className="alert alert-danger">
                                                    {errors.userName.message}
                                                </p>
                                            )}

                                            <div className="input-group mb-3">
                                                <p className="my-1 register-text-color">Country</p>
                                                <input
                                                    type="text"
                                                    className="input-style"
                                                    placeholder="Enter Your Country"
                                                    {...register("country",countryValidation)}
                                                />
                                            </div>
                                            {errors.country && (
                                                <p className="alert alert-danger">
                                                    {errors.country.message}
                                                </p>
                                            )}

                                            <div className="input-group mb-3 position-relative">
                                                <p className="my-1 register-text-color">Password</p>
                                                <input
                                                    type={isPasswordShown ? "text" : "password"}
                                                    className="input-style"
                                                    placeholder="Enter Your Password"
                                                    {...register("password", passwordValidation)}
                                                />
                                                <div className="position-absolute end-0 px-2 py-4 mt-3">
                                                    <button onClick={(e)=>handlePasswordVisibility(e,setIsPasswordShown)} className="showPassBtn">
                                                        {isPasswordShown ? (
                                                            <i className="fa-regular fa-eye"></i>
                                                        ) : (
                                                            <i className="fa-regular fa-eye-slash"></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            {errors.password && (
                                                <p className="alert alert-danger">
                                                    {errors.password.message}
                                                </p>
                                            )}
                                        </div>
                                        <div className="col-md-5">
                                            <div className="input-group pb-3">
                                                <p className="my-1 register-text-color">E-mail</p>
                                                <input
                                                    type="text"
                                                    className="input-style"
                                                    placeholder="Enter your E-mail"
                                                    {...register("email",emailValidation)}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="alert alert-danger">
                                                    {errors.email.message}
                                                </p>
                                            )}

                                            <div className="input-group pb-3">
                                                <p className="my-1 register-text-color">Phone Number</p>
                                                <input
                                                    type="text"
                                                    className="input-style"
                                                    placeholder="Enter Your Phone Number"
                                                    {...register("phoneNumber", phoneNumberValidation)}
                                                />
                                            </div>
                                            {errors.phoneNumber && (
                                                <p className="alert alert-danger">
                                                    {errors.phoneNumber.message}
                                                </p>
                                            )}

                                            <div className="input-group mb-3 position-relative">
                                                <p className="my-1 register-text-color">
                                                    Confirm Password
                                                </p>
                                                <input
                                                    type={isConfirmPasswordShown ? "text" : "password"}
                                                    className="input-style"
                                                    placeholder="Confirm Your Password"
                                                    {...register("confirmPassword", {
                                                        required: "Confirm Password is required",
                                                        validate: (value) =>
                                                            value === watch("password") ||
                                                            "Passwords do not match",
                                                    })}
                                                />
                                                <div className="position-absolute end-0 px-2 py-4 mt-3">
                                                    <button onClick={(e)=>handlePasswordVisibility(e,setisConfirmPasswordShown)} className="showPassBtn">
                                                        {isConfirmPasswordShown ? (
                                                            <i className="fa-regular fa-eye"></i>
                                                        ) : (
                                                            <i className="fa-regular fa-eye-slash"></i>
                                                        )}
                                                    </button>
                                                </div>
                                            </div>
                                            {errors.confirmPassword && (
                                                <p className="alert alert-danger">
                                                    {errors.confirmPassword.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button className="btn btn-warning text-light px-5 py-2 mt-4 fs-5">
                                            Register
                                        </button>
                                    </div>
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default Register;
