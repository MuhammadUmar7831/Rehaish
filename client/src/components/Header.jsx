import React, { useState } from "react";
import { RiSearchLine } from "react-icons/ri";
import { Link } from "react-router-dom";
import Avatar from "./Avatar";
import MenuOverlay from "./MenuOverlay";
import HamburgerSvg from "../interface/HamburgerSvg";

export default function Header() {
  const [showMenu, setShowMenu] = useState(false);

  return (
    <header className="bg-slate-100 shadow-md p-4">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        {/* Logo*/}
        <Link to="/" className="text-lg font-bold">
          Rehaish
        </Link>

        {/* Search bar*/}
        <form className={`hidden md:flex lg:w-1/4 px-4 relative`}>
          <input
            type="text"
            placeholder="Search..."
            className="w-full bg-slate-200 rounded-s-md py-2 px-3 md:px-10 lg:px-10 focus:outline-none"
          />
          <button
            type="button"
            className="pl-3 flex items-center hover:cursor-pointer px-3 rounded-e-md bg-slate-300 hover:bg-slate-400"
          >
            <RiSearchLine className="text-gray-400" />
          </button>
        </form>

        {/* Links */}
        <div className={`lg:flex items-center hidden`}>
          <Link to="/" className="px-3 py-2 hover:bg-slate-300 rounded-md">
            Home
          </Link>
          <Link to="/about" className="px-3 py-2 hover:bg-slate-300 rounded-md">
            About
          </Link>
          <Link
            to="/create-listing"
            className="px-3 py-2 hover:bg-slate-300 rounded-md"
          >
            Create Listing
          </Link>
          <Link
            to="/my-listing"
            className="px-3 py-2 hover:bg-slate-300 rounded-md"
          >
            My Listing
          </Link>
          <Avatar />
        </div>

        {/* Hanburger & Avatar */}
        <div className="flex lg:hidden">
          <Avatar />
          <button onClick={() => setShowMenu(!showMenu)}>
            <HamburgerSvg />
          </button>
        </div>

        {showMenu && (
          <MenuOverlay
          className="w-full h-full"
            onClose={() => {
              setShowMenu(!showMenu);
            }}
          />
        )}
      </div>
    </header>
  );
}
