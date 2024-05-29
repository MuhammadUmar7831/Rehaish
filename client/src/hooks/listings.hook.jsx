import React, { useState } from "react";
import { getUserListingApi } from "../api/lisiting.api";

export default function useListings() {
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);

  const getUserListing = async () => {
    const res = await getUserListingApi();
    if (res.success === false) {
      setError(res.message);
      setLoading(false);
      return;
    }
    setListings(res.listing);
    setError(false);
    setLoading(false);
  };

  return {
    loading,
    setLoading,
    error,
    setError,
    listings,
    setListings,
    getUserListing,
  };
}
