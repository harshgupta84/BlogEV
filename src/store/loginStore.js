import { create } from 'zustand';
import axios from 'axios';
import Cookies from 'js-cookie';
import useUserStore from './userStore';

const useLoginStore = create((set, get) => ({
  email: '',
  password: '',
  token: Cookies.get('token') || null,
  error: null,
  loading: false,
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),

  reset: () => {
    Cookies.remove('token');
    set({ email: '', password: '', token: null, error: null });
    const { reset } = useUserStore.getState();
    reset();
  },

  loginUser: async () => {
    const { email, password } = get();
    const { setUserInfo } = useUserStore.getState();
    
    set({ loading: true, error: null });

    try {
      const response = await axios.post('http://localhost:3000/auth/login', {
        email,
        password,
      });

      const { token, user } = response.data;
      Cookies.set('token', token, { expires: 7, secure: true, sameSite: 'Strict' });
       console.log(user);
      set({ token, error: null, loading: false });
      setUserInfo(user);
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Login failed. Please try again.';
      set({ error: errorMessage, loading: false });
      console.error('Login failed:', errorMessage);
    }
  },

  logoutUser: () => {
    Cookies.remove('token');
    set({ email: '', password: '', token: null, error: null });
    const { reset } = useUserStore.getState();
    reset();
  },
}));

export default useLoginStore;