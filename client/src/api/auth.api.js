import axios from "axios";

const signUpApi = async (formData) => {
  try {
    const response = await axios.post("/api/auth/signup", formData);
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};

const signInApi = async (formData) => {
  try {
    const response = await axios.post("/api/auth/signin", formData);
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};

export { signUpApi, signInApi };
