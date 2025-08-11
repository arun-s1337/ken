import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import { NavLink, useNavigate } from 'react-router-dom';
import { FaEye, FaEyeSlash } from 'react-icons/fa';

function Userregistration() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState({
    password: false,
    retypePassword: false,
  });

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    password: '',
    retypePassword: '',
  });

  const [errors, setErrors] = useState({});

  const regex = {
    name: /^[A-Za-z. ]{2,}$/,
    email: /^[^\s@]+@[^\s@]+\.[^\s@]+$/,
    phone: /^\+?[1-9]\d{1,14}$/,
    password: /^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/,
  };

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData({ ...formData, [name]: value });

    switch (name) {
      case 'firstName':
      case 'lastName':
        setErrors((prev) => ({
          ...prev,
          [name]: regex.name.test(value) ? '' : 'Enter a valid Name',
        }));
        break;
      case 'email':
        setErrors((prev) => ({
          ...prev,
          email: regex.email.test(value) ? '' : 'Enter a valid email address',
        }));
        break;
      case 'phone':
        setErrors((prev) => ({
          ...prev,
          phone: regex.phone.test(value) ? '' : 'Enter a valid Mobile number',
        }));
        break;
      case 'password':
        setErrors((prev) => ({
          ...prev,
          password: regex.password.test(value)
            ? ''
            : 'Password must be at least 8 characters and include letters and numbers',
          retypePassword:
            value === formData.retypePassword ? '' : 'Passwords do not match',
        }));
        break;
      case 'retypePassword':
        setErrors((prev) => ({
          ...prev,
          retypePassword:
            value === formData.password ? '' : 'Passwords do not match',
        }));
        break;
      default:
        break;
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const hasErrors = Object.values(errors).some((msg) => msg !== '');
    const isEmptyField = Object.values(formData).some((v) => v.trim() === '');
    if (hasErrors || isEmptyField) {
      toast.error('Please fix the errors before submitting.');
      return;
    }

    const payload = {
      first_name: formData.firstName,
      last_name: formData.lastName,
      email: formData.email,
      phone: formData.phone,
      password: formData.password,
    };

    try {
      await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/register`, payload);
      toast.success('User registered successfully!');
      navigate('/login');
      setFormData({
        firstName: '',
        lastName: '',
        email: '',
        phone: '',
        password: '',
        retypePassword: '',
      });
    } catch (error) {
      console.error(error);
      toast.error(
        error.response?.data?.message || 'Registration failed. Try again.'
      );
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md"
      >
        <h2 className="text-2xl font-bold text-center text-[#001040] mb-6">
          User Registration
        </h2>

        <InputField placeholder="First Name"  label="First Name" name="firstName" value={formData.firstName} onChange={handleChange} error={errors.firstName} />
        <InputField placeholder="Last Name" label="Last Name" name="lastName" value={formData.lastName} onChange={handleChange} error={errors.lastName} />
        <InputField placeholder="Email" label="Email" name="email" type="email" value={formData.email} onChange={handleChange} error={errors.email} />
        <InputField placeholder="Mobile Number" label="Mobile Number" name="phone" type="tel" value={formData.phone} onChange={handleChange} error={errors.phone} />

        {/* Password field with eye icon */}
        <InputField
          label="Password"
          name="password"
          placeholder="Password"
          type={showPassword.password ? 'text' : 'password'}
          value={formData.password}
          
          onChange={handleChange}
          error={errors.password}
          showToggle
          onToggle={() => setShowPassword(prev => ({ ...prev, password: !prev.password }))}
          isVisible={showPassword.password}
        />

        {/* Retype Password with eye icon */}
        <InputField
          label="Retype Password"
          name="retypePassword"
          type={showPassword.retypePassword ? 'text' : 'password'}
          value={formData.retypePassword}
          onChange={handleChange}
          error={errors.retypePassword}
          showToggle
          onToggle={() => setShowPassword(prev => ({ ...prev, retypePassword: !prev.retypePassword }))}
          isVisible={showPassword.retypePassword}
        />

        <button
          type="submit"
          className="w-full bg-[#001040] text-white py-2 rounded font-semibold hover:bg-[#001060] transition duration-300"
        >
          Register
        </button>
        <p className="text-center py-4">
          Already have an account? <NavLink to="/login"><span className="text-blue-600">Login</span></NavLink>
        </p>
        <NavLink to="/" className="flex flex-col items-center" >
         <span className="text-blue-600 ">Move to Home</span>
        </NavLink>
        
      </form>
      <ToastContainer />
    </div>
  );
}

// Reusable InputField component with optional eye toggle
const InputField = ({
  label,
  name,
  value,
  onChange,
  placeholder,
  error,
  type = 'text',
  showToggle = false,
  onToggle,
  isVisible,
}) => (
  <div className="mb-4 relative">
    <label className="block font-medium text-gray-700 mb-1">{label}</label>
    <div className="relative">
      <input
       placeholder={placeholder}
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-2 pr-10 border ${
          error ? 'border-red-500' : 'border-gray-300'
        } rounded focus:outline-none focus:ring-2 focus:ring-[#001040]`}
      />
      {showToggle && (
        <span
          onClick={onToggle}
          className="absolute right-3 top-2.5 cursor-pointer text-gray-600"
        >
          {isVisible ?  <FaEye /> :<FaEyeSlash /> }
        </span>
      )}
    </div>
    {error && <p className="text-red-500 text-sm mt-1">{error}</p>}
  </div>
);

export default Userregistration;
