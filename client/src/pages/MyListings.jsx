import { useEffect } from "react";
import useListings from "../hooks/myListings.hook";
import LoadingOverlay from "../interface/LoadingOverlay";
import MyListingCard from "../components/MyListingCard";
import { useSelector } from "react-redux";

function MyListing() {
  const { error, listings, getUserListing } =
    useListings();

  const { loading } = useSelector((state) => state.loading);

  useEffect(() => {
    getUserListing();
  }, []);

  return (
    <div className="container mx-auto py-8 px-2">
      {loading && <LoadingOverlay />}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <MyListingCard listing={listing} key={listing._id} />
        ))}
      </div>
    </div>
  );
}

export default MyListing;
