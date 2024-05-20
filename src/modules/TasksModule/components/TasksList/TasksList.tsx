import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../../../../Context/AuthContext";
import { Task } from "../../../../Interfaces/Interfaces";


const TasksList: React.FC = () => {
  const {requestHeaders ,baseUrl} = useContext(AuthContext)
  const [tasksList, setTasksList] = useState<Task[]>([]);

  const navigate = useNavigate();

  const navigateToAddTask = () => {
    navigate('/dashboard/tasksData');
  };

  const getTasksList = async () => {
    try {
      const response = await axios.get(`${baseUrl}/Task/manager`, {
        headers: 
          requestHeaders
            
        ,
      });
      setTasksList(response.data.data);
      console.log(response.data.data);
      
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getTasksList();
  }, []);

  return (
    <>
      <div className="tasksList vh-100">
        <div className="comp-title  w-100 mb-5 bg-white d-flex justify-content-between p-3">
          <h2>Tasks</h2>
          <button onClick={navigateToAddTask} className="btn btn-warning rounded-4">
            + Add new Task
          </button>
        </div>
        <div className="list-container container  shadow-sm p-0 ">
          <nav className="navbar navbar-expand-lg p-0">
            <div className="container-fluid p-0">
              <div className="collapse navbar-collapse bg-white py-2">
                <ul className="navbar-nav me-auto mb-2 mb-lg-0">
                  <input
                    className="form-control2 me-2 border rounded-pill mx-4 px-4"
                    type="search"
                    placeholder="Search Fleets"
                  />
                  <li className="nav-item dropdown border rounded-pill px-3">
                    <a
                      className="nav-link dropdown-toggle"
                      href="#"
                      role="button"
                      data-bs-toggle="dropdown"
                      aria-expanded="false"
                    >
                      Filter
                    </a>
                    <ul className="dropdown-menu">
                      <li>
                        <a className="dropdown-item" href="#">
                          Action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Another action
                        </a>
                      </li>
                      <li>
                        <a className="dropdown-item" href="#">
                          Something else here
                        </a>
                      </li>
                    </ul>
                  </li>
                </ul>
              </div>
            </div>
          </nav>
          <table className="table">
            <thead>
              <tr>
                <th className="text-center border" scope="col">
                  Title
                </th>
                <th className="table-cell-custom border" scope="col">
                  Status
                </th>
                <th className="table-cell-custom border" scope="col">
                  User
                </th>
                <th className="table-cell-custom border" scope="col">
                  Project
                </th>
                <th className="table-cell-custom border" scope="col">
                  Date Created
                </th>
                <th className="table-cell-custom border" scope="col"></th>
              </tr>
            </thead>
            <tbody>
              {tasksList.map((task, index) => (
                <tr key={task.id} className={index % 2 === 0 ? 'bg-white' : 'bg-light'}>
                  <td className="table-cell-custom">{task.title}</td>
                  <td className="table-cell-custom">
                    <span
                      className={`status-pill ${
                        task.status === "InProgress"
                          ? "status-inprogress"
                          : task.status === "Done"
                          ? "status-done"
                          : task.status === "ToDo"
                          ? "status-todo"
                          : ""
                      }`}
                    >
                      {task.status}
                    </span>
                  </td>
                  <td className="table-cell-custom">
                    {task.employee?.userName}
                  </td>
                  <td className="table-cell-custom">{task.project?.title}</td>
                  <td className="table-cell-custom">{task.creationDate}</td>
                  <td className="table-cell-custom">
                    <div className="nav-item dropdown">
                      <button
                        className="p-0 border-0 bg-transparent"
                        type="button"
                        data-bs-toggle="dropdown"
                        aria-expanded="false"
                      >
                        <i className="fa-solid fa-ellipsis-vertical"></i>
                      </button>
                      <ul className="dropdown-menu">
                        <li className="d-flex align-items-center px-2 text-small">
                          <i className="fa-regular fa-eye"></i>
                          <a className="dropdown-item px-1" href="#">
                            View
                          </a>
                        </li>
                        <li className="d-flex align-items-center px-2 text-small">
                          <i className="fa-solid fa-pen-to-square"></i>
                          <a className="dropdown-item px-1" href="#">
                            Edit
                          </a>
                        </li>
                        <li className="d-flex align-items-center px-2 text-small">
                          <i className="fa-regular fa-trash-can"></i>
                          <a className="dropdown-item px-1" href="#">
                            Delete
                          </a>
                        </li>
                      </ul>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </>
  );
};

export default TasksList;
