// import { create } from 'zustand';

// const useUserStore = create((set) => ({
//   user: null,
//   token: null,
//   isSignedIn: false,
  
//   setUserInfo: (user, token) => {
//     set({ user, token, isSignedIn: true });
//     localStorage.setItem('token', token);  // Save token for persistence
//   },

//   loadUserFromStorage: () => {
//     const token = localStorage.getItem('token');
//     if (token) {
//       set({ token, isSignedIn: true });
//     }
//   },

//   logout: () => {
//     set({ user: null, token: null, isSignedIn: false });
//     localStorage.removeItem('token');
//   },
// }));

// export default useUserStore;


import { create } from 'zustand';

const useUserStore = create((set) => ({
  user: null,
  token: null,
  isSignedIn: false,

  setUserInfo: (user, token) => {
    set({ user, token, isSignedIn: true });
    localStorage.setItem('token', token); // Save token for persistence
  },

  resetUserInfo: () => {
    set({ user: null, token: null, isSignedIn: false });
    localStorage.removeItem('token'); // Clear token on logout or reset
  },

  initializeState: () => {
    const token = localStorage.getItem('token');
    if (token) {
      // Optionally, verify the token with the server to ensure it's valid
      set({ token, isSignedIn: true });
    }
  },
}));

export default useUserStore;
