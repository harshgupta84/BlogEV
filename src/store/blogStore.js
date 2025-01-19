import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { v4 as uuidv4 } from "uuid";
import { list } from "postcss";

const useBlogStore = create(
  persist(
    (set, get) => ({
      blogs: [], // Default state for blogs
      addBlog: (title, content, author, category, pic) => {
        const newBlog = {
          id: uuidv4(),
          title,
          content,
          createdAt: new Date().toISOString(),
          author,
          category,
          pic,
          likes,
        };

        set((state) => ({
          blogs: [...state.blogs, newBlog],
        }));
      },
      deleteBlog: (id) => {
        set((state) => ({
          blogs: state.blogs.filter((blog) => blog.id !== id),
        }));
      },
      listBlogs: () => {
        return get().blogs;
      },
    }),
    {
      name: "blogs-storage", 
      storage: createJSONStorage(() => localStorage), 
    }
  )
);

export default useBlogStore;
