import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faTimes,
  faBook,
  faFile,
  faFileUpload,
  faLightbulb,
  faPowerOff,
  faLayerGroup,
  faFileLines,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./Sidebarinstructor.css"

const sidebarVariants = {
  open: { width: "230px" },
  closed: { width: "0px" },
};

function Sidebarinstructor({ isOpen, toggleSidebar }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}auth/protected`,
          { withCredentials: true }
        );
        console.log("Token is valid:", response.data);
      } catch (error) {
        console.error("Token verification error:", error);
        navigate("/lmslogin");
      }
    };
    verifyToken();
  }, [navigate]);

  const handleLogout = async () => {
    try {
      await axios.post(
        `${import.meta.env.VITE_REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie = "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/lmslogin");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <>
      {/* Toggle icon - positioned independently with higher z-index */}
      <div
        className="fixed top-2.5 left-2.5 p-3 cursor-pointer bg-transparent rounded z-[60]"
        onClick={toggleSidebar}
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          size="lg"
          style={{
            color : isOpen ? "white" : "black"
          }}
          
        />
      </div>

      {/* Sidebar content */}
      <motion.div
        className="fixed h-full bg-[#001040] z-50 overflow-hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
        transition={{ type: "spring", stiffness: 300, damping: 30 }}
      >
        {/* Links (only rendered when sidebar is open) */}
        {isOpen && (
          <ul className="mt-10">
            <li>
              <Link
                to={`/instructordashboard/${id}/courselist`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200 "
              >
                <FontAwesomeIcon icon={faHome} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Home</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/instructordashboard/${id}/category`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faLayerGroup} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Add Category</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/instructordashboard/${id}/coursecreation`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200 "
              >
                <FontAwesomeIcon icon={faFile} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Add Courses</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/instructordashboard/${id}/addmodule`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200 "
              >
                <FontAwesomeIcon icon={faFileLines} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Module</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/instructordashboard/${id}/addpagecontent`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faFileUpload} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Course Content</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/instructordashboard/${id}/addquestion`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200 "
              >
                <FontAwesomeIcon icon={faLightbulb} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Quiz</span>
              </Link>
            </li>
            <li>
              <Link
                to={`/instructordashboard/${id}/questionbank`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200 "
              >
                <FontAwesomeIcon icon={faBook} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Question Bank</span>
              </Link>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPowerOff} className="min-w-[20px] text-center mr-3 text-white" />
                <span>Logout</span>
              </button>
            </li>
          </ul>
        )}
      </motion.div>
    </>
  );
}

export default Sidebarinstructor;