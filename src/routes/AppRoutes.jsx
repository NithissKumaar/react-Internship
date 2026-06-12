import { Routes, Route, Navigate } from "react-router-dom";
import Layout from "../Layouts/Layouts";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/menubar/Login";
import RoleLogin from "../pages/menubar/RoleLogin";
import Dashboard from "../pages/menubar/Dashboard";
import Users from "../pages/menubar/users/Users";
import AddUser from "../pages/menubar/users/AddUser";
import Profile from "../pages/profile/Profile";
import EmployeeRegistration from "../pages/menubar/employe/EmployeeRegistration";
import BasicDetails from "../pages/menubar/employe/BasicDetails";
import Projects from "../pages/menubar/projects/Projects";
import AddProject from "../pages/menubar/projects/AddProject";
import EditProject from "../pages/menubar/projects/EditProject";
import Reports from "../pages/menubar/Reports";
import DragFormBuilder from "../pages/menubar/DragFormBuilder";
import Forms from "../pages/menubar/Forms";
import FillForm from "../pages/menubar/FillForm";
import Responses from "../pages/menubar/Responses";

function AppRoutes() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <Routes>
        {/* Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login/:role" element={<RoleLogin />} />
        {/* Layout */}
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute roles={["Admin", "Manager", "Employee"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute roles={["Admin"]}><Users /></ProtectedRoute>} />
          <Route path="/users/add" element={<ProtectedRoute roles={["Admin"]}><AddUser /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute roles={["Employee"]}><Profile /></ProtectedRoute>} />
          <Route path="/employee-registration" element={<ProtectedRoute roles={["Admin"]}><EmployeeRegistration /></ProtectedRoute>} />
          <Route path="/employee" element={<BasicDetails />} />
          <Route path="/projects" element={<ProtectedRoute roles={["Admin", "Manager"]}><Projects /></ProtectedRoute>} />
          <Route path="/projects/add" element={<ProtectedRoute roles={["Admin", "Manager"]}><AddProject /></ProtectedRoute>} />
          <Route path="/projects/edit/:id" element={<ProtectedRoute roles={["Admin", "Manager"]}><EditProject /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute roles={["Admin"]}><Reports /></ProtectedRoute>} />
          {/* FORMS */}
          <Route path="/forms" element={<ProtectedRoute roles={["Admin", "Employee"]}><Forms /></ProtectedRoute>} />
          <Route path="/forms/create" element={<ProtectedRoute roles={["Admin", "Employee"]}><DragFormBuilder /></ProtectedRoute>} />
          {/* FIXED ROUTE */}
          <Route path="/forms/fill/:id" element={<ProtectedRoute roles={["Admin", "Employee"]}><FillForm /></ProtectedRoute>} />
          <Route path="/responses" element={<ProtectedRoute roles={["Admin"]}><Responses /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;