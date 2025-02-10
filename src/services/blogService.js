import { v4 as uuidv4 } from "uuid";
import blogsData from "../data/blogs.json"; // Import the JSON file

import useUserStore from "@/store/userStore";
import axios from "axios";

const API_URL = 'http://localhost:3000/blog'; 

export const addBlog = async (title, content, category) => {
  const { token } = useUserStore.getState();
  console.log(title, content, category, token);

  if (!token) {
    console.error("No token found. User not authenticated.");
    return null;
  }

  try {
    const response = await fetch("http://localhost:3000/blog/post", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${token}`,
        "Content-Type": "application/json", // Required for JSON payloads
      },
      body: JSON.stringify({ title, content, topics: category }), // Stringify body
    });

    if (!response.ok) {
      throw new Error("Failed to add blog");
    }

    const data = await response.json();
    return data; // Assuming the response contains the added blog
  } catch (error) {
    console.error("Error adding blog:", error);
    return null;
  }
};



export const getBlogById = async (id) => {
  const { token } = useUserStore.getState();

  try {
    const response = await axios.get(`http://localhost:3000/blog/view/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "application/json",
      },
    });

    console.log(response.data);
    return response.data; // Return the fetched blog
  } catch (error) {
    console.error("Error fetching blog by ID:", error.response?.data || error.message);
    return null;
  }
};




export const listBlogs = async() => {
  const {token} = useUserStore.getState()
 
  if (!token) {
    console.error("No token found. User not authenticated.");
    return null;
  }

  try {
    const response = await fetch("http://localhost:3000/blog/myblogs", {
      method: "GET",
      headers: {
        "Authorization": `Bearer ${token}`
      },
    });

    if (!response.ok) {
      throw new Error("Failed to fetch user blogs");
    }

   
    const data = await response.json();

    return data// Assuming the response contains an array of blogs
  } catch (error) {
    console.error("Error fetching user blogs:", error);
    return null;
  }
  
};


export const updateBlog = (id, updatedData) => {
  const blogIndex = blogs.findIndex((blog) => String(blog.id) === String(id));
  if (blogIndex !== -1) {
    blogs[blogIndex] = { ...blogs[blogIndex], ...updatedData };
    return blogs[blogIndex];
  }
  return null;
};


export const deleteBlog = (id) => {
  const blogIndex = blogs.findIndex((blog) => String(blog.id) === String(id));
  if (blogIndex !== -1) {
    const deletedBlog = blogs.splice(blogIndex, 1);
    return deletedBlog[0];
  }
  return null;
};
