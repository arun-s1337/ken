import { useEffect, useState } from "react";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import Mainlogo from "../../../assets/image 39.png";
import loginimg from "../../../assets/profile1.png";
import "./Drmenubar.css"

export default function DrMenuBarUser() {
  const navigate = useNavigate();
  const { id } = useParams();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

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
    <nav className="bg-[#001040] py-6 px-4 sm:px-6 w-full fixed top-0 left-0 z-50">
      <div className="container mx-auto flex flex-wrap items-center justify-between">
        {/* Logo */}
        <NavLink to={`/`} className="flex items-center">
          <img src={Mainlogo} alt="Main Logo" className="h-10" />
        </NavLink>

        {/* Hamburger menu button for mobile */}
        <button
          className="lg:hidden text-white focus:outline-none"
          onClick={() => setIsMenuOpen(!isMenuOpen)}
        >
          <svg
            className="w-6 h-6 "
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            {isMenuOpen ? (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            ) : (
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M4 6h16M4 12h16M4 18h16"
              />
            )}
          </svg>
        </button>

        {/* Mobile menu */}
        <div className={`${isMenuOpen ? 'block' : 'hidden'} w-full lg:hidden`}>
          <div className="flex flex-col space-y-4 mt-4">
          
              <NavLink
                to={`/user/${id}`}
                className="text-white hover:text-[#ffa200] px-3 py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Home
              </NavLink>
            
           
              <NavLink
                to={`/allcourselist/${id}`}
                className="text-white hover:text-[#ffa200] px-3 py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                My Course
              </NavLink>
            
            
              <NavLink
                to={`/grade/${id}`}
                className="text-white hover:text-[#ffa200] px-3 py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Grade
              </NavLink>
            
              <NavLink
                to={`/badge/${id}`}
                className="text-white hover:text-[#ffa200] px-3 py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Badge
              </NavLink>
            
              {/* <NavLink
                to={`/feedback/${id}`}
                className="text-white hover:text-[#ffa200] px-3 py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Feedback
              </NavLink> */}
            
              <NavLink
                to={`/user/${id}/profile`}
                className=" text-[#001040] px-3 py-2 block"
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
            
              <NavLink
                to="/lmslogin"
                className="text-white hover:text-[#ffa200] px-3 py-2 block"
                onClick={() => {
                  setIsMenuOpen(false);
                  handleLogout();
                }}
              >
                Logout
              </NavLink>
            
          </div>
        </div>

       
        <div className="hidden font-bold lg:flex items-center space-x-6">
          <NavLink
            to={`/user/${id}`}
            className="text-white hover:text-[#ffa200] transition-colors duration-200"
          >
            Home
          </NavLink>
          <NavLink
            to={`/allcourselist/${id}`}
            className="text-white hover:text-[#ffa200] transition-colors duration-200"
          >
            My Course
          </NavLink>
          <NavLink
            to={`/grade/${id}`}
            className="text-white hover:text-[#ffa200] transition-colors duration-200"
          >
            Grade
          </NavLink>
          <NavLink
            to={`/badge/${id}`}
            className="text-white hover:text-[#ffa200] transition-colors duration-200"
          >
            Badge
          </NavLink>
          {/* <NavLink
            to={`/feedback/${id}`}
            className="text-white hover:text-[#ffa200] transition-colors duration-200"
          >
            Feedback
          </NavLink> */}

          
          <div className="relative ml-4 ">
            <button
              className="focus:outline-none "
              onClick={() => setIsDropdownOpen(!isDropdownOpen)}
            >
              <img src={loginimg} alt="Profile" className="w-8 h-8 mt-2" />
            </button>

            {isDropdownOpen && (
              <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-50">
                <button
                 
                   className="block w-full text-left px-4 py-2 text-[#001040] hover:bg-[#001040]/10"
                  onClick={() => {
                    navigate(`/user/${id}/profile`)
                    setIsDropdownOpen(false)
                  }}
                >
                  Profile
                </button>
                <button
                  onClick={() => {
                    setIsDropdownOpen(false);
                    handleLogout();
                  }}
                  className="block w-full text-left px-4 py-2 text-[#001040] hover:bg-[#001040]/10"
                >
                  Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
}