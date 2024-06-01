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

export const createListingApi = async (formaData) => {
  try {
    const response = await axios.post("/api/listing/create", formaData);
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};

export const editListingApi = async (formaData) => {
  try {
    const response = await axios.put("/api/listing/edit", formaData);
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};

export const getListinByListingId = async (listingId) => {
  try {
    const response = await axios.get(`/api/listing/get/${listingId}`);
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};
