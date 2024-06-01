import { useState } from "react";
import { useParams } from "react-router-dom";
import { getListinByListingId } from "../api/lisiting.api";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "../redux/slices/loading.slice";

export default function useListing() {
  let { listingId } = useParams();
  const [listing, setListing] = useState();
  const [error, setError] = useState(false);
  const dispatch = useDispatch();
  const { loading } = useSelector((state) => state.loading);

  const getData = async () => {
    dispatch(setLoading(true));
    const res = await getListinByListingId(listingId);
    if (res.success === false) {
      console.log(res.message);
      setError(res.message);
    } else {
      setError(false);
      setListing(res.listing);
    }
    dispatch(setLoading(false));
  };
  return { getData, loading, error, listing };
}
