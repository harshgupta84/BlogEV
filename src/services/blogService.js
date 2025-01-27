import { v4 as uuidv4 } from "uuid";
import blogsData from "../data/blogs.json"; // Import the JSON file

let blogs = blogsData.blogs || [];


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


export const listBlogs = () => {
  return blogs;
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
