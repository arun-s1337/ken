import React, { useState, useRef, useEffect } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useNavigate } from 'react-router-dom';

function Addblog() {
  const [title, setTitle] = useState('');
  const [content, setContent] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState({ text: '', type: '' });
  const quillRef = useRef(null);
  const navigate = useNavigate();

  const handleContentChange = (value) => {
    setContent(value);
  };

  const handleTitleChange = (e) => {
    setTitle(e.target.value);
  };

  // Image handler function
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
          // Create form data
          const formData = new FormData();
          formData.append('image', file);
          
          // Get token from localStorage
          const token = localStorage.getItem('admin-token');
          
          if (!token) {
            setMessage({ text: 'Authentication token not found. Please login again.', type: 'error' });
            return;
          }

          // Upload image to server
          const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/uploadImage`, {
            method: 'POST',
            headers: {
              'Authorization': `Bearer ${token}`
            },
            body: formData
          });

          const data = await response.json();

          if (!response.ok) {
            throw new Error(data.message || 'Failed to upload image');
          }

          // Get the URL of the uploaded image
          const imageUrl = data.imageUrl;
          
          // Get the Quill editor instance
          const editor = quillRef.current.getEditor();
          const range = editor.getSelection(true);
          
          // Insert the image at cursor position
          editor.insertEmbed(range.index, 'image', imageUrl);
          
          // Move cursor after the image
          editor.setSelection(range.index + 1);
          
        } catch (error) {
          console.error('Error uploading image:', error);
          setMessage({ text: error.message || 'Failed to upload image', type: 'error' });
        } finally {
          setIsLoading(false);
        }
      }
    };
  };

  // Setup custom image handler when component mounts
  useEffect(() => {
    if (quillRef.current) {
      const toolbar = quillRef.current.getEditor().getModule('toolbar');
      toolbar.addHandler('image', imageHandler);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Form validation
    if (!title.trim() || !content.trim()) {
      setMessage({ text: 'Title and content are required', type: 'error' });
      return;
    }

    setIsLoading(true);
    setMessage({ text: '', type: '' });

    try {
      // Get token from localStorage (assuming you store it there after login)
      const token = localStorage.getItem('admin-token');
      
      if (!token) {
        setMessage({ text: 'Authentication token not found. Please login again.', type: 'error' });
        setIsLoading(false);
        return;
      }

      const response = await fetch(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/addBlog`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          title,
          content
        })
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.message || 'Failed to add blog post');
      }

      // Success response
      setMessage({ text: 'Blog post added successfully!', type: 'success' });
      setTitle('');
      setContent('');
    } catch (error) {
      console.error('Error adding blog post:', error);
      setMessage({ text: error.message || 'An error occurred while adding the blog post', type: 'error' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="container my-5 p-6">
      <h2 className="mb-3">Add Blog Post</h2>
      
      {message.text && (
        <div className={`alert ${message.type === 'success' ? 'alert-success' : 'alert-danger'}`} role="alert">
          {message.text}
        </div>
      )}
      
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
              modules={Addblog.modules}
              formats={Addblog.formats}
              placeholder="Write your blog post here..."
            />
          </div>
        </div>
        
        <button 
          type="submit" 
          className="btn btn-primary my-3"
          disabled={isLoading}
        >
          {isLoading ? 'Submitting...' : 'Submit'}
        </button>
        <button
        type='submit'
        className='p-2 mx-2 rounded border hover:bg-black/50'
        onClick={() => navigate("/adminpage")}
        >
          Cancel
        </button>
      </form>
    </div>
  );
}

// Quill configuration for toolbar + image support
Addblog.modules = {
  toolbar: {
    container: [
      [{ 'header': [1, 2, false] }],
      ['bold', 'italic', 'underline', 'strike', 'blockquote'],
      [{ 'list': 'ordered'}, { 'list': 'bullet' }],
      ['link', 'image'],
      ['clean']
    ]
    // We'll add the handler dynamically in useEffect
  }
};

Addblog.formats = [
  'header', 'bold', 'italic', 'underline', 'strike', 'blockquote',
  'list', 'bullet', 'link', 'image'
];

export default Addblog;