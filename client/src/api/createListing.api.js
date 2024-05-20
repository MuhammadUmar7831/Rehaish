import axios from "axios";

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
