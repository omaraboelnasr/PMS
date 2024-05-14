import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import Login from "./modules/AuthenticationModule/components/Login/Login";
import ForgetPass from "./modules/AuthenticationModule/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/AuthenticationModule/components/ResetPass/ResetPass";
import Register from "./modules/AuthenticationModule/components/Register/Register";
import VerifyAccount from "./modules/AuthenticationModule/components/Verify Account/VerifyAccount";

import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/DashboardModule/components/Dashboard/Dashboard";
import ProjectsList from "./modules/ProjectsModule/components/ProjectsList/ProjectsList";
import TaskesList from "./modules/TasksModule/components/TaskesList/TaskesList";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";
import ChangePass from "./modules/AuthenticationModule/components/ChangePass/ChangePass";
import { ToastContainer ,toast} from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function App() {
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login /> },
        { path: "login", element: <Login /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "change-pass", element: <ChangePass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: <MasterLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "projects", element: <ProjectsList /> },
        { path: "tasks", element: <TaskesList /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);
  return (
    <>
    <ToastContainer />
    <RouterProvider router= { routers } /> 
    </>
  );
}

export default App;
