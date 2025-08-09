import { useState } from "react";
import { Links } from "../../utils/Links";
import { Link } from "react-router-dom";
import { useLocation } from "react-router-dom";

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  


  return (
    <nav id="main-navbar" className=" bg-[#001040] w-full h-[100px] fixed top-0 left-0 z-50 ">
      <div className="max-w-screen-xl mx-auto flex items-center justify-between px-4 sm:px-10 md:px-16 lg:px-20 py-4">
        <div className="w-[150px] sm:w-[200px] md:w-[250px] lg:w-[296px] h-[32px] sm:h-[40px] md:h-[48px] lg:h-[52px]">
          <img
            src="/image 66.png"
            alt="Logo"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Mobile menu button */}
        <button
          aria-label={isOpen ? "Close menu" : "Open menu"}
          aria-expanded={isOpen}
          aria-controls="mobile-menu"
          className="sm:hidden text-white focus:outline-none"
          onClick={() => setIsOpen(!isOpen)}
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            {isOpen ? (
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

        {/* Desktop Navigation */}
        <div className="hidden sm:flex space-x-3 gap-4 md:gap-6 lg:gap-8">
          {Links.map((link) => (
            <Link
              key={link.id}
              to={link.link}
              className="text-white font-bold md:text-base hover:text-amber-400 transition-colors duration-300"
              {...(link.name === "My Spine Coach"
                ? { rel: "noopener noreferrer" }
                : {})}
            >
              {link.name}
            </Link>
          ))}
        </div>
      </div>

      {/* Mobile Navigation - shows all links */}
      {isOpen && (
        <div
          id="mobile-menu"
          className="sm:hidden bg-[#001040] w-full absolute left-0 z-10 px-4 pb-6 shadow-lg"
        >
          <div className="flex flex-col items-start gap-4 pt-2">
            {Links.map((link) => (
              <Link
                key={link.id}
                to={link.link}
                className="text-white text-base font-medium w-full py-2 border-b border-blue-900 hover:text-amber-400 transition-colors duration-300"
                onClick={() => setIsOpen(false)}
                {...(link.name === "My Spine Coach"
                  ? { rel: "noopener noreferrer" }
                  : {})}
              >
                {link.name}
              </Link>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
}