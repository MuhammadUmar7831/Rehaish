import React, { useState, useEffect } from "react";
import axios from "axios";

function Listing() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);

  useEffect(() => {
    axios
      .get("/api/listing/getUserListing")
      .then((response) => {
        setListings(response.data.listing);
        setLoading(false);
      })
      .catch((error) => {
        setError("Error fetching listings");
        setLoading(false);
      });
  }, []);

  return (
    <div className="container mx-auto py-8">
      {loading && <p className="text-center text-gray-600">Loading...</p>}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <div
            key={listing._id}
            className="border overflow-hidden shadow-lg hover:shadow-lg"
          >
            <div className="relative">
              <img
                src={listing.imageUrls[0]}
                alt={listing.name}
                className="w-full h-48 object-cover"
              />
              {listing.offer && (
                <span className="absolute top-1 right-1 px-3 py-1 bg-red-500 hover:bg-red-400 text-white">
                  Offer
                </span>
              )}
            </div>
            <div className="p-4">
              <h2 className="text-xl font-semibold">{listing.name}</h2>
              <p className="text-gray-700 mt-2">{listing.description}</p>
              <div className="mt-4">
                <p>
                  <span className="font-semibold">Address:</span>{" "}
                  {listing.address}
                </p>
                <p>
                  <span className="font-semibold">Regular Price:</span>{" "}
                  {listing.regularPrice}
                </p>
                {listing.offer && (
                  <p>
                    <span className="font-semibold">Discount Price:</span>{" "}
                    {listing.discountPrice}
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
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Listing;