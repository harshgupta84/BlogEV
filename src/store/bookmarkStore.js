// import { create } from "zustand";
// import { persist, createJSONStorage } from "zustand/middleware";

// const useBookmarkStore = create(
//   persist(
//     (set, get) => ({
//       bookmarks: [], // Array to store bookmarked blog IDs

//       // Add a bookmark
//       addBookmark: (id) => {
//         const { bookmarks } = get();
//         if (!bookmarks.includes(id)) {
//           set({ bookmarks: [...bookmarks, id] });
//         }
//       },

//       // Remove a bookmark
//       removeBookmark: (id) => {
//         const { bookmarks } = get();
//         set({ bookmarks: bookmarks.filter((bookmark) => bookmark !== id) });
//       },

//       // Check if a blog is bookmarked
//       isBookmarked: (id) => {
//         const { bookmarks } = get();
//         return bookmarks.includes(id);
//       },
//     }),
//     {
//       name: "bookmark-storage", // Key to store data in local storage
//       getStorage: () => localStorage, // Use local storage for persistence
//     }
//   )
// );

// export default useBookmarkStore;


import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";
import { fetchBookmarks, addBookmark, removeBookmark } from "@/services/bookmarkService";

const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [],

      // Fetch all bookmarks and update the state
      fetchBookmarks: async () => {
        const bookmarks = await fetchBookmarks();
        set({ bookmarks });
      },

      // Add a new bookmark and update the state
      addBookmark: async (blogId) => {
        const newBookmark = await addBookmark(blogId);
        if (newBookmark) {
          const { bookmarks } = get();
          set({ bookmarks: [...bookmarks, blogId] });
        }
      },

      // Remove a bookmark and update the state
      removeBookmark: async (blogId) => {
        const success = await removeBookmark(blogId);
        if (success) {
          const { bookmarks } = get();
          set({ bookmarks: bookmarks.filter((bookmark) => bookmark !== blogId) });
        }
      },

      // Check if a blog is bookmarked
      isBookmarked: (blogId) => {
        const { bookmarks } = get();
        return bookmarks.includes(blogId);
      },
    }),
    {
      name: "bookmark-storage",
      storage: createJSONStorage(() => localStorage),
    }
  )
);

export default useBookmarkStore;
