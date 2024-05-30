import { useState } from "react";
import { getUserListingApi } from "../api/lisiting.api";
import { useDispatch } from "react-redux";
import { setLoading } from "../redux/slices/loading.slice";

export default function useListings() {
  const dispatch = useDispatch();

  const [error, setError] = useState("");
  const [listings, setListings] = useState([]);

  const getUserListing = async () => {
    dispatch(setLoading(true));
    const res = await getUserListingApi();
    if (res.success === false) {
      setError(res.message);
      dispatch(setLoading(false));
      return;
    }
    setListings(res.listing);
    setError(false);
    dispatch(setLoading(false));
  };

  return {
    error,
    setError,
    listings,
    setListings,
    getUserListing,
  };
}
