import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate,NavLink } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';

function UserLogin() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    emailOrUsername: '',
    password: '',
    role: 'user', // default role
  });

  const [errors, setErrors] = useState({});

  const regex = {
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    password: /^.{8,}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({ ...prev, [name]: value }));

    if (name === 'emailOrUsername') {
      if (!regex.email.test(value)) {
        setErrors((prev) => ({ ...prev, emailOrUsername: 'Enter a valid email address' }));
      } else {
        setErrors((prev) => ({ ...prev, emailOrUsername: '' }));
      }
    }

    if (name === 'password') {
      if (!regex.password.test(value)) {
        setErrors((prev) => ({ ...prev, password: 'Password must be at least 8 characters and include a number' }));
      } else {
        setErrors((prev) => ({ ...prev, password: '' }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((msg) => msg !== '');
    if (hasErrors) {
      toast.error('Please fix the errors.');
      return;
    }

    try {
      const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/login`, formData);

      if(response.data.role === "admin"){
        localStorage.setItem("admin-token",response.data.token)
      }else{
        localStorage.setItem("user-token", response.data.token);
      }

      toast.success('Login successful!');
      

      if (response.data.role === "user") {
        navigate("/");
      } else if (response.data.role === "admin") {
        navigate("/adminpage");
      }

    } catch (error) {
      toast.error(error.response?.data?.message || 'Login failed.');
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form onSubmit={handleSubmit} className="w-full max-w-md bg-white p-6 rounded-lg shadow-md">
        <h2 className="text-2xl font-bold text-center text-[#001040] mb-6">Login</h2>

        {/* Email/Username */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Email</label>
          <input
            type="text"
            name="emailOrUsername"
            placeholder='Email'
            value={formData.emailOrUsername}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.emailOrUsername ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-[#001040]`}
          />
          {errors.emailOrUsername && <p className="text-red-500 text-sm mt-1">{errors.emailOrUsername}</p>}
        </div>

        {/* Password */}
        <div className="mb-4">
          <label className="block font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            name="password"
            placeholder='Password'
            value={formData.password}
            onChange={handleChange}
            className={`w-full px-4 py-2 border ${errors.password ? 'border-red-500' : 'border-gray-300'} rounded focus:outline-none focus:ring-2 focus:ring-[#001040]`}
          />
          {errors.password && <p className="text-red-500 text-sm mt-1">{errors.password}</p>}
        </div>

        {/* Role Select */}
        <div className="mb-6">
          <label className="block font-medium text-gray-700 mb-1">Login As</label>
          <select
            name="role"
            value={formData.role}
            onChange={handleChange}
            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-[#001040]"
          >
            <option value="user">User</option>
            <option value="admin">Admin</option>
          </select>
        </div>

        <button type="submit" className="w-full bg-[#001040] text-white py-2 rounded font-semibold hover:bg-[#001060] transition duration-300">
          Login
        </button>

        <p className='text-end mt-2 mb-2 '>
          <NavLink to='/forgot-password' className='text-black hover:text-[#001040]' >Forgot Password?</NavLink>
          
        </p>
        <p className='text-center'>
          Don't have an account? <a href='/register'><span className='text-decoration-none text-[#001040]'>Register</span></a>
        </p>
        <NavLink to="/" className="flex flex-col items-center" >
                 <span className="text-blue-600 ">Move to Home</span>
        </NavLink>
      </form>
      <ToastContainer />
    </div>
  );
}

export default UserLogin;
