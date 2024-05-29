import axios from "axios";

export const getUserListingApi = async () => {
  try {
    const response = await axios.get("/api/listing/getUserListing");
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};
