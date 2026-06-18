import { Navigate } from "react-router-dom";

function ProtectedRoute({ children, roles }) {
  const role = localStorage.getItem("role")?.toLowerCase();
  const allowed = roles.map((r) => r.toLowerCase());

  if (!role || !allowed.includes(role)) {
    return <Navigate to="/login/admin" replace />;
  }

  return children;
}

export default ProtectedRoute;