import "./App.css";
import { Routes, Route } from "react-router-dom";
import Home from "./Pages/Home";
import Dashboard from "./Pages/Admin/Dashboard";
import AdminJobs from "./Pages/Admin/AdminJobs";
import AdminApplications from "./Pages/Admin/AdminApplications";
import AdminHireRequests from "./Pages/Admin/AdminHireRequests";
import AdminMessages from "./Pages/Admin/AdminMessages";
import AdminProfile from "./Pages/Admin/AdminProfile";
import ProtectedRoute from "./Pages/Admin/ProtectedRoute";
import AdminPlacements from "./Pages/Admin/AdminPlacements";

function App() {
  return (
    <Routes>
      <Route path="/home" element={<Home />} />
      <Route path="/" element={<Home />} />
      <Route path="/admin" element={
        <ProtectedRoute>
          <Dashboard />
        </ProtectedRoute>
      } />
      <Route path="/admin/jobs" element={
        <ProtectedRoute>
          <AdminJobs />
        </ProtectedRoute>
      } />
      <Route path="/admin/applications" element={
        <ProtectedRoute>
          <AdminApplications />
        </ProtectedRoute>
      } />
      <Route path="/admin/hire-requests" element={
        <ProtectedRoute>
          <AdminHireRequests />
        </ProtectedRoute>
      } />
      <Route path="/admin/messages" element={
        <ProtectedRoute>
          <AdminMessages />
        </ProtectedRoute>
      } />
      <Route path="/admin/placements" element={
        <AdminPlacements />
      } />
      <Route path="/admin/profile" element={
        <ProtectedRoute>
          <AdminProfile />
        </ProtectedRoute>
      } />
    </Routes>
  );
}

export default App;