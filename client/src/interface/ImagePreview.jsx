import { useState } from "react";
import { BounceLoader } from "react-spinners";

export default function ImagePreview(props) {
  const { url, onClose } = props;
  const [imageLoading, setImageLoading] = useState(true);

  const handleClick = (e) => {
    e.stopPropagation();
  };

  return (
    <div
      className="fixed top-0 left-0 w-full h-full flex justify-center items-center z-10 bg-black bg-opacity-80 cursor-default"
      onClick={onClose}
    >
      {imageLoading && (
        <div className="absolute inset-0 flex justify-center items-center">
          <BounceLoader color="#36d7b7" />
        </div>
      )}
      <div className="relative w-4/5 h-4/5">
        <img
          src={url}
          onClick={handleClick}
          onLoad={() => setImageLoading(false)}
          className={`absolute inset-0 w-full h-full object-contain ${
            imageLoading ? "" : "bg-white"
          }`}
        />
      </div>
    </div>
  );
}
