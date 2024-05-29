import React, { useState } from "react";
import { BounceLoader } from "react-spinners";
import { suffixFormater } from "../utils/listing.utils";
import { MdEdit } from "react-icons/md";
import { Trash2 } from "react-feather";
import Ribbon from "../interface/Ribbon";

export default function ListingCard(props) {
  const { listing } = props;
  const [imageLoadingStates, setImageLoadingStates] = useState(true);

  const formatPrice = () => {
    return suffixFormater(listing.regularPrice);
  };

  return (
    <>
      <div
        key={listing._id}
        className="border overflow-hidden shadow-lg hover:shadow-lg"
      >
        <div className="relative">
          {imageLoadingStates && (
            <div className="absolute inset-0 flex justify-center items-center bg-gray-200 opacity-75">
              <BounceLoader color="#36d7b7" />
            </div>
          )}
          <img
            src={listing.imageUrls[0]}
            alt={listing.name}
            className="w-full h-48 object-cover"
            onLoad={() => setImageLoadingStates(false)}
          />
          {listing.offer && <Ribbon />}
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold">{listing.name}</h2>
          <p className="text-gray-700 mt-2">{listing.description}</p>
          <div className="mt-4">
            <p>
              <span className="font-semibold">Address:</span> {listing.address}
            </p>
            <p>
              <span className="font-semibold">
                {listing.offer && `Regular`} Price:
              </span>{" "}
              <span className={listing.offer ? `line-through` : ``}>
                {formatPrice()} {listing.type === "sell" ? "" : "/ month"}
              </span>
            </p>
            {listing.offer && (
              <p>
                <span className="font-semibold">Discount Price:</span>{" "}
                {formatPrice()} {listing.type === "sell" ? "" : "/ month"}
              </p>
            )}
            <p>
              <span className="font-semibold">Baths:</span> {listing.baths}
            </p>
            <p>
              <span className="font-semibold">Beds:</span> {listing.beds}
            </p>
            <p>
              <span className="font-semibold">Furnished:</span>{" "}
              {listing.furnished ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Parking Spot:</span>{" "}
              {listing.parkingSpot ? "Yes" : "No"}
            </p>
            <p>
              <span className="font-semibold">Type:</span> {listing.type}
            </p>
            <p>
              <span className="font-semibold">Size:</span> {listing.size}
            </p>
          </div>
          <div className="flex gap-1 justify-end">
            <span className="flex gap-1 cursor-pointer ">
              <MdEdit className="w-6 h-6 mx-1" />
              edit
            </span>
            <span className="flex gap-1 cursor-pointer">
              <Trash2 color="red" className="w-6 h-6 mx-1" />
              delete
            </span>
          </div>
        </div>
      </div>
    </>
  );
}
