import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const useLikeStore = create((set, get) => ({
  likes: {}, // Object to store likes by blogId
  loading: false,
  error: null,

  setLoading: (loading) => set({ loading }),
  setError: (error) => set({ error }),

  // Like a blog
  likeBlog: async (blogId) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post(
        `http://localhost:3000/likes/${blogId}`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      // Update local state
      const { likes } = get();
      set({
        likes: {
          ...likes,
          [blogId]: {
            isLiked: true,
            count: response.data.likeCount || (likes[blogId]?.count || 0) + 1,
          },
        },
      });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to like blog" });
      console.error("Error liking blog:", error);
      return false;
    }
  },

  // Unlike a blog
  unlikeBlog: async (blogId) => {
    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.delete(`http://localhost:3000/likes/${blogId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Update local state
      const { likes } = get();
      set({
        likes: {
          ...likes,
          [blogId]: {
            isLiked: false,
            count: response.data.likeCount || Math.max((likes[blogId]?.count || 1) - 1, 0),
          },
        },
      });
      return true;
    } catch (error) {
      set({ error: error.response?.data?.message || "Failed to unlike blog" });
      console.error("Error unliking blog:", error);
      return false;
    }
  },

  // Toggle like status
  toggleLike: async (blogId) => {
    const { isLiked } = get();
    if (isLiked(blogId)) {
      return await get().unlikeBlog(blogId);
    } else {
      return await get().likeBlog(blogId);
    }
  },

  // Check if a blog is liked
  isLiked: (blogId) => {
    const { likes } = get();
    return likes[blogId]?.isLiked || false;
  },

  // Get like count for a blog
  getLikeCount: (blogId) => {
    const { likes } = get();
    return likes[blogId]?.count || 0;
  },

  // Set initial like state for a blog (from API response)
  setLikeState: (blogId, isLiked, count) => {
    const { likes } = get();
    set({
      likes: {
        ...likes,
        [blogId]: { isLiked, count },
      },
    });
  },
}));

export default useLikeStore;
