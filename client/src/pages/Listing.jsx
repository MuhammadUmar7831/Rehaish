import { useEffect } from "react";
import { MapPin } from "react-feather";
import { PiBathtub } from "react-icons/pi";
import { IoBedOutline } from "react-icons/io5";
import { TbHomeStar } from "react-icons/tb";
import { TbHomeCancel } from "react-icons/tb";
import { LuParkingCircle } from "react-icons/lu";
import { LuParkingCircleOff } from "react-icons/lu";
import LoadingOverlay from "../interface/LoadingOverlay";
import useListing from "../hooks/listing.hooks";
import ImageSwiper from "../interface/ImageSwiper";
import OfferBadge from "../interface/OfferBadge";
import PriceTag from "../interface/PriceTag";
import Ribbon from "../interface/Ribbon";

export default function Listing() {
  const { getData, loading, error, listing } = useListing();
  useEffect(() => {
    getData();
  }, []);

  return (
    <>
      {loading && <LoadingOverlay />}
      {!loading && (
        <div>
          {error && <p className="text-red-500 text-center mt-2">{error}</p>}
          {listing && (
            <>
              <ImageSwiper imageUrls={listing.imageUrls} />
              <div className="relative overflow-hidden flex gap-4 flex-col mx-auto my-10 w-2/3 bg-zinc-100 rounded-2xl p-4">
                <Ribbon
                  text={listing.type === "sell" ? "for sale" : "for rent"}
                />
                <h1 className="text-4xl font-semibold">{listing.name}</h1>
                <OfferBadge />
                <p className="flex gap-3">
                  <MapPin /> <span>{listing.address}</span>
                </p>
                <PriceTag
                  price={listing.regularPrice}
                  cut={listing.offer}
                  type={listing.type}
                />
                {listing.offer && (
                  <PriceTag price={listing.discountPrice} type={listing.type} />
                )}
                <p>{listing.description}</p>
                <div className="flex gap-2 text-3xl">
                  <p className="flex">
                    <IoBedOutline />{" "}
                    <span className="text-base mx-2">{listing.beds} beds</span>
                  </p>
                  <p className="flex">
                    <PiBathtub />{" "}
                    <span className="text-base mx-2">
                      {listing.baths} baths
                    </span>
                  </p>
                  {listing.furnished && (
                    <p className="flex">
                      <TbHomeStar />{" "}
                      <span className="text-base mx-2">furnished</span>
                    </p>
                  )}
                  {!listing.furnished && (
                    <p className="flex">
                      <TbHomeCancel />{" "}
                      <span className="text-base mx-2">not furnished</span>
                    </p>
                  )}
                  {listing.parkingSpot && (
                    <p className="flex">
                      <LuParkingCircle />{" "}
                      <span className="text-base mx-2">parking</span>
                    </p>
                  )}
                  {!listing.parkingSpot && (
                    <p className="flex">
                      <LuParkingCircleOff />{" "}
                      <span className="text-base mx-2">no parking</span>
                    </p>
                  )}
                </div>
              </div>
            </>
          )}
        </div>
      )}
    </>
  );
}
