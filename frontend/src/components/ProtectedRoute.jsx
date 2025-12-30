import { Navigate } from "react-router-dom";

export default function ProtectedRoute({ children }) {
  // Check for both user and token
  const user = localStorage.getItem("user");
  const token = localStorage.getItem("token");

  if (!user || !token) {
    return <Navigate to="/login" replace />;
  }

  return children;
}