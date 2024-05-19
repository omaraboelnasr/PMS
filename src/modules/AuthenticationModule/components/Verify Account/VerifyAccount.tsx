import { useContext, useEffect, useState } from "react";
import logo from "../../../../assets/PMS 3.png";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { ToastContext } from "../../../../Context/ToastContext";
import { userVerifyAccount } from "../../../../services/user";

const VerifyAccount = () => {
    const { getToastValue } = useContext(ToastContext);

    const navigate = useNavigate();
    const [disableSubmitBtn, setDisableSubmitBtn] = useState(false);
    const {
        register,
        handleSubmit,
        formState: { errors,isSubmitting },
    } = useForm();
    
    const onSubmit = async (data) => {
        try {
            const response = await userVerifyAccount(data)
            getToastValue("success",response.data.message?response.data.message:"Verification success you can login now");
            navigate("/login");
        } catch (error) {
            getToastValue("error", error.response.data.message);
        }
    };

    useEffect(()=>{
        if(isSubmitting){
            setDisableSubmitBtn(true)
        }else{
            setDisableSubmitBtn(false)
        }
    },[isSubmitting])
    return (
        <>
            <div className="register-container">
                <div className="container-fluid vh-100">
                    <div className="row vh-100 justify-content-center align-items-center">
                        <div className="col-md-6">
                            <div className="text-center">
                                <img src={logo} alt="" />
                            </div>
                            <div className="register-form rounded-5 mt-4 p-5">
                                <div className="ms-4">
                                    <p className="text-light m-0">welcome to PMS</p>
                                    <h3 className="register-text-color ">
                                        <span className="underLine">V</span>erify Account
                                    </h3>
                                </div>
                                <form onSubmit={handleSubmit(onSubmit)} className=" pt-4 pb-5">
                                    <div className="row justify-content-evenly">
                                        <div className="col-md-11">
                                            <div className="input-group pb-3">
                                                <p className="my-1 register-text-color">E-mail</p>
                                                <input
                                                    type="text"
                                                    className="input-style"
                                                    placeholder="Enter your E-mail"
                                                    {...register("email", {
                                                        required: "Email is required",
                                                        pattern: {
                                                            value: /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g,
                                                            message: "Invalid mail",
                                                        },
                                                    })}
                                                />
                                            </div>
                                            {errors.email && (
                                                <p className="alert alert-danger">
                                                    {errors.email.message}
                                                </p>
                                            )}

                                            <div className="input-group pb-3">
                                                <p className="my-1 register-text-color">
                                                    OTP Verfication
                                                </p>
                                                <input
                                                    type="text"
                                                    className="input-style"
                                                    placeholder="Enter OTP Code"
                                                    {...register("code", {
                                                        required: "OTP is required",
                                                    })}
                                                />
                                            </div>
                                            {errors.code && (
                                                <p className="alert alert-danger">
                                                    {errors.code.message}
                                                </p>
                                            )}
                                        </div>
                                    </div>
                                    <div className="d-flex justify-content-center">
                                        <button
                                            className="btn btn-warning text-light px-5 py-2 mt-4 fs-5"
                                            disabled={disableSubmitBtn}
                                        >
                                            Save
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

export default VerifyAccount;
