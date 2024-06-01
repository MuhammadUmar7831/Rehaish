import { suffixFormater } from "../utils/myListing.utils";
import { useState } from "react";

export default function PriceTag(props) {
  const formatPrice = (price) => {
    return suffixFormater(price);
  };

  const [isHovered, setIsHovered] = useState(false);

  const handleHover = () => {
    setIsHovered(!isHovered);
  };

  const { price, cut, type } = props;
  return (
    <div
      className="flex relative text-xl cursor-pointer w-fit"
      onMouseEnter={handleHover}
      onMouseLeave={handleHover}
    >
      <span
        className={`absolute -top-10 bg-white rounded-xl px-2 py-1 border-2 border-black cursor-text ${
          isHovered ? "opacity-100" : "opacity-0"
        } transition-opacity duration-300`}
      >
        {price}
      </span>
      <span className={`${cut ? "line-through" : ""}`}>
        {" "}
        {formatPrice(price)}
        {type === "sell" ? "" : "/ month"}
      </span>
    </div>
  );
}
