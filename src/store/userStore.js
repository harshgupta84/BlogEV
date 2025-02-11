import { create } from "zustand";
import { persist, createJSONStorage } from "zustand/middleware";

const useUserStore = create(
  persist(
    (set) => ({
      userEmail: "",
      user: null,
      token: "",
      isSignedIn: false,
      loading: false,

      setUserEmail: (userEmail) => set({ userEmail }),
      setLoading: (loading) => set({ loading }),
      setToken: (token) => set({ token }),
      setIsSignedIn: (isSignedIn) => set({ isSignedIn }),
      setUser: (user) => set({ user }),
      logout: () => set({ user: null, token: "", isSignedIn: false }), // Added logout
    }),
    {
      name: "user-storage", // Key for localStorage
      storage: createJSONStorage(() => localStorage), // Uses localStorage for persistence
    }
  )
);

export default useUserStore;
