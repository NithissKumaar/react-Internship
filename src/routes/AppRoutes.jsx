import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/menubar/Login";
import Dashboard from "../pages/menubar/Dashboard";
import Users from "../pages/menubar/users/Users";
import Profile from "../pages/profile/Profile";
import Employe from "../pages/menubar/employe/Employe";
import Projects from "../pages/menubar/projects/Projects"
import AddProject from "../pages/menubar/projects/AddProject";
import EditProject from "../pages/menubar/projects/EditProject";
import AddUser from "../pages/menubar/users/AddUser";

function AppRoutes() {
  return (
    <>
    
    <ToastContainer position="top-right" autoClose={2500} hideProgressBar={false} newestOnTop closeOnClick pauseOnHover theme="light"/>
    <Routes>
      
     
      <Route path="/" element={<Login />} />

      
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route  path="/employe"  element={<Employe/>} />
        <Route path="/projects" element={<Projects></Projects>}/>
        <Route path="/projects/add" element={<AddProject />} />
        <Route path="/projects/edit/:id" element={<EditProject />}/>
        <Route path="/users/add" element={<AddUser/>}/>

      </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
  );
}

export default AppRoutes;