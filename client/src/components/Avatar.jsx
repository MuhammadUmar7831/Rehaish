import React, { useState, useEffect, useRef } from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

const Avatar = () => {
  const [showMenu, setShowMenu] = useState(false);
  const { user } = useSelector((state) => state.user);
  const menuRef = useRef();

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setShowMenu(false);
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  if (!user) {
    // render if user is not signed in
    return (
      <Link to="/sign-in" className="px-3 py-2 hover:bg-slate-300 rounded-md">
        Sign In
      </Link>
    );
  }

  // render if user is signed in
  return (
    <div className="relative px-3 py-2" ref={menuRef}>
      <img
        src={user.avatar}
        alt="Avatar"
        className="rounded-full w-10 h-10 cursor-pointer"
        style={{
          backgroundImage: 'url("/images/male.jpg")',
          backgroundSize: "cover",
        }}
        onClick={toggleMenu}
      />
      {showMenu && (
        <div className="absolute z-10 right-0 mt-2 w-48 bg-white border rounded-lg shadow-lg">
          <Link
            to="/profile"
            className="block px-4 py-2 text-gray-800 hover:bg-slate-200 w-full text-left"
            onClick={toggleMenu}
          >
            Profile
          </Link>
          <Link
            to="/sign-in"
            className="block px-4 py-2 text-gray-800 hover:bg-slate-200 w-full text-left"
            onClick={toggleMenu}
          >
            Sign In
          </Link>
          <Link
            to="/sign-up"
            className="block px-4 py-2 text-gray-800 hover:bg-slate-200 w-full text-left"
            onClick={toggleMenu}
          >
            Sign Up
          </Link>
        </div>
      )}
    </div>
  );
};

export default Avatar;
