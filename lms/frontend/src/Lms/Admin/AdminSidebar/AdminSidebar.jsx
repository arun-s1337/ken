import React, { useEffect } from "react";
import { motion } from "framer-motion";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faBars,
  faTimes,
  faPowerOff,
  faFileLines,
  faIdBadge,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const sidebarVariants = {
  open: { width: "220px" },
  closed: { width: "0px" },
};

const linkVariants = {
  open: { opacity: 1, x: 0 },
  closed: { opacity: 0, x: -10 },
};

function Adminsidebar({ isOpen, toggleSidebar }) {
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
      <motion.div
          className="fixed top-2.5 left-2.5 rounded-lg z-[100]  bg-opacity-10 backdrop-blur-md"
          onClick={toggleSidebar}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.95 }}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => e.key === "Enter" && toggleSidebar()}
          aria-label={isOpen ? "Close sidebar" : "Open sidebar"}
          initial={false}
          animate={isOpen ? { backgroundColor: "rgba(0, 0, 0, 0.8)" } : { backgroundColor: "rgba(0, 0, 0, 0.6)" }}
          transition={{ duration: 0.2 }}
      >
          <FontAwesomeIcon
            icon={isOpen ? faTimes : faBars}
            style={{ color: isOpen ? "white" : "white" }}
            size="lg"
            className="p-3"
          />
      </motion.div>

      <motion.div
          className="fixed h-full bg-[#001040] shadow-lg z-[90] overflow-hidden"
          initial={false}
          animate={isOpen ? "open" : "closed"}
          variants={sidebarVariants}
          transition={{ duration: 0.2, ease: "easeInOut" }}
      >
        <motion.ul
          className="mt-16 pt-2 px-4"
          initial={isOpen ? "open" : "closed"}
          animate={isOpen ? "open" : "closed"}
          variants={linkVariants}
          transition={{ duration: 0.2, delay: 0.1 }}
        >
          <li className="mb-2">
            <Link
              to={`/admindashboard/${id}/dashboard`}
              className="flex items-center p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faHome} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Dashboard</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to={`/admindashboard/${id}/purchaselicense`}
              className="flex items-center p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faIdBadge} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Purchase License</span>
            </Link>
          </li>
          <li className="mb-2">
            <Link
              to={`/admindashboard/${id}/courselist`}
              className="flex items-center p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200"
            >
              <FontAwesomeIcon icon={faFileLines} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Course</span>
            </Link>
          </li>
          <li>
            <button
              onClick={handleLogout}
              className="flex items-center p-3 text-white hover:bg-[#002060] rounded-md transition-colors duration-200 w-full text-left"
            >
              <FontAwesomeIcon icon={faPowerOff} className="min-w-[20px] text-center mr-3" />
              <span className={isOpen ? "inline-block whitespace-nowrap" : "hidden"}>Logout</span>
            </button>
          </li>
        </motion.ul>
      </motion.div>
    </>
  );
}

export default Adminsidebar;