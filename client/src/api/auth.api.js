import axios from 'axios';

const signUpApi = async (formData) => {
  try {
    const response = await axios.post('/api/auth/signup', formData);
    return response;
  } catch (error) {
    console.error('Error signing up:', error);
    return error.response;
  }
};

export {signUpApi}