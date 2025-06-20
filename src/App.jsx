import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage";
import LoginPage from "./pages/LoginPage";
import RegisterPage from "./pages/RegisterPage";
import CreateBlogPage from "./pages/CreateBlogPage";
import BlogViewPage from "./pages/BlogViewPage";
import UserDashboard from "./pages/UserDashboard";
import CreatorDashboard from "./pages/CreatorDashboard";

const App = () => (
  <Router>
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/register" element={<RegisterPage />} />
      <Route path="/create" element={<CreateBlogPage />} />
      <Route path="/blog/:id" element={<BlogViewPage />} />
      <Route path="/dashboard" element={<UserDashboard />} />
      <Route path="/creator-dashboard" element={<CreatorDashboard />} />
    </Routes>
  </Router>
);

export default App;
