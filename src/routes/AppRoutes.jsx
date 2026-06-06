import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import Login from "../pages/Login";
import Dashboard from "../pages/Dashboard";
import Users from "../pages/Users";
import Profile from "../pages/Profile";
import Employe from "../pages/Employe";

function AppRoutes() {
  return (
    <>
    
    <ToastContainer
        position="top-right"
        autoClose={2500}
        hideProgressBar={false}
        newestOnTop
        closeOnClick
        pauseOnHover
        theme="light"
      />
    <Routes>
      
     
      <Route path="/" element={<Login />} />

      
      <Route element={<Layout />}>
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/users" element={<Users />} />
        <Route path="/profile" element={<Profile />} />
        <Route  path="/employe"  element={<Employe/>} />
      </Route>

      
      <Route path="*" element={<Navigate to="/" replace />} />
      

    </Routes>
    </>
  );
}

export default AppRoutes;