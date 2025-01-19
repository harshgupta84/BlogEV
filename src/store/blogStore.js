import { create } from "zustand";
import { v4 as uuidv4 } from "uuid";

// Import the blogs.json file
import blogsData from "../data/blogs.json"; // Make sure the path is correct

// Define the store
const useBlogStore = create((set) => ({
  blogs: blogsData.blogs, // Initialize with the blogs from JSON file
  addBlog: (title, content, author, category, pic) => {
    set((state) => ({
      blogs: [
        ...state.blogs,
        {
          id: uuidv4(), // Generate a unique ID for the new blog
          title,
          content,
          createdAt: new Date().toISOString(), // Current date and time
          author,
          category,
          pic,
        },
      ],
    }));
  },
}));

export default useBlogStore;
