import { createBrowserRouter, Navigate, useLocation } from "react-router-dom";
import ErrorPage from "./views/Pages/Error";
import App from "./App";
import { Account, Admin, Pages, Student, Teacher } from "./paths";
import { Layout } from "./components/layout/Layout";
import { LayoutMin } from "./components/layout/LayoutMin";
import React from "react";
import { useAppSelector } from "./hooks/redux";
import { RoleUser } from "./store/enums/RoleUser";
import ProtectedAdminRoute from "./components/PrivateAdminRoute";
import ProtectedTeacherRoute from "./components/PrivateTeacherRoute";
import ProtectedStudentRoute from "./components/PrivateStudentRoute";
import { Loader } from "./components/Loader";
import { UpdateUser } from "./views/Admin/Users/UpdateUser";

const Register = React.lazy(() => import("./views/Pages/Register").then(({ Register }) => ({ default: Register })));
const Login = React.lazy(() => import("./views/Pages/Login").then(({ Login }) => ({ default: Login })));
const AdminDashboard = React.lazy(() => import("./views/Admin/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));
const TeacherDashboard = React.lazy(() => import("./views/Teacher/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));
const StudentDashboard = React.lazy(() => import("./views/Student/Dashboard").then(({ Dashboard }) => ({ default: Dashboard })));
const AdminUsers = React.lazy(() => import("./views/Admin/Users/Users").then(({ Users }) => ({ default: Users })));
const TeacherTasks = React.lazy(() => import("./views/Teacher/Tasks/Tasks").then(({ Tasks }) => ({ default: Tasks })));
const AddOrUpdateTask = React.lazy(() => import("./views/Teacher/Tasks/AddOrUpdate").then(({ AddOrUpdate }) => ({ default: AddOrUpdate })));
const Profile = React.lazy(() => import("./views/Account/Profile").then(({ Profile }) => ({ default: Profile })));

const loader = () => {
    return <Loader />
}

const router = createBrowserRouter([
    {
        element: <Layout />,
        children: [
            {
                path: "/",
                element: <App />
            }
        ],
        errorElement: <ErrorPage />,
        loader: loader
    },
    {
        element: <Layout />,
        path: Admin.root,
        loader: loader,
        children: [
            {
                element: <ProtectedAdminRoute />,
                path: Admin.root,
                children: [
                    {
                        path: Admin.dashboard,
                        element: <AdminDashboard />,
                        
                    },
                    {
                        path: Admin.users,
                        element: <AdminUsers />,
                    },
                    {
                        path: Admin.users + "/:id",
                        element: <UpdateUser />,
                    }
                ]
                
            },
            {
                element: <ProtectedTeacherRoute />,
                children: [
                    {
                        path: Teacher.dashboard,
                        element: <TeacherDashboard />,
                    },
                    {
                        path: Teacher.tasks,
                        element: <TeacherTasks />,
                    },
                    {
                        path: Teacher.addTask,
                        element: <AddOrUpdateTask />,
                    },
                    {
                        path: Teacher.tasks + "/:id",
                        element: <AddOrUpdateTask />,
                    }
                ]
                
            },
            {
                element: <ProtectedStudentRoute />,
                children: [
                    {
                        path: Student.dashboard,
                        element: <StudentDashboard />,
                    }
                ]
                
            },
            {
                element: <Profile />,
                path: Account.profile
            }
        ],
        errorElement: <ErrorPage />
    },
    {
        element: <LayoutMin />,
        children: [
            {
                path: Pages.login,
                index: true,
                element: <Login />,
                errorElement: <ErrorPage />,
            },
            {
                path: Pages.register,
                index: true,
                element: <Register />,
                errorElement: <ErrorPage />
            }
        ],
        errorElement: <ErrorPage />
    },

])

export default router;