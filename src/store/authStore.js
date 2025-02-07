import {create} from 'zustand';
import axios from 'axios';


const useAuthStore = create((set, get) => ({
  email: '',
  password: '',
  confirmPassword: '',
  name: '',
  image: 'https://t3.ftcdn.net/jpg/09/64/89/20/240_F_964892089_vioRltmAxaoQEBLtYtChVBxIzDWwhA3T.jpg',
  selectedTopics: [],
  error: '',
  loading: false,
  userInfo: null,
  selectedTopics: [],
  otp:'',
  addTopic: (topic) => set((state) => ({
    selectedTopics: [...state.selectedTopics, topic],
  })),
  removeTopic: (topic) => set((state) => ({
    selectedTopics: state.selectedTopics.filter((t) => t !== topic),
  })),
  setEmail: (email) => set({ email }),
  setPassword: (password) => set({ password }),
  setConfirmPassword: (confirmPassword) => set({ confirmPassword }),
  setName: (name) => set({ name }),
  setImage: (image) => set({ image }),
  setError: (error) => set({ error }),
  setLoading: (loading) => set({ loading }),
  setUserInfo: (userInfo) => set({ userInfo }),
  setOtp: (otp) => set({ otp }),
  reset: () => set({
    email: '',
    password: '',
    confirmPassword: '',
    name: '',
    image: 'https://t3.ftcdn.net/jpg/09/64/89/20/240_F_964892089_vioRltmAxaoQEBLtYtChVBxIzDWwhA3T.jpg',
    selectedTopics: [],
    error: '',
    loading: false,
    userInfo: null,
  }),


  registerUser: async () => {
    const { email, password, name, image,selectedTopics } = get();
    
    try {
      const response = await axios.post('http://localhost:3000/auth/register', {
        email,
        password,
        name,
        pic:image,
        interestedTopics:selectedTopics
      });
      set({  error: response.data.error });
    } catch (error) {
      console.error('Registration failed:', error);
      set({ error: 'Registration failed. Please try again.' });
    } 
  },

  verifyOtp: async () => {
    const { email, otp } = get();
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
      get().reset();
      set({otp:''})
    }
  },
}));

export default useAuthStore;