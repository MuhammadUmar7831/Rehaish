import React from "react";
import { useParams } from "react-router-dom";

export default function Listing() {
  let { listingId } = useParams();
  return <div>Listing: {listingId}</div>;
}
