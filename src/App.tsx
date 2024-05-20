import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AuthLayout from "./modules/SharedModule/components/AuthLayout/AuthLayout";
import NotFound from "./modules/SharedModule/components/NotFound/NotFound";
import Login from "./modules/AuthenticationModule/components/Login/Login";
import ForgetPass from "./modules/AuthenticationModule/components/ForgetPass/ForgetPass";
import ResetPass from "./modules/AuthenticationModule/components/ResetPass/ResetPass";
import Register from "./modules/AuthenticationModule/components/Register/Register";
import VerifyAccount from "./modules/AuthenticationModule/components/Verify Account/VerifyAccount";
import ChangePass from "./modules/AuthenticationModule/components/ChangePass/ChangePass";
import MasterLayout from "./modules/SharedModule/components/MasterLayout/MasterLayout";
import Dashboard from "./modules/DashboardModule/components/Dashboard/Dashboard";
import ProjectsList from "./modules/ProjectsModule/components/ProjectsList/ProjectsList";
import TasksList from "./modules/TasksModule/components/TasksList/TasksList";
import UsersList from "./modules/UsersModule/components/UsersList/UsersList";
import TasksData from "./modules/TasksModule/components/TasksData/TasksData";
import ProtectedRoute from "./modules/SharedModule/components/ProtectedRoute/ProtectedRoute";
import { useContext } from "react";
import { AuthContext } from "./Context/AuthContext";


function App() {
  const {loginData,saveLoginData}=useContext(AuthContext)
 
  const routers = createBrowserRouter([
    {
      path: "/",
      element: <AuthLayout />,
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Login saveLoginData={saveLoginData} /> },
        { path: "login", element: <Login saveLoginData={saveLoginData} /> },
        { path: "register", element: <Register /> },
        { path: "forget-pass", element: <ForgetPass /> },
        { path: "reset-pass", element: <ResetPass /> },
        { path: "change-pass", element: <ChangePass /> },
        { path: "verify-account", element: <VerifyAccount /> },
      ],
    },
    {
      path: "dashboard",
      element: (
        <ProtectedRoute loginData={loginData}>
          <MasterLayout />
        </ProtectedRoute>
      ),
      errorElement: <NotFound />,
      children: [
        { index: true, element: <Dashboard /> },
        { path: "projects", element: <ProjectsList /> },
        { path: "tasks", element: <TasksList /> },
        { path: "tasksData", element: <TasksData /> },
        { path: "users", element: <UsersList /> },
      ],
    },
  ]);

  return <RouterProvider router={routers} />;
}

export default App;
