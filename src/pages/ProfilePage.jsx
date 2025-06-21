import React, { useState, useEffect, useRef } from "react";
import Header from "../components/Header";
import InterestSelector from "../components/InterestSelector";
import { useNavigate } from "react-router-dom";
import { FaUserCircle } from "react-icons/fa";

const ProfilePage = () => {
  const [user, setUser] = useState(null);
  const [interests, setInterests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [selectedFile, setSelectedFile] = useState(null);
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        navigate("/login");
        return;
      }
      try {
        const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) {
          throw new Error("Failed to fetch user profile");
        }
        const data = await res.json();
        setUser(data);
        setInterests(data.interests || []);
      } catch (err) {
        setError(err.message);
      }
      setLoading(false);
    };
    fetchUserProfile();
  }, [navigate]);

  const handleFileChange = (e) => {
    setSelectedFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!selectedFile) return;
    const token = localStorage.getItem("token");
    const formData = new FormData();
    formData.append("profilePic", selectedFile);

    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });
      if (!res.ok) throw new Error("Upload failed");
      const data = await res.json();
      
      // Update user state and local storage with the full URL from the server
      const updatedUser = { ...user, profilePicture: data.profilePicture };
      setUser(updatedUser);
      localStorage.setItem("user", JSON.stringify(updatedUser));
      
      setSuccess("Profile picture updated! Reloading...");
      
      // Reload the page to reflect changes everywhere
      setTimeout(() => {
        window.location.reload();
      }, 1500);

    } catch (err) {
      setError(err.message);
    }
  };

  const handleUpdateInterests = async () => {
    const token = localStorage.getItem("token");
    setError("");
    setSuccess("");
    try {
      const res = await fetch(`${import.meta.env.VITE_API_BASE_URL}/api/user/profile`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({ interests }),
      });
      if (!res.ok) {
        throw new Error("Failed to update interests");
      }
      setSuccess("Your interests have been updated successfully!");
    } catch (err) {
      setError(err.message);
    }
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div
      className="min-h-screen bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: "url('/gray.jpeg')" }}
    >
      <Header />
      <div className="max-w-4xl mx-auto mt-8 p-6 bg-white/80 backdrop-blur-sm rounded shadow">
        <h1 className="text-3xl font-bold mb-6">Your Profile</h1>
        {error && <div className="text-red-500 bg-red-100 p-3 rounded mb-4">{error}</div>}
        {success && <div className="text-green-500 bg-green-100 p-3 rounded mb-4">{success}</div>}
        
        <div className="flex items-center gap-6 mb-8">
          {user?.profilePicture ? (
            <img src={user.profilePicture} alt="Profile" className="w-24 h-24 rounded-full object-cover" />
          ) : (
            <FaUserCircle className="w-24 h-24 text-gray-400" />
          )}
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-gray-600">{user?.email}</p>
            <input
              type="file"
              ref={fileInputRef}
              onChange={handleFileChange}
              className="hidden"
            />
            <button
              onClick={() => fileInputRef.current.click()}
              className="mt-2 text-sm bg-gray-200 hover:bg-gray-300 px-3 py-1 rounded"
            >
              Change Picture
            </button>
            {selectedFile && (
              <button
                onClick={handleUpload}
                className="ml-2 text-sm bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded"
              >
                Upload
              </button>
            )}
          </div>
        </div>
        
        <div className="mb-6">
          <h2 className="text-xl font-semibold">User Details</h2>
          <p><strong>Name:</strong> {user?.name}</p>
          <p><strong>Email:</strong> {user?.email}</p>
        </div>
        
        <div>
          <h2 className="text-xl font-semibold mb-2">Your Interests</h2>
          <p className="text-gray-600 mb-4">Select or update your interests to get better recommendations.</p>
          <InterestSelector selectedInterests={interests} onInterestChange={setInterests} />
          <button
            onClick={handleUpdateInterests}
            className="mt-4 bg-black hover:bg-orange-700 text-white px-6 py-2 rounded transition font-semibold"
          >
            Save Changes
          </button>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage;
