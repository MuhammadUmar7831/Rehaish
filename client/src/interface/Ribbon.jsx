import React from "react";

export default function Ribbon(props) {
  const { text } = props;
  return (
    <div className="absolute right-0 top-0 h-16 w-16">
      <div className="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px] shadow-xl cursor-pointer">
        {text}
      </div>
    </div>
  );
}
