import React, { useEffect } from "react";
import { motion } from "framer-motion";
import "./SuperAdminSidebar.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faHome,
  faUser,
  faBars,
  faFile,
  faPowerOff,
  faFileLines,
  faLayerGroup,
  faDriversLicense,
  faDashboard,
} from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";


const sidebarVariants = {
  open: { width: "200px" },
  closed: { width: "50px" },
};


const linkVariants = {
  open: { opacity: 1, display: "inline-block" },
  closed: { opacity: 0, display: "none" },
};


function SuperAdminSidebar({ isOpen, toggleSidebar }) {
  // const [isOpen, setIsOpen] = React.useState(false);


  const { id } = useParams();
  // console.log("adminside", id);
  // const toggleSidebar = () => {
  //   setIsOpen(!isOpen);
  // };


  const navigate = useNavigate();


  useEffect(() => {
    const verifyToken = async () => {
      try {
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}auth/protected`,
          {
            withCredentials: true,
          }
        );
        console.log("Token is valid:", response.data);
      } catch (error) {
        console.error("Token verification error:", error);
        navigate("/login");
      }
    };


    verifyToken();
  }, [navigate]);


  const handleLogout = async () => {
    try {
      await axios.post(
        `${process.env.REACT_APP_API_URL}auth/logout`,
        {},
        { withCredentials: true }
      );
      document.cookie =
        "authToken=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      navigate("/login");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };


  return (
    <motion.div
      className="sidebar"
      initial={false}
      animate={isOpen ? "open" : "closed"}
      variants={sidebarVariants}
    >
      <div className="toggle-btn" onClick={toggleSidebar}>
        <FontAwesomeIcon icon={faBars} />
      </div>
      <ul>
        <li>
          <Link to={`/superadmin/${id}/dashboard`}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" class="lucide lucide-house-icon lucide-house"><path d="M15 21v-8a1 1 0 0 0-1-1h-4a1 1 0 0 0-1 1v8"/><path d="M3 10a2 2 0 0 1 .709-1.528l7-5.999a2 2 0 0 1 2.582 0l7 5.999A2 2 0 0 1 21 10v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"/></svg>
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none "
            >
              Dashboard
            </motion.span>
          </Link>
        </li>
        <li>
          <Link to={`/superadmin/${id}/approve`}>
            <FontAwesomeIcon icon={faDriversLicense} className="mx-1 text-light " />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none "
            >
              Approve
            </motion.span>
          </Link>
        </li>
        <li>
          <Link onClick={handleLogout}>
            <FontAwesomeIcon icon={faPowerOff} className="mx-1 text-light" />
            <motion.span
              variants={linkVariants}
              className="text-white text-decoration-none ms-1"
            >
              Logout
            </motion.span>
          </Link>
        </li>
      </ul>
    </motion.div>
  );
}


export default SuperAdminSidebar;




