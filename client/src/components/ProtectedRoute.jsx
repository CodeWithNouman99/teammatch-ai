import { Navigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext.jsx";

// Wrap any page with this to make it login-only
export default function ProtectedRoute({ children }) {
  const { user } = useAuth();
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return children;
}