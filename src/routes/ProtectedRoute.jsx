import { Navigate } from "react-router-dom";
function ProtectedRoute({ children, roles }) {
  const role = localStorage.getItem("role");
  if (!role || !roles.includes(role)) {
    return <Navigate to="/dashboard" replace />;
  }
  return children;
}
export default ProtectedRoute;