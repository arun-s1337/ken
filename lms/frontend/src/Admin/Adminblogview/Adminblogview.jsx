

import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

export default function Adminblogview() {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([]);

  async function getBlog() {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blogs`);
      setBlogs(response.data.blogs);
    } catch (err) {
      console.error("Error fetching blogs:", err);
      toast.error("Error fetching blogs:", err)
    }
  }

  useEffect(() => {
    getBlog();
  }, []);
  const getPreview = (html) => {
    const text = html.replace(/<[^>]+>/g, "");
    return text.length > 200 ? text.slice(0, 200) + "..." : text;
  };

  const handleDelete = async (blogId) => {
  try {
    const response = await axios.delete(
      `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blog/${blogId}`
    );
    if (response.data.message === "Blog deleted successfully") {
      toast.success("Blog Deleted Successfully")
      setBlogs((prev) => prev.filter((b) => b.id !== blogId)); // Remove from UI
    }
  } catch (err) {
    console.error("Error deleting blog:", err);
    toast.error("Error deleting blog:", err)
  }
};


  return (
    <div className="container py-4">
      <button
            onClick={() => navigate("/admin/addblog")}
            className="btn btn-warning text-white px-4 mb-2" 
          >
            ADD BLOG
          </button>
      <div className="row">
        {blogs.map((blog) => (
          <div className="col-sm-12 col-md-6 col-lg-4 mb-4" key={blog.id}>
            <div className="bg-white border rounded-xl shadow-md p-4  d-flex flex-column">
              <img
                src="/blog.jpg"
                alt="Default Blog"
                className="w-100 h-40 object-cover rounded mb-3"
              />
              <div className="flex-grow-1">
                <h2 className="text-lg font-semibold mb-2 text-black">{blog.title}</h2>
                <p className="text-neutral-800 small line-clamp-3">{getPreview(blog.content)}</p>
              </div>
              <Link to={`/admin/blog/${btoa(blog.id)}`} className="mt-auto text-decoration-none">
                <button className="btn btn-sm btn-warning w-full mt-3 ">View More</button>
              </Link>
              <Link to={`/admin/renderblog/${btoa(blog.id)}`} className="mt-auto text-decoration-none">
                <button className="btn btn-sm btn-warning w-full mt-3 ">Update</button>
              </Link>
             <div  className="mt-auto text-decoration-none">
                <button onClick={() => handleDelete(blog.id)} className="btn btn-sm btn-warning w-full mt-3 ">Delete</button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
