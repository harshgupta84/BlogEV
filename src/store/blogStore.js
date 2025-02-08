import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const useBlogStore = create((set) => ({
  myBlogs: [],
  suggestedBlogs: [],
  loading: false,
  error: null,

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
      const errorMessage = error.response?.data?.message || "Failed to fetch user blogs.";
      set({ error: errorMessage, loading: false });
      console.error("Error fetching blogs:", errorMessage);
    }
  },
}));

export default useBlogStore;