import { useEffect } from "react";
import useListings from "../hooks/listings.hook";
import LoadingOverlay from "../interface/LoadingOverlay";
import ListingCard from "../components/ListingCard";

function Listing() {
  const {
    loading,
    setLoading,
    error,
    setError,
    listings,
    setListings,
    getUserListing,
  } = useListings();

  useEffect(() => {
    getUserListing();
  }, []);

  return (
    <div className="container mx-auto py-8 px-2">
      {loading && <LoadingOverlay />}
      {error && <p className="text-center text-red-500">{error}</p>}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
        {listings.map((listing) => (
          <ListingCard listing={listing} key={listing._id}/>
        ))}
      </div>
    </div>
  );
}

export default Listing;
