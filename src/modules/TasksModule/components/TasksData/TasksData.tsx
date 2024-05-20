import axios from "axios";
import { useContext, useEffect, useState } from "react";
import { SubmitHandler, useForm } from 'react-hook-form';
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { AuthContext } from "../../../../Context/AuthContext";
import { FormData, User } from "../../../../Interfaces/Interfaces";


const TasksData: React.FC = () => {
  const {requestHeaders , baseUrl} = useContext(AuthContext)
  const navigate = useNavigate();
  const navigateToTasks = () => {
    navigate('/dashboard/tasks');
  };

  const { register, handleSubmit, formState: { errors }, reset } = useForm<FormData>();
  const submitForm: SubmitHandler<FormData> = async (data) => {
    console.log(data);
    try {
      const response = await axios.post(`${baseUrl}/Task`, data, {
        headers: 
          requestHeaders
        ,
      });
      toast.success('Task Added Successfully');
      console.log(response);
      reset();
      
    } catch (error) {
      if (axios.isAxiosError(error)) {
        toast.error(error.response?.data?.message || 'An error occurred');
      } else {
        toast.error('An unexpected error occurred');
      }
    }
  };

  const [usersList, setUsersList] = useState<User[]>([]);
  const [projectsList, setProjectsList] = useState<User[]>([]);

  const getUsersList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Users/Manager`, {
        headers: requestHeaders,
      });
      setUsersList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const getProjectsList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Project/manager`, {
        headers: requestHeaders,
      });
      setProjectsList(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getUsersList();
    getProjectsList()
  }, []);

  return (
    <>
      <ToastContainer />
      <div className="tasksList pb-4 vh-100">
        <div className="comp-title w-100 mb-5 pb-2 ps-5 bg-white">
          <button onClick={navigateToTasks} className="btn">
            <i className="fa-solid fa-angle-left me-2"></i>View All Tasks
          </button>
          <h2>Add New Task</h2>
        </div>
        <form onSubmit={handleSubmit(submitForm)}>
          <div className="w-75 mx-auto">
            <div className="list-container p-3 bg-white rounded-4 shadow-lg">
              <div className="mb-3">
                <label className="form-label mb-0">Title</label>
                <input
                  type="text"
                  className="form-control muted-placeholder border-radius"
                  id="exampleFormControlInput1"
                  placeholder="Name"
                  {...register("title", {
                    required: "Title is required",
                  })}
                />
                {errors.title && <p className="text-warning">*{errors.title.message}</p>}
              </div>
              <div className="mb-3">
                <label className="form-label mb-0">Description</label>
                <textarea
                  className="form-control muted-placeholder border-radius"
                  id="exampleFormControlTextarea1"
                  placeholder="Description.."
                  rows={3}
                  {...register("description", {
                    required: "Description is required",
                  })}
                ></textarea>
                {errors.description && <p className="text-warning">*{errors.description.message}</p>}
              </div>

              <div className="d-flex justify-content-between">
                <div className="col-md-5">
                  <label className="form-label mb-0">User</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("employeeId", {
                      required: "Employee is required",
                    })}
                  >
                    <option value="">No Users Selected</option>
                    {usersList.map((user) => (
                      <option key={user.id} value={user.id}>
                        {user.userName}
                      </option>
                    ))}
                  </select>
                  {errors.employeeId && <p className="text-warning">*{errors.employeeId.message}</p>}
                </div>
                <div className="col-md-5">
                  <label className="form-label mb-0">Project</label>
                  <select
                    className="form-select"
                    aria-label="Default select example"
                    {...register("projectId", {
                      required: "Project is required",
                    })}
                  >
                    <option value="">No Projects Selected</option>
                    {projectsList.map((project) => (
                      <option key={project.id} value={project.id}>
                        {project.title}
                      </option>
                    ))}
                  </select>
                  {errors.projectId && <p className="text-warning">*{errors.projectId.message}</p>}
                </div>
              </div>

              <hr className="my-5" />

              <div className="d-flex justify-content-between">
                <button onClick={navigateToTasks}  className="btn btn-white border-black rounded-pill py-2 px-4" type="button">
                  Cancel
                </button>
                <button className="btn btn-warning rounded-pill py-2 px-4 text-white" type="submit">
                  Save
                </button>
              </div>
            </div>
          </div>
        </form>
      </div>
    </>
  );
};

export default TasksData;
