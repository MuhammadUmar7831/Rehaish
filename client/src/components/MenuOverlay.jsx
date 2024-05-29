import React from "react";
import { Link } from "react-router-dom";
import CrossSvg from "../interface/CrossSvg";

export default function MenuOverlay(props) {
  const { onClose } = props;
  return (
    <div className="fixed top-0 left-0 w-full h-full z-20 bg-green-50 flex justify-center">
      <button
        onClick={onClose}
        className="absolute top-4 right-4 focus:outline-none"
      >
        <CrossSvg />
      </button>
      <div className="flex flex-col justify-center text-center text-5xl space-y-5">
        <Link onClick={onClose} to="/">
          Home
        </Link>
        <Link onClick={onClose} to="/about">
          About
        </Link>
        <Link onClick={onClose} to="/create-listing">
          Create Listing
        </Link>
        <Link onClick={onClose} to="/listings">
          My Listings
        </Link>
      </div>
    </div>
  );
}
