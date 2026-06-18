import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Layout from "../Layouts/Layouts";
import ProtectedRoute from "./ProtectedRoute";

import RoleLogin from "../pages/menubar/RoleLogin";
import Dashboard from "../pages/menubar/Dashboard";
import Profile from "../pages/profile/Profile";
import Users from "../pages/menubar/users/Users";
import AddUser from "../pages/menubar/users/AddUser";
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
import InvoicePage from "../pages/menubar/InvoicePage";
import InvoiceList from "../pages/menubar/InvoiceList";
import InvoicePreview from "../pages/menubar/InvoicePreview";

function AppRoutes() {
  return (
    <>
      <ToastContainer position="top-right" autoClose={2500} />
      <Toaster
        position="top-center"
        toastOptions={{
          duration: 3000,
          style: {
            borderRadius: '1rem',
            background: '#f8fafc',
            color: '#0f172a',
            boxShadow: '0 20px 45px rgba(15, 23, 42, 0.12)',
          },
          success: {
            duration: 3000,
            style: {
              background: '#ecfdf5',
              color: '#064e3b',
              border: '1px solid #34d399',
            },
          },
          error: {
            duration: 4000,
            style: {
              background: '#fef2f2',
              color: '#991b1b',
              border: '1px solid #f87171',
            },
          },
        }}
      />
      <Routes>
        <Route path="/" element={<Navigate to="/login/admin" replace />} />
        <Route path="/login/:role" element={<RoleLogin />} />
        <Route element={<Layout />}>
          <Route path="/dashboard" element={<ProtectedRoute roles={["Admin", "Manager", "Employee"]}><Dashboard /></ProtectedRoute>} />
          <Route path="/users" element={<ProtectedRoute roles={["Admin"]}><Users /></ProtectedRoute>} />
          <Route path="/users/add" element={<ProtectedRoute roles={["Admin"]}><AddUser /></ProtectedRoute>} />
          <Route path="/profile" element={<ProtectedRoute roles={["Employee", "Admin"]}><Profile /></ProtectedRoute>} />
          <Route path="/employee-registration" element={<ProtectedRoute roles={["Admin"]}><EmployeeRegistration /></ProtectedRoute>} />
          <Route path="/employee" element={<BasicDetails />} />
          <Route path="/projects" element={<ProtectedRoute roles={["Admin", "Manager"]}><Projects /></ProtectedRoute>} />
          <Route path="/projects/add" element={<ProtectedRoute roles={["Admin", "Manager"]}><AddProject /></ProtectedRoute>} />
          <Route path="/projects/edit/:id" element={<ProtectedRoute roles={["Admin", "Manager"]}><EditProject /></ProtectedRoute>} />
          <Route path="/reports" element={<ProtectedRoute roles={["Admin"]}><Reports /></ProtectedRoute>} />
          <Route path="/forms" element={<ProtectedRoute roles={["Admin", "Employee"]}><Forms /></ProtectedRoute>} />
          <Route path="/forms/create" element={<ProtectedRoute roles={["Admin", "Employee"]}><DragFormBuilder /></ProtectedRoute>} />
          <Route path="/forms/fill/:id" element={<ProtectedRoute roles={["Admin", "Employee"]}><FillForm /></ProtectedRoute>} />
          <Route path="/responses" element={<ProtectedRoute roles={["Admin"]}><Responses /></ProtectedRoute>} />
          <Route path="/invoices" element={<ProtectedRoute roles={["Admin", "Manager", "Employee"]}><InvoiceList /></ProtectedRoute>} />
          <Route path="/invoices/create" element={<ProtectedRoute roles={["Admin", "Manager", "Employee"]}><InvoicePage /></ProtectedRoute>} />
          <Route path="/invoice-preview/:id" element={<ProtectedRoute roles={["Admin", "Manager", "Employee"]}><InvoicePreview /></ProtectedRoute>} />
        </Route>
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </>
  );
}

export default AppRoutes;