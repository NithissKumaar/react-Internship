import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/menubar/Login";
import RoleLogin from "../pages/menubar/RoleLogin";
import Dashboard from "../pages/menubar/Dashboard";
import Users from "../pages/menubar/users/Users";
import Profile from "../pages/profile/Profile";
import Employe from "../pages/menubar/employe/Employe";
import Projects from "../pages/menubar/projects/Projects";
import AddProject from "../pages/menubar/projects/AddProject";
import EditProject from "../pages/menubar/projects/EditProject";
import AddUser from "../pages/menubar/users/AddUser";

function AppRoutes() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/:role" element={<RoleLogin />} />

        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute roles={["Admin", "Manager", "Employee"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute roles={["Admin"]}><Users /></ProtectedRoute>} />
          <Route path="/users/add" element={<ProtectedRoute roles={["Admin"]}><AddUser /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute roles={["Employee"]}><Profile /></ProtectedRoute>} />
          <Route path="/employe" element={<ProtectedRoute roles={["Admin"]}><Employe /></ProtectedRoute>} />
          <Route path="/projects" element={<ProtectedRoute roles={["Admin", "Manager"]}><Projects /></ProtectedRoute>} />
          <Route path="/projects/add" element={<ProtectedRoute roles={["Admin", "Manager"]}><AddProject /></ProtectedRoute>} />
          <Route path="/projects/edit/:id" element={<ProtectedRoute roles={["Admin", "Manager"]}><EditProject /></ProtectedRoute>} />
        </Route>

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;