import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Form from "../Form/Form";
import './BlogPreview.css'

export default function BlogPreview() {
  const { blogId } = useParams();
  const [blog, setBlog] = useState(null);
  const [latestBlogs, setLatestBlogs] = useState([]);

  const decodedId = atob(blogId);

  // Fetch selected blog
  const fetchBlog = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blog/${decodedId}`
      );
      setBlog(response.data.blog);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  // Fetch all blogs and sort by latest
  const fetchLatestBlogs = async () => {
    try {
      const response = await axios.get(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blogs`
      );
      const sorted = response.data.blogs.sort(
        (a, b) => new Date(b.created_at) - new Date(a.created_at)
      );
      const filtered = sorted.filter(
        (b) => b.id !== parseInt(decodedId)
      );
      setLatestBlogs(filtered.slice(0, 2));
    } catch (err) {
      console.error("Error fetching latest blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlog();
    fetchLatestBlogs();
  }, [blogId]);

  return (
    <section className=" min-h-screen pt-[100px] pl-4 mt-10 sm:px-6 lg:px-16 flex flex-col lg:flex-row gap-8">
      {/* Left Side: Blog Content */}
      <div className="w-full lg:w-2/3 pb-15 overflow-y-scroll max-h-[calc(100vh-80px)] pr-2 scrollbar-hide">
        {blog ? (
          <>
            <h1 className="text-2xl sm:text-3xl font-bold text-[#001040] leading-tight">
              {blog.title}
            </h1>
            <div
              className="prose max-w-none prose-sm sm:prose-base"
              dangerouslySetInnerHTML={{ __html: blog.content }}
            />
          </>
        ) : (
          <p className="text-gray-500">Loading blog...</p>
        )}
      </div>

      {/* Right Side: Form + Latest Blogs */}
      <div className="lg:w-1/2 sm:w-full">
        <div className="lg:sticky lg:top-[90px] z-10 space-y-6">
          <div className="bg-white rounded-md shadow-sm p-4 border">
            <Form />
          </div>

          <div className="space-y-4 mb-2">
            <h2 className="text-xl font-semibold text-[#001040]">
              Latest Blogs
            </h2>
            {latestBlogs.length > 0 ? (
              latestBlogs.map((b) => (
                <Link to={`/blog/${btoa(b.id)}`} key={b.id} className="block">
                  <div className="border rounded-md p-3 hover:shadow-md transition bg-white">
                    <h3 className="font-semibold text-lg text-[#001040]">
                      {b.title}
                    </h3>
                    <p className="text-sm text-gray-600 line-clamp-2">
                      {b.content.replace(/<[^>]+>/g, "").slice(0, 120)}...
                    </p>
                    <span className="text-blue-600 text-sm hover:underline">
                      Read more →
                    </span>
                  </div>
                </Link>
              ))
            ) : (
              <p className="text-gray-500">
                Currently No latest Blog To Preview
              </p>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
