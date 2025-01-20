import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import blogsData from "../data/blogs.json"; // Ensure this points to your blogs.json file

const useBlogStore = create(
  persist(
    (set, get) => ({
      blogs: [], // Initialize state with blogs from blogs.json
      addBlog: (title, content, author, category, pic) => {
        const newBlog = {
          id: uuidv4(), // Generate unique ID for new blog
          title,
          content,
          createdAt: new Date().toISOString(),
          author,
          category,
          pic,
          likes: 0,
        };

        set((state) => ({
          blogs: [...state.blogs, newBlog],
        }));
      },
      deleteBlog: (id) => {
        set((state) => ({
          blogs: state.blogs.filter((blog) => String(blog.id) !== String(id)),
        }));
      },
      getBlogById: (id) => {
        // Fetch blog from the current state
        return get().blogs.find((blog) => String(blog.id) === String(id));
      },
      listBlogs: () => {
        return get().blogs;
      },
    }),
    {
      name: "blogs-storage", // Name for localStorage
      storage: createJSONStorage(() => localStorage), // Persist state in localStorage
    }
  )
);

export default useBlogStore;
