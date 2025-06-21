import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogViewPage from "./pages/BlogViewPage";
import UserDashboard from "./pages/UserDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";
import RoleSelectionPage from "./pages/RoleSelectionPage";
import EditBlogPage from "./pages/EditBlogPage";
import RecommendationsPage from "./pages/RecommendationsPage";
import ReadHistoryPage from "./pages/ReadHistoryPage";
import ProfilePage from "./pages/ProfilePage";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<RoleSelectionPage/>} />
      <Route path="/select-role" element={<RoleSelectionPage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create" element={<CreateBlogPage />} />
      <Route path="/blog/:id" element={<BlogViewPage />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/creator-dashboard" element={<CreatorDashboard />} />
      <Route path="/edit/:id" element={<EditBlogPage />} />
      <Route path="/recommendations" element={<RecommendationsPage />} />
      <Route path="/read-history" element={<ReadHistoryPage />} />
      <Route path="/profile" element={<ProfilePage />} />
      {/* Optionally keep HomePage for direct navigation */}
      {/* <Route path="/home" element={<HomePage />} /> */}
    </Routes>
  </Router>
);

export default App;
