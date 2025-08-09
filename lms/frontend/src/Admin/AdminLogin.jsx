import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Adminlogin() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const validate = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const passwordRegex = /^.{8,}$/;

    if (!emailRegex.test(username)) {
      toast.error('Invalid email format', {
        position: 'top-center',
        autoClose: 3000,
      });
      return false;
    }

    if (!passwordRegex.test(password)) {
      toast.error('Password must be at least 8 characters', {
        position: 'top-center',
        autoClose: 3000,
      });
      return false;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/admin/login`, {
        username,
        password
      });

      if (response.status === 200) {
        // Save the token to localStorage as 'admin-token'
        localStorage.setItem('admin-token', response.data.token);
        
        // Show success toast
        toast.success('Login successful!', {
          position: 'top-center',
          autoClose: 3000,
          onClose: () => navigate("/adminpage") // Navigate after toast closes
        });
        return true;
      } else {
        toast.error(response.data.message || 'Login failed', {
          position: 'top-center',
          autoClose: 3000,
        });
        return false;
      }
    } catch (error) {
      toast.error(error.response?.data?.message || 'An error occurred during login', {
        position: 'top-center',
        autoClose: 3000,
      });
      return false;
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    validate();
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 text-[#001040] font-normal">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-md w-full max-w-sm">
        <h2 className="text-2xl font-bold mb-6 text-center">Admin Login</h2>
        
        <div className="mb-4">
          <label className="block mb-1 font-semibold">Username (Email)</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="admin@example.com"
          />
        </div>

        <div className="mb-6">
          <label className="block mb-1 font-semibold">Password</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="w-full border border-gray-300 px-3 py-2 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter password"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-[#001040] text-white py-2 rounded cursor-pointer transition duration-200"
        >
          Login
        </button>
      </form>

      <ToastContainer position="top-center" autoClose={3000} />
    </div>
  );
}

export default Adminlogin;