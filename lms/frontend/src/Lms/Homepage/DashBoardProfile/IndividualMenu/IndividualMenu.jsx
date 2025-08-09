import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Indiviualdashboardmain } from "../Profile/Profile";
import axios from "axios";
import {  FaEnvelope,FaCreditCard,FaSignOutAlt,FaChartArea } from "react-icons/fa";

export function Indiviualmenu() {
  const navigate = useNavigate();
  const { id } = useParams();

  const [isOpen, setIsOpen] = useState(false);

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}auth/protected`,
          { withCredentials: true }
        );
        console.log("Token is valid.", response.data);
      } catch (error) {
        console.error("Token verification error.", error);
        navigate("/lmslogin");
      }
    };
    verifyToken();
  }, [navigate]);

  const handleLogout = async (e) => {
    e.preventDefault();
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/lmslogin");

    } catch (error) {
      console.error("Logout error.", error);
    }
  };

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-gray-100 pt-[100px] ">
      <nav className="border border-neutral-900 p-6 ">
        <div className="flex items-center justify-between mb-6  lg:w-50   ">
          <h3 className="text-xl font-bold ">My Spine Coach</h3>
          <button
            aria-label="Toggle Menu"
            onClick={() => setIsOpen((prev) => !prev)}
            className="lg:hidden p-2 rounded-md border border-gray-50">
           <span className="text-black">☰</span>
          </button>
        </div>

        {/* Menu links */}
        <div
          className={`flex-col gap-4 ${
            isOpen ? "flex" : "hidden"
          } lg:flex`}
        >
          
            <Link
              to={`/user/${id}/profile`}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black hover:bg-blue-100 font-bold transition-colors"
            >
              <FaChartArea/>
              Dashboard
            </Link>
         
            <Link
              to={`/user/${id}/message`}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black  hover:bg-blue-100  font-bold transition-colors"
            >
              <FaEnvelope/>
              Messages
            </Link>
        

         
            <Link
              to={`/user/${id}/payment`}
              className="flex items-center gap-2 px-4 py-2 rounded-md text-black hover:bg-blue-100  font-bold transition-colors"
            >
              <FaCreditCard/>
              Payment
            </Link>
        

          
            <button
              onClick={handleLogout}
              className="flex items-center gap-2 px-4 py-2 rounded-md hover:bg-blue-100  text-black font-bold transition-colors w-full text-left">
                <FaSignOutAlt/>
              Logout
            </button>
          
        </div>
      </nav>

      {/* Main content */}
      <div className="flex-grow p-6">
        <Indiviualdashboardmain />
      </div>
    </div>
  );
}

export default Indiviualmenu;
