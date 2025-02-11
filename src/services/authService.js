import axios from "axios";

const API_URL = 'http://localhost:3000'; 

const login = async (email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });
  
      if (!response.ok) throw new Error('Invalid login credentials');
      return response.json(); 
    } catch (error) {
      throw new Error(error.message || 'Login failed');
    }
  };
  
  const register = async (name, email, password) => {
    try {
      const response = await fetch(`${API_URL}/auth/signup`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });
  
      if (!response.ok) throw new Error('Registration failed');
      return response.json(); // { user: { id, email, name, pic }, token }
    } catch (error) {
      throw new Error(error.message || 'Registration failed');
    }
  };

  
const setTopic = async (email, topics) => {
  try {
    const response = await axios.post("http://localhost:3000/auth/set_topic", {
      email,
      topics,
    });

    return response.data; 
  } catch (error) {
    console.error("Error setting topics:", error.response?.data || error.message);
    throw error;
  }
};

  

export default {
    login,
    register,
    setTopic,
};