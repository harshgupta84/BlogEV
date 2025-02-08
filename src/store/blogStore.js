import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";
import { deleteBlog } from "@/services/blogService";

const useBlogStore = create((set) => ({
  myBlogs: [],
  suggestedBlogs: [],
  loading: false,
  error: null,
  currentBlog: null,
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setMyBlogs: (blogs) => set({ myBlogs: blogs }),
  setSuggestedBlogs: (blogs) => set({ suggestedBlogs: blogs }),

  fetchMyBlogs: async () => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      const response = await axios.get("http://localhost:3000/blog/myblogs", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      console.log(response.data);
      set({ myBlogs: response.data, loading: false });
    } catch (error) {
      set({ 
        error: error.response?.data?.message || "Failed to fetch user blogs.",
        loading: false 
      });
      console.error("Error fetching blogs:", error);
    }
  },

  publishBlog: async (id) => {
    try {
      const token = Cookies.get("token");
      if (!token) {
        throw new Error("No authentication token found");
      }

      await axios.post(`http://localhost:3000/blog/publish/${id}`, {}, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      set((state) => ({
        myBlogs: state.myBlogs.map((blog) =>
          blog.id === id ? { ...blog, publish: true } : blog
        ),
      }));
    } catch (error) {
      console.error("Error publishing blog:", error);
      set({ error: "Failed to publish blog." });
    }
  },

  fetchBlogById: async (id) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.get(`http://localhost:3000/blog/view/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);
      set({ currentBlog: response.data, loading: false });
    } catch (error) {
      set({ error: "Blog not found", loading: false });
      console.error("Error fetching blog by ID:", error);
    }
  },

  deleteBlog: async (id) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.delete(`http://localhost:3000/blog/delete/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set({ currentBlog: response.data, loading: false });
    } catch (error) {
      set({ error: "Blog not found", loading: false });
      console.error("Error fetching blog by ID:", error);
    }
  },

}));

export default useBlogStore;
