import axios from "axios";

export const getUserApi = async () => {
  try {
    const response = await axios.get("/api/user/getUser");
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};

export const updateUserApi = async (formData) => {
  try {
    const response = await axios.post("/api/user/updateUser", formData);
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};