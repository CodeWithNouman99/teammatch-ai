import { Navigate, Route, Routes } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";
import Layout from "./components/Layout";
import Login from "./pages/Login";
import Requests from "./pages/Requests";
import NewRequest from "./pages/NewRequest";
import Developers from "./pages/Developers";

export default function App() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />

      {/* Every page inside here needs login and gets the side navigation */}
      <Route
        element={
          <ProtectedRoute>
            <Layout />
          </ProtectedRoute>
        }
      >
        <Route path="/requests" element={<Requests />} />
        <Route path="/requests/new" element={<NewRequest />} />
        <Route path="/developers" element={<Developers />} />
      </Route>

      {/* Any other address goes to the inbox (which sends you to login if needed) */}
      <Route path="*" element={<Navigate to="/requests" replace />} />
    </Routes>
  );
}