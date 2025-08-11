import React, { useEffect, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';

export default function Blogs() {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);
const nav=useNavigate();
  useEffect(() => {
    const fetchBlogs = async () => {
      const token = localStorage.getItem('admin-token');

      try {
        const res = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blogs`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        const data = await res.json();
        if (res.ok) {
          setBlogs(data.blogs);

          console.log(data.blogs)
        } else {
          console.error('Failed to fetch blogs:', data.message);
        }
      } catch (error) {
        console.error('Error fetching blogs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, []);

  if (loading) {
    return <div className="p-4">Loading...</div>;
  }

  return (

    <div className="container my-3">
      <div className='d-flex justify-content-between py-1'>
  <h2 className="keynotespeaker"> Blogs</h2>
  <button  className='bluebutton px-3' onClick={()=>nav("/addblog")}>Add Blogs</button>
      </div>
    
      {blogs.length === 0 ? (
        <p>No blogs found.</p>
      ) : (
        blogs.map((blog) => (
          <Link to={`/renderblog/${blog.id}`}>
            <div key={blog.id} className="card mb-4 shadow-sm">
            <div className="card-body">
              <h4 className="card-title">{blog.title}</h4>
              <div
                className="card-text"
                dangerouslySetInnerHTML={{ __html: blog.content }} />
              <p className="text-muted mt-3">
                Created at: {new Date(blog.created_at).toLocaleString()}
              </p>
            </div>
          </div>
          </Link>
          
        ))
      )}
    </div>
  );
}
