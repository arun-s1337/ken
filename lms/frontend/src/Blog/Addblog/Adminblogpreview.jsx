import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import Form from "../Form/Form";

export default function Adminblogpreview() {
  const { blogId } = useParams();

  
  const [blogs, setBlog] = useState(null); // keep blogs
  // const [latestBlogs, setLatestBlogs] = useState([]);

   const decodedId = atob(blogId)

 
  const fetchBlog = async () => {
    try {
      const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blog/${decodedId}`);
      setBlog(response.data.blog);
    } catch (err) {
      console.error("Error fetching blog:", err);
    }
  };

  // const fetchLatestBlogs = async () => {
  //   try {
  //     const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blogs`);
  //     const sorted = response.data.blogs.sort(
  //       (a, b) => new Date(b.created_at) - new Date(a.created_at)
  //     );
  //     const filtered = sorted.filter((b) => b.id !== parseInt(blogId)); // exclude current
  //     setLatestBlogs(filtered.slice(0, 2));
  //   } catch (err) {
  //     console.error("Error fetching latest blogs:", err);
  //   }
  // };

  useEffect(() => {
    fetchBlog();
    // fetchLatestBlogs();
  }, [blogId]);

  return (
    <section className="pt-[100px] min-h-[100vh] pl-4 mt-5 m-10 flex flex-col sm:flex-row gap-10">
      {/* Left Side: Blog Content */}
      <div className="container">
        {blogs ? (
          <>
            <h1 className="text-3xl font-bold text-[#001040]">{blogs.title}</h1>
            <div
              className="prose max-w-none"
              dangerouslySetInnerHTML={{ __html: blogs.content }}
            />
          </>
        ) : (
          <p>Loading blog...</p>
        )}
      </div>

      {/* Right Side: Form + Latest Blogs */}
      {/* <div className="sm:w-1/3 w-full space-y-6">
        <div className="space-y-4">
          <h2 className="text-xl font-semibold">Latest Blogs</h2>
          {latestBlogs.map((b) => (
            <Link to={`/admin/blog/${b.id}`} key={b.id}>
              <div className="border rounded-md p-3 hover:shadow transition">
                <h3 className="font-semibold">{b.title}</h3>
                <p className="text-sm text-gray-600 line-clamp-2">
                  {b.content.replace(/<[^>]+>/g, "").slice(0, 120)}...
                </p>
                <span className="text-blue-600 text-sm hover:underline">Read more →</span>
              </div>
            </Link>
          ))}
        </div>
      </div> */}
    </section>
  );
}
