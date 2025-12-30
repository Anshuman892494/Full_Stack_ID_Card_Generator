import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Register from "./pages/Register";
import UpdatePassword from "./pages/UpdatePassword";
import GenerateID from "./pages/GenerateID";
import Dashboard from "./pages/Dashboard";

import "./styles/main.css"

/* 🔐 Protected Route Wrapper */
function ProtectedRoute({ children }) {
  const user = localStorage.getItem("user");
  return user ? children : <Navigate to="/login" replace />;
}

/* 🚫 Public Only Route (no access when logged in) */
function PublicRoute({ children }) {
  const user = localStorage.getItem("user");
  return !user ? children : <Navigate to="/" replace />; // Changed from /dashboard to /
}

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* PUBLIC ROUTES */}
        <Route path="/" element={<Home />} />

        <Route path="/login" element={
          <PublicRoute>
            <Login />
          </PublicRoute>
        } />

        <Route path="/register" element={
          <PublicRoute>
            <Register />
          </PublicRoute>
        } />

        {/* PROTECTED ROUTES */}
        <Route path="/generate" element={
          <ProtectedRoute>
            <GenerateID />
          </ProtectedRoute>
        } />

        <Route path="/update-password" element={
          <ProtectedRoute>
            <UpdatePassword />
          </ProtectedRoute>
        } />

        <Route path="/dashboard" element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } />

        {/* Fallback route for 404 */}
        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </BrowserRouter>
  );
}