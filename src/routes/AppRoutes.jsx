import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Toaster } from "react-hot-toast";
import Layout from "../Layouts/Layouts";
import ProtectedRoute from "./ProtectedRoute";
import Login from "../pages/menubar/Login";
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
        gutter={10}
        containerStyle={{ top: 24 }}
        toastOptions={{
          duration: 2500,
          style: {
            background: "rgba(42, 255, 85, 0.12)",
            backdropFilter: "blur(24px)",
            WebkitBackdropFilter: "blur(24px)",
            color: "#0f172a",
            border: "1px solid rgba(255,255,255,.25)",
            borderRadius: "999px",
            padding: "16px 22px",
            minWidth: "260px",
            boxShadow: "0 20px 40px rgba(0,0,0,.10)",
            fontWeight: 500,
          },
          success: { iconTheme: { primary: "#22c55e", secondary: "#ffffff" } },
          error: { iconTheme: { primary: "#ef4444", secondary: "#ffffff" } },
        }}
      />
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/login/:role" element={<RoleLogin />} />
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