import React, { useState } from "react";
import Header from "../components/Header";
import TiptapEditor from "../components/TiptapEditor";
import { useNavigate } from "react-router-dom";

const INTERESTS = [
  "AI", "Technology", "Health", "Finance", "Travel", "Education", "Food", "Sports", "Art", "Science"
];

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [category, setCategory] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    const token = localStorage.getItem("token");
    if (!token) {
      setError("You must be logged in to create a blog.");
      return;
    }
    try {
      const res = await fetch("http://localhost:5000/api/blogs/create", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          title,
          content,
          tags: tags.split(",").map((t) => t.trim()).filter(Boolean),
          category,
        }),
      });
      const data = await res.json();
      if (!res.ok) {
        setError(data.message || "Failed to create blog");
        return;
      }
      setSuccess("Blog created successfully!");
      setTitle("");
      setContent("");
      setTags("");
      setCategory("");
    } catch (err) {
      setError("Failed to create blog");
    }
  };

  return (
    <div 
      className="min-h-screen bg-cover bg-center bg-no-repeat opacity-90"
      style={{ backgroundImage: "url('/gray.jpeg')" }}
    >
      <Header user={JSON.parse(localStorage.getItem("user"))} />
      <button
        onClick={() => navigate(-1)}
        className="fixed top-24 left-10 flex items-center justify-center bg-black text-white hover:bg-orange-700 w-10 h-10 rounded-full shadow hover:bg-black hover:text-white transition z-10"
        style={{ fontWeight: 600, fontSize: 22 }}
        aria-label="Back"
      >
        ←
      </button>
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white/80 backdrop-blur-sm rounded shadow">
        <h2 className="text-xl font-bold mb-4">Create Blog</h2>
        <form onSubmit={handleSubmit} className="flex flex-col gap-4">
          <input
            type="text"
            placeholder="Title"
            className="border p-2 rounded"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
          <TiptapEditor value={content} setValue={setContent} />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="border p-2 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          <div>
            <label htmlFor="category" className="block text-sm font-medium text-gray-700">Category</label>
            <select
              id="category"
              name="category"
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-orange-500 focus:border-orange-500 sm:text-sm rounded-md"
              required
            >
              <option value="" disabled>Select a category</option>
              {INTERESTS.map(interest => (
                <option key={interest} value={interest}>{interest}</option>
              ))}
            </select>
          </div>
          {error && <div className="text-red-500 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button type="submit" className="bg-black hover:bg-orange-700 text-white py-2 rounded">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage; 