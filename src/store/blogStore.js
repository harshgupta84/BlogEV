import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import {
  addBlog ,
  deleteBlog,
  updateBlog,
  getBlogById,
  listBlogs,
} from "@/services/blogService";

const useBlogStore = create(
  persist(
    (set) => ({
      myblogs: [], // User-specific blogs
      myfeed: [], // General blog feed

      // Add a new blog
      addBlog: async (title, content, category) => {
        console.log(title, content, category);
        try {
          const newBlog = await addBlog(title, content, category);
          if (newBlog) {
            set((state) => ({
              myblogs: [...state.myblogs, newBlog],
            }));
          }
        } catch (error) {
          console.error("Error adding blog:", error);
        }
      },

      // Fetch blogs created by the logged-in user
      getUserBlogs: async () => {
        try {
          const userBlogs = await listBlogs();
          if (userBlogs) {
            set({ myblogs: userBlogs });
          }
        } catch (error) {
          console.error("Error fetching user blogs:", error);
        }
      },

      // Delete a blog
      deleteBlog: async (id) => {
        try {
          await deleteBlog(id);
          set((state) => ({
            myblogs: state.myblogs.filter((blog) => String(blog.id) !== String(id)),
          }));
        } catch (error) {
          console.error("Error deleting blog:", error);
        }
      },

      // Update a blog
      updateBlog: async (id, updatedData) => {
        try {
          const updatedBlog = await updateBlog(id, updatedData);
          if (updatedBlog) {
            set((state) => ({
              myblogs: state.myblogs.map((blog) =>
                String(blog.id) === String(id) ? updatedBlog : blog
              ),
            }));
          }
        } catch (error) {
          console.error("Error updating blog:", error);
        }
      },

      // Get a blog by ID
      getBlogById: async(id) => {
        const data= await getBlogById(id);
        console.log(data);
      },

      // List all blogs for feed
      listBlogs: async () => {
        try {
          const blogs = await listBlogs();
          if (blogs) {
            set({ myfeed: blogs });
          }
        } catch (error) {
          console.error("Error fetching blogs:", error);
        }
      },
    }),
    {
      name: "blogs-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBlogStore;
