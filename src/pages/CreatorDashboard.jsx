import React from "react";
import Header from "../components/Header";

const CreatorDashboard = () => {
  // TODO: Fetch real creator stats
  const user = { name: "Alice", role: "creator" };
  const blogs = [
    { title: "AI in Healthcare", views: 120, likes: 10 },
    { title: "Travel with AI", views: 80, likes: 5 },
  ];

  return (
    <div>
      <Header user={user} />
      <div className="max-w-2xl mx-auto mt-10 p-6 bg-white rounded shadow">
        <h2 className="text-xl font-bold mb-4">Your Blogs Engagement</h2>
        <table className="w-full text-left">
          <thead>
            <tr>
              <th className="py-2">Title</th>
              <th className="py-2">Views</th>
              <th className="py-2">Likes</th>
            </tr>
          </thead>
          <tbody>
            {blogs.map((blog, idx) => (
              <tr key={idx} className="border-t">
                <td className="py-2">{blog.title}</td>
                <td className="py-2">{blog.views}</td>
                <td className="py-2">{blog.likes}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CreatorDashboard; 