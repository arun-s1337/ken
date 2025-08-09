// import React, { useState, useRef, useEffect } from 'react';
// import ReactQuill from 'react-quill';
// import 'react-quill/dist/quill.snow.css';
// import { useParams } from 'react-router-dom';



// function UpdateBlogPage() {
//   const { blogId } = useParams();
//   const [title, setTitle] = useState('');
//   const [content, setContent] = useState('');
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState({ text: '', type: '' });
//   const quillRef = useRef(null);

//   // Fetch blog post when component mounts
//   useEffect(() => {
//     const fetchBlog = async () => {
//       setIsLoading(true);
//       try {
//         const token = localStorage.getItem('admin-token');
//         if (!token) {
//           setMessage({ text: 'Authentication token not found. Please login again.', type: 'error' });
//           return;
//         }

//         const response = await fetch(`http://localhost:3000/api/v1/admin/blog/${blogId}`, {
//           method: 'GET',
//           headers: {
//             'Authorization': `Bearer ${token}`
//           }
//         });

//         const data = await response.json();
//         if (!response.ok) {
//           throw new Error(data.message || 'Failed to fetch blog post');
//         }

//         setTitle(data.blog.title);
//         setContent(data.blog.content);
//       } catch (error) {
//         console.error('Error fetching blog post:', error);
//         setMessage({ text: error.message || 'Failed to fetch blog post', type: 'error' });
//       } finally {
//         setIsLoading(false);
//       }
//     };

//     fetchBlog();
//   }, [blogId]);

//   const handleContentChange = (value) => {
//     setContent(value);
//   };

//   const handleTitleChange = (e) => {
//     setTitle(e.target.value);
//   };

//   // Image handler function (same as AddBlog)
//   const imageHandler = () => {
//     const input = document.createElement('input');
//     input.setAttribute('type', 'file');
//     input.setAttribute('accept', 'image/*');
//     input.click();

//     input.onchange = async () => {
//       const file = input.files[0];

//       if (file) {
//         try {
//           setIsLoading(true);
//           const formData = new FormData();
//           formData.append('image', file);
          
//           const token = localStorage.getItem('admin-token');
//           if (!token) {
//             setMessage({ text: 'Authentication token not found. Please login again.', type: 'error' });
//             return;
//           }

//           const response = await fetch('http://localhost:3000/api/v1/admin/uploadImage', {
//             method: 'POST',
//             headers: {
//               'Authorization': `Bearer ${token}`
//             },
//             body: formData
//           });

//           const data = await response.json();
//           if (!response.ok) {
//             throw new Error(data.message || 'Failed to upload image');
//           }

//           const imageUrl = data.imageUrl;
//           const editor = quillRef.current.getEditor();
//           const range = editor.getSelection(true);
//           editor.insertEmbed(range.index, 'image', imageUrl);
//           editor.setSelection(range.index + 1);
//         } catch (error) {
//           console.error('Error uploading image:', error);
//           setMessage({ text: error.message || 'Failed to upload image', type: 'error' });
//         } finally {
//           setIsLoading(false);
//         }
//       }
//     };
//   };

//   // Setup custom image handler
//   useEffect(() => {
//     if (quillRef.current) {
//       const toolbar = quillRef.current.getEditor().getModule('toolbar');
//       toolbar.addHandler('image', imageHandler);
//     }
//   }, []);

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     if (!title.trim() || !content.trim()) {
//       setMessage({ text: 'Title and content are required', type: 'error' });
//       return;
//     }

//     setIsLoading(true);
//     setMessage({ text: '', type: '' });

//     try {
//       const token = localStorage.getItem('admin-token');
//       if (!token) {
//         setMessage({ text: 'Authentication token not found. Please login again.', type: 'error' });
//         setIsLoading(false);
//         return;
//       }

//       const response = await fetch(`http://localhost:3000/api/v1/admin/blog/${blogId}`, {
//         method: 'PUT',
//         headers: {
//           'Content-Type': 'application/json',
//           'Authorization': `Bearer ${token}`
//         },
//         body: JSON.stringify({
//           title,
//           content
//         })
//       });

//       const data = await response.json();
//       if (!response.ok) {
//         throw new Error(data.message || 'Failed to update blog post');
//       }

//       setMessage({ text: 'Blog post updated successfully!', type: 'success' });
 
//     } catch (error) {
//       console.error('Error updating blog post:', error);
//       setMessage({ text: error.message || 'An error occurred while updating the blog post', type: 'error' });
//     } finally {
//       setIsLoading(false);
//     }
//   };

//   return (
//     <div className="container my-5">
//       <h2 className="mb-3">Update Blog Post</h2>
      
//       {message.text && (
//         <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
//           {message.text}
//         </div>
//       )}
      
//       <form className="shadow-md p-3" onSubmit={handleSubmit}>
//         <div className="row align-items-center mb-3">
//           <div className="col-12 col-lg-2 mb-2 mb-lg-0">
//             <label className="form-label mb-0">Blog Title</label>
//           </div>
//           <div className="col-12 col-lg-10">
//             <input 
//               type="text" 
//               className="form-control" 
//               value={title}
//               onChange={handleTitleChange}
//               required
//             />
//           </div>
//         </div>
        
//         <div className="row mb-3">
//           <div className="col-12 col-lg-2 mb-2 mb-lg-0">
//             <label className="form-label mb-0">Blog Content</label>
//           </div>
//           <div className="col-12">
//             <ReactQuill
//               ref={quillRef}
//               value={content}
//               onChange={handleContentChange}
//               modules={UpdateBlogPage.modules}
//               formats={UpdateBlogPage.formats}
//               placeholder="Write your blog post here..."
//             />
//           </div>
//         </div>
        
//         <button 
//           type="submit" 
//           className="btn btn-primary my-3"
//           disabled={isLoading}
//         >
//           {isLoading ? 'Updating...' : 'Update'}
//         </button>
//       </form>
//     </div>
//   );
// }

// // Quill configuration
// UpdateBlogPage.modules = {
//   toolbar: {
//     container: [
//       [{ 'header': [1, 2, false] }],
//       ['bold', 'italic', 'underline', 'strike', 'blockquote'],
//       [{ 'list': 'ordered'}, { 'list': 'bullet' }],
//       ['link', 'image'],
//       ['clean']
//     ]
//   }
// };

// UpdateBlogPage.formats = [
//   'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
//   'list', 'bullet', 'link', 'image'
// ];

// export default UpdateBlogPage;



import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router-dom';


function UpdateBlogPage() {
  const { blogId } = useParams();
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const quillRef = useRef(null);
  const navigate = useNavigate()

   const decodedId = atob(blogId)
  // Fetch blog post
  useEffect(() => {
    const fetchBlog = async () => {
      setIsLoading(true);
      try {
        const token = localStorage.getItem('admin-token');
        if (!token) {
          toast.error('Authentication token not found. Please login again.');
          return;
        }
        

        const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blog/${decodedId}`, {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }
        });

        const data = await response.json();
        if (!response.ok) throw new Error(data.message || 'Failed to fetch blog post');

        setTitle(data.blog.title);
        setContent(data.blog.content);
      } catch (error) {
        console.error('Error fetching blog post:', error);
        toast.error(error.message || 'Failed to fetch blog post');
      } finally {
        setIsLoading(false);
      }
    };

    fetchBlog();
  }, [blogId]);

  const handleContentChange = (value) => setContent(value);
  const handleTitleChange = (e) => setTitle(e.target.value);

  const imageHandler = () => {
    const input = document.createElement('input');
    input.setAttribute('type', 'file');
    input.setAttribute('accept', 'image/*');
    input.click();

    input.onchange = async () => {
      const file = input.files[0];
      if (file) {
        try {
          setIsLoading(true);
          const formData = new FormData();
          formData.append('image', file);

          const token = localStorage.getItem('admin-token');
          if (!token) {
            toast.error('Authentication token not found. Please login again.');
            return;
          }

          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/uploadImage`, {
            method: 'POST',
            headers: { 'Authorization': `Bearer ${token}` },
            body: formData
          });

          const data = await response.json();
          if (!response.ok) throw new Error(data.message || 'Failed to upload image');

          const imageUrl = data.imageUrl;
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          editor.insertEmbed(range.index, 'image', imageUrl);
          editor.setSelection(range.index + 1);
        } catch (error) {
          console.error('Error uploading image:', error);
          toast.error(error.message || 'Failed to upload image');
        } finally {
          setIsLoading(false);
        }
      }
    };
  };

  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('image', imageHandler);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim() || !content.trim()) {
      toast.error('Title and content are required');
      return;
    }

    setIsLoading(true);
    try {
      const token = localStorage.getItem('admin-token');
      if (!token) {
        toast.error('Authentication token not found. Please login again.');
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/blog/${decodedId}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({ title, content })
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message || 'Failed to update blog post');

      toast.success('Blog updated successfully!');
    } catch (error) {
      console.error('Error updating blog post:', error);
      toast.error(error.message || 'An error occurred while updating the blog post');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5">
      <h2 className="mb-3">Update Blog Post</h2>

      <form className="shadow-md p-3" onSubmit={handleSubmit}>
        <div className="row align-items-center mb-3">
          <div className="col-12 col-lg-2 mb-2 mb-lg-0">
            <label className="form-label mb-0">Blog Title</label>
          </div>
          <div className="col-12 col-lg-10">
            <input 
              type="text" 
              className="form-control" 
              value={title}
              onChange={handleTitleChange}
              required
            />
          </div>
        </div>

        <div className="row mb-3">
          <div className="col-12 col-lg-2 mb-2 mb-lg-0">
            <label className="form-label mb-0">Blog Content</label>
          </div>
          <div className="col-12">
            <ReactQuill
              ref={quillRef}
              value={content}
              onChange={handleContentChange}
              modules={UpdateBlogPage.modules}
              formats={UpdateBlogPage.formats}
              placeholder="Write your blog post here..."
            />
          </div>
        </div>

        <button 
          type="submit" 
          className="btn btn-primary my-4"
          disabled={isLoading}
        >
          {isLoading ? 'Updating...' : 'Update'}
        </button>
        <button
        type='submit'
        className="mx-2 border p-2 rounded hover:bg-black/50"
        onClick={() => navigate("/adminpage")}
        >
          Cancel
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

// Quill configuration
UpdateBlogPage.modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
  }
};

UpdateBlogPage.formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image'
];

export default UpdateBlogPage;
