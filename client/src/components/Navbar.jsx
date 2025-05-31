import React, { useState } from "react";
import { NavLink } from "react-router-dom";
import {useAuth} from "../store/auth";
export const Navbar = () => {
const {isLoggedIn}=useAuth();

  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  return (
    <>
      {/* Navbar */}
      <header className="flex justify-between items-center px-6 py-4 shadow-md bg-white">
        <div className="flex items-center gap-2">
          <img src="/images/logo.jpeg" alt="Logo" className="w-8 h-8 object-contain rounded-full" />
          <span className="text-2xl font-bold flex items-center gap-1">
            <span className="text-black">MY CAREER</span>
            <span className="text-orange-500 ml-1">COMPASS</span>
          </span>

        </div>

        {/* Mobile Menu Button */}
        <button className="md:hidden flex items-center" onClick={toggleMenu}>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            strokeWidth={2}
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>

        {/* Navbar Links (Desktop) */}
        <nav className="hidden md:flex gap-6 items-center text-lg">
          <NavLink
            to="/"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Home
          </NavLink>

          <NavLink
            to="/awareness"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Awareness
          </NavLink>

          <NavLink
            to="/companies"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Companies
          </NavLink>
          <NavLink
            to="/colleges"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Universities
          </NavLink>
          <NavLink
            to="/community"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Community
          </NavLink>

          <NavLink
            to="/chat"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
           chatRoom
          </NavLink>

          <NavLink
            to="/contact"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Contact Us
          </NavLink>
          {isLoggedIn ? <NavLink
            to="/logout"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Logout
          </NavLink>: <>
          <NavLink
            to="/register"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Register
          </NavLink>

          <NavLink
            to="/login"
            className={({ isActive }) =>
              isActive
                ? "text-orange-500 border-b-2 border-orange-500"
                : "hover:text-orange-400 border-b-2 border-transparent hover:border-orange-400 transition duration-200"
            }
          >
            Login
          </NavLink></>}
          

        </nav>
      </header>

      {isMobileMenuOpen && (
        <div className="md:hidden bg-white shadow-md absolute top-16 left-0 right-0 z-50 px-6 py-4">
          <nav className="flex flex-col gap-4 text-lg">
            <NavLink
              to="/"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-800")}
            >
              Home
            </NavLink>

            <NavLink
              to="/awareness"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-800")}
            >
              Awareness
            </NavLink>

            <NavLink
              to="/companies"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-800")}
            >
              Companies
            </NavLink>

            <NavLink
              to="/contact"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-800")}
            >
              Contact Us
            </NavLink>

            <NavLink
              to="/register"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-800")}
            >
              Register
            </NavLink>

            <NavLink
              to="/login"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-800")}
            >
              Login
            </NavLink>

            <NavLink
              to="/colleges"
              onClick={() => setIsMobileMenuOpen(false)}
              className={({ isActive }) => (isActive ? "text-blue-600 font-semibold" : "text-gray-800")}
            >
              Colleges
            </NavLink>
          </nav>
        </div>
      )}
    </>
  );
};