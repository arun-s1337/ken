import axios from "axios";
import { useState } from "react";
import { toast } from "react-toastify";

export default function Form() {
  const [formData, setFormData] = useState({
    first_name: "",
    email: "",
    website: "",
    message: "",
  });
  const [errors, setErrors] = useState({
    email: "",
  });

  // Email validation regex
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  const handleChange = (e) => {
    const { name, value } = e.target;

    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));

    // Validate email on change
    if (name === "email") {
      if (!value) {
        setErrors((prev) => ({ ...prev, email: "Email is required" }));
      } else if (!emailRegex.test(value)) {
        setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      } else {
        setErrors((prev) => ({ ...prev, email: "" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Validate email before submission
    if (!formData.email) {
      setErrors((prev) => ({ ...prev, email: "Email is required" }));
      toast.error("Email is required");
      return;
    }
    if (!emailRegex.test(formData.email)) {
      setErrors((prev) => ({ ...prev, email: "Please enter a valid email address" }));
      toast.error("Please enter a valid email address");
      return;
    }

    try {
      const response = await axios.post(
        `${import.meta.env.VITE_BACKEND_URL}/api/v1/user/blog-form`,
        formData
      );

      if (response.status === 200) {
        toast.success("Form submitted successfully");
        setFormData({
          first_name: "",
          email: "",
          website: "",
          message: "",
        });
        setErrors({ email: "" }); // Clear errors on successful submission
      } else {
        toast.error(response.data.message || "Failed to submit form");
      }
    } catch (err) {
      console.error(err);
      toast.error(err.response?.data?.message || "An error occurred while submitting the form");
    }
  };

  return (
    <div className="w-full max-w-[442px] mx-auto px-7  bg-white rounded-2xl shadow-md ">
      <h2 className="text-center  text-[20px] font-bold mb-6"  style={{color:"#001040"}}>
        Drop your thoughts below!
      </h2>

      <form className=" font-medium" onSubmit={handleSubmit}>
        <div>
          <label className="block text-sm text-[15px] text-[#001040] mb-1">Name</label>
          <input
            type="text"
            name="first_name"
            value={formData.first_name}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#001040] shadow-sm"
            required
            placeholder="First Name"
          />
        </div>

        <div>
          <label className="block text-sm text-[15px] text-[#001040] mb-1">Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
             placeholder="Email"
            className={`w-full px-4 py-2 rounded-md border ${
              errors.email ? "border-red-500" : "border-gray-200"
            } focus:outline-none focus:ring-2 focus:ring-[#001040] shadow-sm`}
            required
          />
          {errors.email && (
            <p className="text-red-500 text-xs mt-1">{errors.email}</p>
          )}
        </div>

        <div>
          <label className="block text-sm text-[15px] text-[#001040] mb-1">Website</label>
          <input
            type="url"
            name="website"
            value={formData.website}
            onChange={handleChange}
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#001040] shadow-sm"
            placeholder="https://example.com (optional)"
            
          />
        </div>

        <div>
          <label className="block text-sm text-[15px] text-[#001040] mb-1">Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleChange}
            rows={4}
            className="w-full px-4 py-2 rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#001040] shadow-sm resize-none"
            required
            minLength="10"
            maxLength="100"
            placeholder="Enter your thought's"
          />
        </div>

        <div className="flex justify-center">
          <button
            type="submit"
            className="w-full sm:w-[166px] h-[42px] bg-[#001040] hover:bg-[#112260] transition-colors py-2 rounded-3 font-semibold shadow-md mb-3"
          >
            <span className="text-[#FFA200]">Post a Comment</span>
          </button>
        </div>
      </form>
    </div>
  );
}