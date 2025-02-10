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
      myblogs: [],  // User-specific blogs
      myfeed: [],   // General blog feed

      // Add a new blog
      addBlog: async (title, content, author, category, pic) => {
        const newBlog = await addBlog(title, content, author, category, pic);
        set((state) => ({
          myblogs: [...state.myblogs, newBlog], // Update user blogs
        }));
      },

      // Fetch blogs created by the logged-in user
      getUserBlogs: async () => {
        const userBlogs = await listBlogs();
        set({ myblogs: userBlogs });
      },

      // Delete a blog
      deleteBlog: async (id) => {
        await deleteBlog(id);
        set((state) => ({
          myblogs: state.myblogs.filter((blog) => String(blog.id) !== String(id)),
        }));
      },

      // Update a blog
      updateBlog: async (id, updatedData) => {
        const updatedBlog = await updateBlog(id, updatedData);
        set((state) => ({
          myblogs: state.myblogs.map((blog) =>
            String(blog.id) === String(id) ? updatedBlog : blog
          ),
        }));
      },

      // Get a blog by ID
      getBlogById: (id) => {
        return getBlogById(id);
      },

      // List all blogs for feed
      listBlogs: async () => {
        const blogs = await listBlogs();
        set({ myfeed: blogs });
      },
    }),
    {
      name: "blogs-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBlogStore;
