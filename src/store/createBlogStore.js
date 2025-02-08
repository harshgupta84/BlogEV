import { create } from "zustand";
import axios from "axios";
import Cookies from "js-cookie";

const initialState = {
  myBlogs: [],
  title: "",
  content: "",
  topics: [],
  loading: false,
  error: null,
  currentBlog: null,
};

const useCreateBlogStore = create((set) => ({
  ...initialState,

  // Setter functions for all state properties
  setTitle: (title) => set((state) => ({ ...state, title })),
  setContent: (content) => set((state) => ({ ...state, content })),
  setTopics: (topics) => set((state) => ({ ...state, topics })),
  setLoading: (loading) => set((state) => ({ ...state, loading })),
  setError: (error) => set((state) => ({ ...state, error })),
  setCurrentBlog: (currentBlog) => set((state) => ({ ...state, currentBlog })),
  setMyBlogs: (myBlogs) => set((state) => ({ ...state, myBlogs })),

  // Reset function to clear form data
  resetForm: () => 
    set((state) => ({
      ...state,
      title: initialState.title,
      content: initialState.content,
      topics: initialState.topics,
      error: initialState.error,
      currentBlog: initialState.currentBlog,
    })),

  createBlog: async (blogData) => {
    set({ loading: true, error: null });

    try {
      const token = Cookies.get("token");
      if (!token) throw new Error("No authentication token found");

      const response = await axios.post("http://localhost:3000/blog/post", blogData, {
        headers: { Authorization: `Bearer ${token}` },
      });

      set((state) => ({
        myBlogs: [...state.myBlogs, response.data],
        loading: false,
      }));

      // Reset the form after successful creation
      useCreateBlogStore.getState().resetForm();
      
      return response.data; // Return the created blog data
    } catch (error) {
      set({ 
        error: error.message || "Failed to create blog", 
        loading: false 
      });
      console.error("Error creating blog:", error);
      throw error; // Re-throw the error for handling in the component
    }
  },
}));

export default useCreateBlogStore;