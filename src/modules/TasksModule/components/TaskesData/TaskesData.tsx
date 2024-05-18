import axios from "axios";
import { SetStateAction, useEffect, useState } from "react";
import { useNavigate ,Link} from "react-router-dom";
import { toast } from "react-toastify";
import { SubmitHandler, useForm } from "react-hook-form";
import { baseUrl } from "../../../../Context/baseUrl";
import Select from "react-select";
interface FormValues {
  title: string;
  description: string;
  employeeId?: number;
  projectId?: number;
}
interface projectType {
  id: number;
  title: string;
  description: string;
}
const TaskesData = () => {
  const [userList, setUserList] = useState([]);
  const [projectList, setProjectList] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const navigate = useNavigate();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    setError,
  } = useForm<FormValues>();
  const goBack = () => {
    navigate(-1);
  };
  // Fucntion to add new tasks
  const addNewTask: SubmitHandler<FormValues> = async (data: FormValues) => {
    try {
      const response = await axios.post(`${baseUrl}/Task`, data, {});
      console.log(response);
      toast.success("Task added suceessfully");
      setIsLoading(false);
      navigate("/dashboard/tasks");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    }
  };
  // fucntion to get the user's
  const getUsersList = async () => {
    try {
      const response = await axios.get(
        `${baseUrl}/Users/?pageSize=100&pageNumber=1`,
        {}
      );

      setUserList(response?.data?.data);
    } catch (error) {
      toast.error("An error occurred. Please try again.");
    }
  };
  // fucntion to get the Projects
  const getAllProjectsList = () => {
    axios
      .get(`${baseUrl}/Project/?pageSize=10000&pageNumber=1`)
      .then((response) => {
        setProjectList(response?.data?.data);
      })
      .catch((error) => {
        toast.error(
          error.response.data.message || "An error occurred. Please try again."
        );
      });
  };

  useEffect(() => {
    getUsersList();
    getAllProjectsList();
  }, []);

  const handleUserChange = (selectedOption: SetStateAction<null>) => {
    setSelectedUser(selectedOption);

    setValue("employeeId", selectedOption?.value);
    setError("employeeId", { type: "", message: "" });
  };

  const userOptions = userList.map((user) => ({
    value: user.id,
    label: user.userName,
  }));
  return (
    <>
      {/* Add New Task  */}
      <div className="container-fluid p-4  shadow-sm  mb-4">
        <div className="row align-items-center">
          <div className="col-md-6 E382F">
            <Link
              to="/dashboard/tasks"
              className="fw-light E382F text-decoration-none fs-6"
            >
              <p>&lt; View All Tasks</p>
            </Link>
            <h3>Add a New Task</h3>
          </div>
        </div>
      </div>
      <div className="shadow-lg rounded-4  wdth">
        {/* Add New Task Form */}

        <form
          onSubmit={handleSubmit(addNewTask)}
          action=""
          className="form-wrapper m-auto w-75  pt-5 pb-3 px-5"
        >
          <div className="form-group my-3">
            <label className="label-title mb-2">Title</label>
            <input
              {...register("title", {
                required: true,
              })}
              type="text"
              name="title"
              className="form-control"
              placeholder="Enter Title..."
            />

            {errors.title && errors.title.type === "required" && (
              <span className="text-danger ">title is required</span>
            )}
          </div>
          <div className="form-group my-3">
            <label className="label-title mb-2">Description</label>
            <textarea
              {...register("description", {
                required: true,
              })}
              rows={5}
              name="description"
              className="form-control"
              placeholder="Enter description..."
            ></textarea>

            {errors.title && errors.title.type === "required" && (
              <span className="text-danger ">title is required</span>
            )}
          </div>

          <div className="row">
            <div className="col-md-6">
              <Select
                {...register("employeeId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="text-black"
                options={userOptions}
                value={selectedUser}
                onChange={handleUserChange}
                placeholder="Search user..."
                isClearable
              />

              {errors.employeeId && errors.employeeId.type === "required" && (
                <span className="text-danger ">No User Selected</span>
              )}
            </div>

            <div className="col-md-6 ">
              <select
                {...register("projectId", {
                  required: true,
                  valueAsNumber: true,
                })}
                className="form-select mt-sm-3 mt-md-0"
              >
                <option className="text-muted">Project</option>

                {projectList?.map((project: projectType) => (
                  <>
                    <option key={project?.id} value={project.id}>
                      {project?.title}
                    </option>
                  </>
                ))}
              </select>
              {errors.projectId && errors.projectId.type === "required" && (
                <span className="text-danger ">No Status Selected</span>
              )}
            </div>
          </div>

          <div className="form-group my-3 d-flex justify-content-between align-items-center">
            <button
              onClick={goBack}
              className="btn btn-outline-danger rounded-5"
            >
              Cancel
            </button>
            <button
              className={
                "btn btn-outline-warning rounded-5 my-3 px-4" +
                (isLoading ? " disabled" : "")
              }
            >
              {isLoading == true ? (
                <i className="fas fa-spinner fa-spin"></i>
              ) : (
                "Save"
              )}
            </button>
          </div>
        </form>
      </div>
    </>
  );
};

export default TaskesData;
