import React, { useState, useEffect } from "react";
import axios from "axios";

function Listing() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);

  function formatPrice(num, format) {
    const formatterUrdu = new Intl.NumberFormat("ur-PK", {
      style: "currency",
      currency: "PKR",
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      notation: "compact",
      compactDisplay: "long",
    });

    const formatterEnglish = new Intl.NumberFormat("en-PK", {
      style: "currency",
      currency: "PKR",
      currencyDisplay: "symbol",
      minimumFractionDigits: 0,
      maximumFractionDigits: 2,
      notation: "compact",
      compactDisplay: "long",
    });

    const formattedUrdu = formatterUrdu.format(num);
    const formattedEnglish = formatterEnglish.format(num);

    return formattedEnglish + " (" + formattedUrdu + ")";
  }

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
    <div className="container mx-auto py-8 px-2">
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
                <div class="absolute right-0 top-0 h-16 w-16">
                  <div class="absolute transform rotate-45 bg-green-600 text-center text-white font-semibold py-1 right-[-35px] top-[32px] w-[170px]">
                    Offer
                  </div>
                </div>
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
                  <span className="font-semibold">
                    {listing.offer && `Regular`} Price:
                  </span>{" "}
                  {formatPrice(listing.regularPrice)}{" "}
                  {listing.type === "sell" ? "" : "/ month"}
                </p>
                {listing.offer && (
                  <p>
                    <span className="font-semibold">Discount Price:</span>{" "}
                    {formatPrice(listing.discountPrice)}{" "}
                    {listing.type === "sell" ? "" : "/ month"}
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
