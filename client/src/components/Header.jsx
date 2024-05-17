import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-slate-100 p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo*/}
        <Link to="/" className="text-lg font-bold">
          Logo
        </Link>

        {/* Search bar*/}
        <form
          className={`flex lg:w-1/4 ${
            showMenu ? "hidden" : "block"
          } px-4 relative`}
        >
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-300 rounded-s-md py-2 px-3 md:px-10 lg:px-10 focus:outline-none"
          />
          <button
            type="button"
            className="pl-3 flex items-center hover:cursor-pointer px-3 rounded-e-md bg-slate-200 hover:bg-slate-400"
          >
            <RiSearchLine className="text-gray-500" />
          </button>
        </form>

        {/* Links */}
        <div className={`lg:flex items-center ${showMenu ? "flex" : "hidden"}`}>
          <Link to="/" className="px-3 py-2 hover:bg-slate-300 rounded-md">
            Home
          </Link>
          <Link to="/about" className="px-3 py-2 hover:bg-slate-300 rounded-md">
            About
          </Link>

          {/* Account icon */}
            <Avatar />
        </div>

        {/* Hamburger menu button for mobile */}
        <div className="flex lg:hidden">
          <button onClick={() => setShowMenu(!showMenu)}>
            <svg
              className="w-6 h-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              {showMenu ? (
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
                  d="M4 6h16M4 12h16m-7 6h7"
                />
              )}
            </svg>
          </button>
        </div>
      </div>
    </header>
  );
}
