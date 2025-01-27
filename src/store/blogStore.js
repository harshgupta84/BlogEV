import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  addBlog,
  deleteBlog,
  updateBlog,
  getBlogById,
  listBlogs,
} from "@/services/blogService";

const useBlogStore = create(
  persist(
    (set) => ({
      // Initialize the blogs state from the service
      blogs: listBlogs(),

      // Add a blog
      addBlog: (title, content, author, category, pic) => {
        const newBlog = addBlog(title, content, author, category, pic);
        set((state) => ({
          blogs: [...state.blogs, newBlog],
        }));
      },

      // Delete a blog
      deleteBlog: (id) => {
        deleteBlog(id);
        set((state) => ({
          blogs: state.blogs.filter((blog) => String(blog.id) !== String(id)),
        }));
      },

      // Update a blog
      updateBlog: (id, updatedData) => {
        const updatedBlog = updateBlog(id, updatedData);
        set((state) => ({
          blogs: state.blogs.map((blog) =>
            String(blog.id) === String(id) ? updatedBlog : blog
          ),
        }));
      },

      // Get a blog by ID
      getBlogById: (id) => {
        return getBlogById(id);
      },

      // List all blogs
      listBlogs: () => {
        return listBlogs();
      },
    }),
    {
      name: "blogs-storage", // Use localStorage for persistence
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBlogStore;
