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
       
      set({ token, error: null, loading: false });
      console.log('Login successful:', user);
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

  changePassword: async (oldPassword, newPassword) => {
    const { token } = get();
    set({ loading: true, error: null });

    try {
      await axios.post(
        'http://localhost:3000/auth/change-password',
        { password:oldPassword, newPassword },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      set({ loading: false });
      console.log('Password changed successfully');
    } catch (error) {
      const errorMessage = error.response?.data?.message || 'Password change failed. Please try again.';
      set({ error: errorMessage, loading: false });
      console.error('Password change failed:', errorMessage);
    }
  },

  forgotPassword: async (email) => {
    set({ loading: true, error: null });
    try {
      const response = await axios.post('http://localhost:3000/auth/forgot-password', {email});
      if (response.status === 201) {
        
      } else {
        set({ error: 'Failed to send reset email. Please try again.' });
      }
    } catch (error) {
      set({ error: error.response?.data?.message || 'An error occurred. Please try again.' });
    } finally {
      set({ loading: false });
    }
  },

  verifyOtpForgot: async (email,otp) => {
    console.log(email,otp)
    try {
      const response = await axios.post('http://localhost:3000/auth/verify-email', {
        email,
        otp,
      });
      set({ userInfo: response.data, error: '' });
    } catch (error) {
      console.error('Verification failed:', error);
      set({ error: 'Verification failed. Please try again.' });
    }finally{
      
      set({otp:''})
    }
  },

  resetPassword: async () => {
    set({ loading: true, error: null });
    const { email, password } = get();
    console.log(email)
    try {
      const response = await axios.post('http://localhost:3000/auth/reset-password', {
        email,
        newPassword:password,
      });
      // Handle success response if needed
      set({ loading: false });
      return true;
    } catch (err) {
      set({ loading: false, error: err.response?.data?.message || 'An error occurred' });
      return false;
    }
  },

}));

export default useLoginStore;