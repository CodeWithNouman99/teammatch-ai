import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Login from "./pages/Login";
import Requests from "./pages/Requests";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route
        path="/requests"
        element={
          <ProtectedRoute>
            <Requests />
          </ProtectedRoute>
        }
      />
      {/* Any other address goes to the inbox (which sends you to login if needed) */}
      <Route path="*" element={<Navigate to="/requests" replace />} />
    </Routes>
  );
}