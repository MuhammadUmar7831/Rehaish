import axios from "axios";

export const signUpApi = async (formData) => {
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

export const signInApi = async (formData) => {
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

export const signWithGoogleOAuth = async (formData) => {
  try {
    const response = await axios.post("/api/auth/googleOAuth", formData);
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};

export const signOutApi = async () => {
  try {
    const response = await axios.delete("/api/auth/signout");
    return response.data;
  } catch (error) {
    if (error.response.data === "") {
      return { success: false, message: "server is down" };
    } else {
      return error.response.data;
    }
  }
};
