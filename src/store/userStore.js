import { create } from 'zustand';
import { persist } from 'zustand/middleware';

const useUserStore = create(
  persist(
    (set) => ({
      isSignedIn: false,
      userId: '',
      email: '',
      name: '',
      pic: '',
      interestedTopics: [],

      setUserInfo: (user) =>
        set({
          isSignedIn: true,
          userId: user.id,
          email: user.email,
          name: user.name,
          pic: user.pic,
        }),

      reset: () =>
        set({
          isSignedIn: false,
          userId: '',
          email: '',
          name: '',
          pic: '',
          interestedTopics: [],
        }),
    }),
    {
      name: 'user-store', // Key in localStorage
      getStorage: () => localStorage, // Use localStorage to persist
    }
  )
);

export default useUserStore;
