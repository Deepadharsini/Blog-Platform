import React, { useState } from "react";
import Header from "../components/Header";
import TiptapEditor from "../components/TiptapEditor";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");

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
    } catch (err) {
      setError("Failed to create blog");
    }
  };

  return (
    <div>
      <Header user={JSON.parse(localStorage.getItem("user"))} />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
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