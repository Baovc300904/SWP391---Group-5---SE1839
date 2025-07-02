import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children, allowedRoles = [] }) {
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user") || "{}");
  if (!token) return <Navigate to="/login" />;
  console.log("allowedRoles", allowedRoles);

  if (allowedRoles.length === 0 || allowedRoles.includes(user?.vaiTro)) {
    return children;
  }

  return <Navigate to="/" />;
}
