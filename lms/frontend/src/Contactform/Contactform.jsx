import React, { useState } from 'react';
import "./Contactform.css";
import axios from 'axios';
import { toast, ToastContainer } from 'react-toastify';

function  Contactform() {
  const [formData, setFormData] = useState({
    first_name: '',
    last_name: '',
    email: '',
  });

  const [errors, setErrors] = useState({});
  const nameRegex = /^[a-zA-Z\s.]{2,}$/;
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newErrors = { ...errors };
    if ((name === "firstName" || name === "lastName") && !nameRegex.test(value)) {
      newErrors[name] = "Enter a valid name";
    } else if (name === "email" && !emailRegex.test(value)) {
      newErrors[name] = "Enter a valid email address";
    } else {
      delete newErrors[name];
    }

    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(newErrors);
  };

  const handleSubmit = async(e) => {
    e.preventDefault();
    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/email-form`,formData)

    if(response.status === 200){
      toast.success("Form submitted successfully!");
      setFormData({
        first_name :"",
        last_name : "",
        email :""
      })
    }else{
      setErrors(response.data.message)
      toast.error("Failed to submit email form")
    }
  };

  return (
    <div className="max-w-full  mx-3 md:mx-auto p-3 curvedarea flex  my-8  font-normal">
      <div className="flex flex-col md:flex-row gap-2 items-start p-0 md:p-8">
        <div className="md:w-1/2 p-4">
          <h1 className="text-xl text-white md:text-4xl font-bold mb-4 txt">
            Join Our Email List For<br />
            The Latest Podcasts,<br />
            Interviews, and<br />
            Events!
          </h1>  
          <p>
            Stay updated with Dr. Ken and the Watch Your Back movement as we help relieve neck and back pain - without surgery!
          </p>
        </div>

        <div className="md:w-1/2 p-4 rounded-lg">
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label className="text-[#ffa200] mb-1">First Name</label>
              <input
                type="text"
                name="first_name"
                value={formData.first_name}
                onChange={handleChange}
                className={`bg-white w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-dark ${
                  errors.firstName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'}`}
                required
                placeholder='First Name'
              />
              {errors.firstName && <p className="text-sm text-red-600">{errors.firstName}</p>}
            </div>
            
            <div>
              <label className="text-[#ffa200] mb-1">Last Name</label>
              <input
                type="text"
                name="last_name"
                value={formData.last_name}
                onChange={handleChange}
                placeholder='Last Name'
                className={`w-full bg-white px-4 py-2 border text-black rounded-md focus:outline-none focus:ring-2 text-dark${
                  errors.lastName ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {errors.lastName && <p className="text-sm text-red-600">{errors.lastName}</p>}
            </div>
            
            <div>
              <label className="text-[#ffa200] mb-1">Email</label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder='Email'
                className={`w-full bg-white px-4 py-2 border rounded-md focus:outline-none focus:ring-2 text-dark ${
                  errors.email ? 'border-red-500 focus:ring-red-300' : 'border-gray-300 focus:ring-blue-500'
                }`}
                required
              />
              {errors.email && <p className="text-sm text-red-600">{errors.email}</p>}
            </div>

                 <div className="flex justify-center pt-4">
                  <button type="submit" className="btn-slide">
                    Get Updates<span className="arrow">➤</span>
                  </button>
                  </div>

          </form>
        </div>
        <ToastContainer/>
      </div>
    </div>
  );
}

export default Contactform;
