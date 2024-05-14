import { toast } from 'react-toastify';
import { ToastContext } from '../../../../Context/ToastContext';
import { AuthContext } from '../../../../Context/AuthContext';
import { useContext, useState } from "react";
import logo from "../../../../assets/PMS 3.png";
import { useForm, } from "react-hook-form";
import { useNavigate } from 'react-router-dom';
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa6";

import "react-toastify/dist/ReactToastify.css";
interface formadata {
  oldPassword: string,
  newPassword: string,
  confirmNewPassword: string,

}
import axios from 'axios';
function ChangePass() {
  const navigate = useNavigate();

  const { baseUrl, requestHeader }: any = useContext(AuthContext);
  const { getToasterValue }: any = useContext(ToastContext);

  const [oldpass, setOldpass] = useState(false);
  const [newpass, setNewpass] = useState(false);
  const [confiormpass, setConfiormpass] = useState(false);

  const {
    register,
    handleSubmit,watch,
    formState: { errors },
  } = useForm<formadata>();
  
  const onSubmit = async (data: any) => {

    try {
      let response = await axios.put(
        `${baseUrl}Users/ChangePassword`,
        data, {
        headers: requestHeader,
      }
      );

      
      
      getToasterValue("success", response.data.message);
      
      navigate("/login")
    } catch (error: any) {
     getToasterValue("error", error.response.data.message);
    
    }
  };

  return (

    <div className= "auth-container vh-100  overflow-y-hidden overflow-x-hidden " >
    <div className="row vh-100  justify-content-center  align-items-center" >
      <div className="col-md-6 " >
        <div className="text-center " >
          <img src={ logo } alt = "logo" />
            </div>

            < div className = "form-contentChangpass p-5 rounded rounded-4 " >
              <h5>welcome to PMS < /h5>
                < h3 className = "textChangepass mb-4" > Change Password < /h3>

                  < form onSubmit = { handleSubmit(onSubmit) } >
                    <label htmlFor="" className = "changepassLable" >
                      Old password
                        < /label>
                        < div className = "input-group mb-3 " >
                          <input
                type={ oldpass ? "text" : "password" }
  {...register("oldPassword", {
    required: "Old password is required ",
    min: 4,
    max: 10,
  })
  }
  className = "form-controlChangepass form-control "
  placeholder = "Enter your Old Password"
    />
    <span  className=" input-group-text Changepass" onClick = {()=> setOldpass(!oldpass)
}

id = "basic-addon1"
  >
  { oldpass?<FaEyeSlash />: <FaEye />}
    < /span>
    < /div>

{
  errors.oldPassword && (
    <div className="alert alert-danger " >
      { errors.oldPassword.message }
      < /div>
            )
}
<label className="changepassLable" > New Password < /label>
  < div className = "input-group mb-3" >
    <input
              type={ newpass ? "text" : "password" }
{...register("newPassword", {
  required: "New Password is required ",
  min: 4,
  max: 10,
})
}
className = "form-controlChangepass form-control"
placeholder = "Enter your New Password"
  />
  <span onClick={ () => setNewpass(!newpass) }
className = " input-group-text Changepass"
id = "basic-addon1"
  >
  { newpass?<FaEyeSlash />: <FaEye />}
    < /span>
    < /div>

{
  errors.newPassword && (
    <div  className="alert alert-danger " >
      { errors.newPassword.message }
      < /div>
            )
}

<label className="changepassLable" > Confirm New Password < /label>
  < div className = "input-group mb-3" >
    <input
              type={ confiormpass ? "text" : "password" }
{...register("confirmNewPassword", {
  required: "Confirm New Password is required ",
  min: 4,
  max: 10,
  validate: value => value === watch("newPassword") || "The newPassword do not match"
})
}
className = "form-controlChangepass form-control"
placeholder = "Confirm New Password"
  />
  <span  onClick={ () => setConfiormpass(!confiormpass) }
className = " input-group-text Changepass"
id = "basic-addon1"
  >
  { confiormpass?<FaEyeSlash />: <FaEye />}
    < /span>
    < /div>
{
  errors.confirmNewPassword && (
    <p className="alert alert-danger" >
      { errors.confirmNewPassword.message }
      < /p>
            )
}
<div className="text-center mt-3  " >
  <button className="btn btnChangepass w-75  text-white p-3 rounded rounded-4 " >
    Save
    < /button>
    < /div>
    < /form>
    < /div>
    < /div>
    < /div>
    < /div>
   
  );
}
export default ChangePass;