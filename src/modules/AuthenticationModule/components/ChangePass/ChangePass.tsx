import { ToasterContext } from './../../../../Context/ToastContext';
import { AuthContext } from './../../../../Context/AuthContext';
import React, { useContext } from "react";
import logo from "../../../../assets/PMS 3.png";
import { useForm  } from "react-hook-form";

import axios from 'axios';
function ChangePass() {
  //const navigate=useNavigate();

  const {loginInfo ,baseUrl,requestHeader}= useContext(AuthContext);
 
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();
  const onSubmit = async (data:any) => {
    
    try {
      let response = await axios.put(
        `${baseUrl}Users/ChangePassword`,
        data, {
          headers:requestHeader,
        }
      );

      getToasterValue("success",response.data.message);
      navigate("/login")
    } catch (error:any) {
      getToasterValue("error",error.response.data.message);
    }
  };

  return (
    <>
      <div className="auth-container vh-100  overflow-y-hidden overflow-x-hidden ">
        <div className="row vh-100  justify-content-center  align-items-center">
          <div className="col-md-6 ">

            <div className="text-center ">
              <img src={logo} alt="logo" />
            </div>
            
            <div className="form-contentChangpass p-5 rounded rounded-4 ">

          
          <h5>welcome to PMS</h5>
          <h3 className="textChangepass mb-4">Change Password</h3>
         

              <form onSubmit={handleSubmit(onSubmit)}>

              <labal className="changepassLable">Old password</labal>
              <div className="input-group mb-3 ">
              <input type="password"  {...register(oldPassword,{required:"Old password is required ", min: 4, max: 10})} className="form-controlChangepass form-control " placeholder="Enter your Old Password"  />
              <span className=" input-group-text Changepass" id="basic-addon1"><i className="fa-solid fa-eye"></i></span>
          </div>
          {errors.oldPassword&& <p className="alert alert-danger ">{errors.oldPassword.message}</p>}
              <labal className="changepassLable">New Password</labal>
              <div className="input-group mb-3">
              <input type="password" {...register(newPassword,{required:"New Password is required ", min: 4, max: 10})} className="form-controlChangepass form-control" placeholder="Enter your New Password"  />
              <span className=" input-group-text Changepass" id="basic-addon1"><i className="fa-solid fa-eye"></i></span>
          </div>
          {errors.newPassword&& <p className="alert alert-danger ">{errors.newPassword.message}</p>}
              <labal className="changepassLable">Confirm New Password</labal>
              <div className="input-group mb-3">
              <input type="password" {...register(confirmNewPassword,{required:"Confirm New Password is required ", min: 4, max: 10})} className="form-controlChangepass form-control" placeholder="Confirm New Password" />
              <span className=" input-group-text Changepass" id="basic-addon1"><i className="fa-solid fa-eye"></i></span>
          </div>
          {errors.confirmNewPassword&& <p className="alert alert-danger ">{errors.confirmNewPassword.message}</p>}
             <div className="text-center mt-3  ">
          <button className="btn btnChangepass w-75  text-white p-3 rounded rounded-4 ">Save</button>
          </div>
              </form> 
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
export default ChangePass;