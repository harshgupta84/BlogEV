import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useBookmarkStore = create(
  persist(
    (set, get) => ({
      bookmarks: [], // Array to store bookmarked blog IDs

      // Add a bookmark
      addBookmark: (id) => {
        const { bookmarks } = get();
        if (!bookmarks.includes(id)) {
          set({ bookmarks: [...bookmarks, id] });
        }
      },

      // Remove a bookmark
      removeBookmark: (id) => {
        const { bookmarks } = get();
        set({ bookmarks: bookmarks.filter((bookmark) => bookmark !== id) });
      },

      // Check if a blog is bookmarked
      isBookmarked: (id) => {
        const { bookmarks } = get();
        return bookmarks.includes(id);
      },
    }),
    {
      name: "bookmark-storage", // Key to store data in local storage
      getStorage: () => localStorage, // Use local storage for persistence
    }
  )
);

export default useBookmarkStore;
