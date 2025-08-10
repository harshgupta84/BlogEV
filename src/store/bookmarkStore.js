import { create } from "zustand";
import { persist } from "zustand/middleware";
import axios from "axios";
import Cookies from "js-cookie";

const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [], // Array to store bookmarked blog objects
      loading: false,
      error: null,

      setLoading: (loading) => set({ loading }),
      setError: (error) => set({ error }),

      // Fetch user's bookmarks from backend
      fetchBookmarks: async () => {
        set({ loading: true, error: null });
        try {
          const token = Cookies.get("token");
          if (!token) throw new Error("No authentication token found");

          const response = await axios.get("http://localhost:3000/bookmark", {
            headers: { Authorization: `Bearer ${token}` },
          });
          
          set({ bookmarks: response.data || [], loading: false });
        } catch (error) {
          set({ 
            error: error.response?.data?.message || "Failed to fetch bookmarks",
            loading: false 
          });
          console.error("Error fetching bookmarks:", error);
        }
      },

      // Add a bookmark (API call)
      addBookmark: async (blogId) => {
        try {
          const token = Cookies.get("token");
          if (!token) throw new Error("No authentication token found");

          const response = await axios.post(
            "http://localhost:3000/bookmark",
            { blogId },
            {
              headers: { Authorization: `Bearer ${token}` },
            }
          );

          // Update local state
          const { bookmarks } = get();
          const blogData = response.data.blog || { id: blogId };
          if (!bookmarks.find(b => b.id === blogId)) {
            set({ bookmarks: [...bookmarks, blogData] });
          }
          return true;
        } catch (error) {
          set({ error: error.response?.data?.message || "Failed to add bookmark" });
          console.error("Error adding bookmark:", error);
          return false;
        }
      },

      // Remove a bookmark (API call)
      removeBookmark: async (blogId) => {
        try {
          const token = Cookies.get("token");
          if (!token) throw new Error("No authentication token found");

          await axios.delete("http://localhost:3000/bookmark", {
            headers: { Authorization: `Bearer ${token}` },
            data: { blogId },
          });

          // Update local state
          const { bookmarks } = get();
          set({ bookmarks: bookmarks.filter((bookmark) => bookmark.id !== blogId) });
          return true;
        } catch (error) {
          set({ error: error.response?.data?.message || "Failed to remove bookmark" });
          console.error("Error removing bookmark:", error);
          return false;
        }
      },

      // Toggle bookmark status
      toggleBookmark: async (blogId) => {
        const { isBookmarked } = get();
        if (isBookmarked(blogId)) {
          return await get().removeBookmark(blogId);
        } else {
          return await get().addBookmark(blogId);
        }
      },

      // Check if a blog is bookmarked
      isBookmarked: (id) => {
        const { bookmarks } = get();
        return bookmarks.some(bookmark => bookmark.id === id);
      },

      // Get bookmark count
      getBookmarkCount: () => {
        const { bookmarks } = get();
        return bookmarks.length;
      },
    }),
    {
      name: "bookmark-storage",
      getStorage: () => localStorage,
    }
  )
);

export default useBookmarkStore;
