

import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import ViewBooks from "../ViewBooks/ViewBooks";
import Adminblogview from "../Adminblogview/Adminblogview";

function Admindatapage() {
  const navigate = useNavigate();
  // Use localStorage to set default or last selected category
  const [selectedCategory, setSelectedCategory] = useState(() => {
    return localStorage.getItem("selectedCategory") || "Blog Leads";
  });

  const [contactLeads, setContactLeads] = useState([]);
  const [emailLeads, setEmailLeads] = useState([]);
  const [blogLeads, setBlogLeads] = useState([]);

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
    localStorage.setItem("selectedCategory", category);
  };

  useEffect(() => {
    const fetchContactLeads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/contact-form`);
        setContactLeads(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching contact leads:", error);
      }
    };

    fetchContactLeads();
  }, []);

  useEffect(() => {
    const fetchEmailLeads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/email-form`);
        setEmailLeads(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching email leads:", error);
      }
    };

    fetchEmailLeads();
  }, []);

  useEffect(() => {
    const fetchBlogLeads = async () => {
      try {
        const response = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/v1/user/blog-form`);
        setBlogLeads(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching blog leads:", error);
      }
    };

    fetchBlogLeads();
  }, []);

  return (
    <div className="overflow-hidden bg-gray-100 pt-[100px] pl-4 mt-5 ">
      <h1 className="text-center text-3xl font-bold my-6">Leads Page</h1>
      <div className="flex flex-col md:flex-row justify-center gap-4 mb-6 border-b pb-4 flex-wrap">
        {["Blog Leads", "Email Subscribers", "ContactLeads", "Blogs", "Books"].map((category) => (
          <button
            key={category}
            onClick={() => handleCategoryClick(category)}
            className={`px-4 py-2 rounded cursor-pointer ${
              selectedCategory === category ? "text-[#ffa200]" : "text-[#001040]"
            }`}>
            {category}
          </button>
        ))}
        <button
          onClick={() => {
            localStorage.removeItem("admin-token");
            localStorage.removeItem("selectedCategory"); // clear on logout
            navigate("/");
          }}
          className="px-4 py-2 text-red-600 rounded cursor-pointer"
        >
          Logout
        </button>
      </div>

      {/* Blog Leads */}
      {selectedCategory === "Blog Leads" && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Blog Leads</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-[#001040] text-white">
                <tr>
                  <th className="px-4 py-2 border">S.No</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Website</th>
                  <th className="px-4 py-2 border">Message</th>
                </tr>
              </thead>
              <tbody>
                {blogLeads.length > 0 ? (
                  blogLeads.map((lead, index) => (
                    <tr key={index} className="text-center font-normal">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{lead.first_name}</td>
                      <td className="px-4 py-2 border">{lead.email}</td>
                      <td className="px-4 py-2 border">{lead.website}</td>
                      <td className="px-4 py-2 border">{lead.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="5" className="text-center py-4">
                      No blog leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Email Subscribers */}
      {selectedCategory === "Email Subscribers" && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Email Subscribers</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-[#001040] text-white">
                <tr>
                  <th className="px-4 py-2 border">S.No</th>
                  <th className="px-4 py-2 border">First Name</th>
                  <th className="px-4 py-2 border">Last Name</th>
                  <th className="px-4 py-2 border">Email</th>
                </tr>
              </thead>
              <tbody>
                {emailLeads.length > 0 ? (
                  emailLeads.map((lead, index) => (
                    <tr key={index} className="text-center font-normal">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{lead.first_name}</td>
                      <td className="px-4 py-2 border">{lead.last_name}</td>
                      <td className="px-4 py-2 border">{lead.email}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No email subscribers found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}

      {/* Blogs */}
      {selectedCategory === "Blogs" && <Adminblogview/>}

      {/* Books */}
      {selectedCategory === "Books" && <ViewBooks />}

      {/* Contact Leads */}
      {selectedCategory === "ContactLeads" && (
        <div className="bg-white shadow rounded p-4">
          <h2 className="text-xl font-semibold mb-4">Contact Leads</h2>
          <div className="overflow-x-auto">
            <table className="min-w-full border border-gray-300">
              <thead className="bg-[#001040] text-white">
                <tr>
                  <th className="px-4 py-2 border">S.No</th>
                  <th className="px-4 py-2 border">Name</th>
                  <th className="px-4 py-2 border">Email</th>
                  <th className="px-4 py-2 border">Message</th>
                </tr>
              </thead>
              <tbody>
                {contactLeads.length > 0 ? (
                  contactLeads.map((lead, index) => (
                    <tr key={index} className="text-center font-normal">
                      <td className="px-4 py-2 border">{index + 1}</td>
                      <td className="px-4 py-2 border">{lead.full_name}</td>
                      <td className="px-4 py-2 border">{lead.email}</td>
                      <td className="px-4 py-2 border">{lead.message}</td>
                    </tr>
                  ))
                ) : (
                  <tr>
                    <td colSpan="4" className="text-center py-4">
                      No contact leads found.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}

export default Admindatapage;
