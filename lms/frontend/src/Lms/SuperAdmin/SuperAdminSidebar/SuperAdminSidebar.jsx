import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faBars,
  faTimes,
  faDashboard,
  faDriversLicense,
  faPowerOff,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const sidebarVariants = {
  open: {
    width: "200px",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
  closed: {
    width: "0px",
    transition: { duration: 0.3, ease: "easeInOut" },
  },
};

function SuperAdminSidebar({ isOpen, toggleSidebar }) {
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    const verifyToken = async () => {
      try {
        await axios.get(
          `${import.meta.env.VITE_REACT_APP_API_URL}auth/protected`,
          { withCredentials: true }
        );
      } catch (error) {
        console.error("Token verification error.", error);
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
      console.error("Logout error.", error);
    }
  };

  return (
    <>
       <motion.div
        className="fixed top-2.5 left-2.5 p-3 cursor-pointer rounded-lg z-[100] bg-transparent bg-opacity-50 backdrop-blur-md"
        onClick={toggleSidebar}
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggleSidebar()}
        aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
      >
        <FontAwesomeIcon
          icon={isOpen ? faTimes : faBars}
          style={{ color: isOpen ? "white" : "black" }}
          size="lg"
          
        />
      </motion.div>


      <motion.div
        className="fixed h-full bg-[#001040] overflow-hidden"
        initial={false}
        animate={isOpen ? "open" : "closed"}
        variants={sidebarVariants}
      >
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.1, duration: 0.2 }}
            className="mt-16 pt-2 w-[200px] flex flex-col justify-center space-y-7"
          >
            <motion.div whileHover={{ x: 5 }}>
              <Link
                to={`/superadmin/${id}/dashboard`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faDashboard} className="min-w-[20px] text-center mr-3" />
                <span>Dashboard</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ x: 5 }}>
              <Link
                to={`/superadmin/${id}/approve`}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faDriversLicense} className="min-w-[20px] text-center mr-3" />
                <span>Approve</span>
              </Link>
            </motion.div>

            <motion.div whileHover={{ x: 5 }}>
              <button
                onClick={handleLogout}
                className=" p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
              >
                <FontAwesomeIcon icon={faPowerOff} className="min-w-[20px] text-center mr-3" />
                <span>Logout</span>
              </button>
            </motion.div>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}

export default SuperAdminSidebar;