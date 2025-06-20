import React, { useState } from "react";
import Header from "../components/Header";
// import ReactQuill from "react-quill"; // Uncomment if react-quill is installed
// import "react-quill/dist/quill.snow.css";

const CreateBlogPage = () => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [tags, setTags] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Add real create blog logic
    if (!title || !content) {
      setError("Title and content are required");
      return;
    }
    setError("");
    alert("Blog created (mock)");
  };

  return (
    <div>
      <Header user={{ role: "creator" }} />
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
          {/* <ReactQuill value={content} onChange={setContent} /> */}
          <textarea
            placeholder="Content"
            className="border p-2 rounded min-h-[120px]"
            value={content}
            onChange={(e) => setContent(e.target.value)}
          />
          <input
            type="text"
            placeholder="Tags (comma separated)"
            className="border p-2 rounded"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
          {error && <div className="text-red-500 text-sm">{error}</div>}
          <button type="submit" className="bg-blue-700 text-white py-2 rounded">
            Create
          </button>
        </form>
      </div>
    </div>
  );
};

export default CreateBlogPage; 