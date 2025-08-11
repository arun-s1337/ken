import React, { useState } from 'react';
import locationim from "../assets/location.png";
import mailimg from "../assets/mail.png";
import telimg from "../assets/telephone.png";
import axios from 'axios';
import "./Contact.css"
import { Helmet } from 'react-helmet';
import { toast } from 'react-toastify';
import { useEffect } from 'react';



function Contact() {
  const [formData, setFormData] = useState({
    full_name: '',
    email: '',
    message: '',
  });

  useEffect(() =>{
    window.scroll(0,0)
  },[])

  const [errors, setErrors] = useState({});
  const token = localStorage.getItem("user-token")
 const handleChange = (e) => {
  const { name, value } = e.target;

  setFormData(prev => ({ 
    ...prev,
    [name]: value,
  }));

  let newErrors = { ...errors };

  if (name === 'name') {
    const nameRegex = /^[a-zA-Z\s.]{2,}$/;
    if (!nameRegex.test(value)) {
      newErrors.name = "Enter a valid name ";
    } else {
      delete newErrors.name;
    }
  }

  if (name === 'email') {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(value)) {
      newErrors.email = "Enter a valid email address";
    } else {
      delete newErrors.email;
    }
  }

  setErrors(newErrors);
};




  const handleSubmit = async(e) => {

    e.preventDefault();

    const response = await axios.post(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/contact-form`,formData)
    if(response.status === 200){
      toast.success("Form submitted successfully!");
      setFormData({
        full_name : "",
        message : "",
        email :""
      })
    }else{
      setErrors(response.data.message)
      toast.error(response.data.message)
    }
  };

  return (
    <div id='contact-1' className="max-w-7xl mx-auto  pt-[100px] pl-4 mt-5 font-normal">
      <Helmet>
        <title>Contact Dr. Ken Hansraj – Get in Touch</title>
        <meta name="description" content="Have questions or need assistance? Contact Dr. Ken Hansraj for expert advice on spine health." />
       
        <meta name="keywords" content="Contact information, spine health inquiries, Dr. Ken Hansraj" />
        <link rel="canonical" href="https://drken.us/contact" />
      
      </Helmet>
      <div className="flex flex-col md:flex-row  gap-8 sm:gap-12 p-3">
        
        <div className="w-full lg:w-1/2 xl:w-7/12  space-y-2"> 
          <div className="bg-white p-6 rounded-lg">
             <h1 className=" my-1 md:my-5 headingarea contacttxt">Contact Us</h1>
            <p className=" text-[#ffa200] text-xl mb-4">For Patient Inquiries, Please Contact:</p>
            <p className="mb-6 text-[#001040] text-lg">The Spine Center at Community Primary Care of Premier Medical Group</p>

            <div className="space-y-4">
              <div className="flex items-start space-x-3">
                <img src={telimg} alt="Phone" className="w-5 h-5 mt-1 flex-shrink-0" />
                <a href="tel:845-226-4590" className="linktxt text-lg transition-colors text-decoration-none">
                  845-226-4590
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <img src={mailimg} alt="Email" className="w-5 h-5 mt-1 flex-shrink-0" />
                <a href="mailto:DrKen@DrKen.us" className="text-lg linktxt  transition-colors text-decoration-none">
                 drken@drken.us
                </a>
              </div>

              <div className="flex items-start space-x-3">
                <img src={locationim} alt="Location" className="w-5 h-5 mt-1 flex-shrink-0" />
                <a href="#" className="linktxt  transition-colors text-lg text-decoration-none">
                  New York Office
                </a>
              </div>
            </div>
          </div>
        </div>

        {/* Contact Form Section */}
        <div className="w-full border rounded-lg lg:w-2/5 xl:w-1/3 2xl:w-1/4 mb-5 ">

          <div className="bg-white p-6 md:p-8 rounded-lg shadow-lg font-normal">
            <p className="text-center text-gray-600 mb-6">
              For Inquiries, Please Send a Message
            </p>
            
            <form onSubmit={handleSubmit} className="space-y-4 p-3">
              <div>
                <label htmlFor="full_name" className="block text-md font-medium text-[#001040] mb-1">
                  Name
                </label>
                <input
                  type="text"
                  name="full_name"
                  id="full_name"
                  placeholder="Enter your Name"
                  className={`w-full px-4 py-2 border shadow-md rounded-md focus:outline-none focus:ring-2 ${
                    errors.name ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  value={formData.name}
                  onChange={handleChange}
                  required
                />
                {errors.name && (
                  <p className="mt-1 text-sm text-red-600">{errors.name}</p>
                )}
              </div>

              <div>
                <label htmlFor="email" className="block text-md font-medium text-[#001040] mb-1">
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Enter your Email"
                  className={`w-full shadow-md border px-4 py-2  rounded-md focus:outline-none focus:ring-2 ${
                    errors.email ? 'border-red-500 focus:ring-red-200' : 'border-gray-300 focus:ring-blue-200'
                  }`}
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
                {errors.email && (
                  <p className="mt-1 text-sm text-red-600">{errors.email}</p>
                )}
              </div>

              <div>
                <label htmlFor="message" className="block text-md font-medium text-[#001040] mb-1">
                  Message
                </label>
                <textarea
                  name="message"
                  id="message"
                  rows="4"
                  placeholder="Your message"
                  className="w-full px-4 py-2 border shadow-md rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                  value={formData.message}
                  onChange={handleChange}
                  minLength="10"
                  maxLength="100"
                ></textarea>
              </div>

              <div className="pt-2 flex justify-center">
                <button
                  type="submit"
                  className=" bg-[#001040] text-[#ffa200] py-2 px-6 rounded-md  transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer"
                >
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Contact;