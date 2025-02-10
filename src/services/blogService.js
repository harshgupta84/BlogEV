import { v4 as uuidv4 } from "uuid";
import blogsData from "../data/blogs.json"; // Import the JSON file

import useUserStore from "@/store/userStore";

let blogs =  [];
const API_URL = 'http://localhost:3000/blog'; 

export const addBlog = (title, content, author, category, pic) => {
  const newBlog = {
    id: uuidv4(),
    title,
    content,
    createdAt: new Date().toISOString(),
    author,
    category,
    pic,
    likes: 0,
  };

  blogs.push(newBlog);
  return newBlog;
};


export const getBlogById = (id) => {
  return blogs.find((blog) => String(blog.id) === String(id));
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
