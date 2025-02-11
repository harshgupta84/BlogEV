import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { useNavigate } from 'react-router-dom';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import authService from '@/services/authService';
import useUserStore from '@/store/userStore';

function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  
  const {loading,setLoading,setIsSignedIn,setToken,setUser}=useUserStore();
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await authService.login(email, password);
      setToken(data.access_token); // Store token
      setUser(data.user); // Store user data
      setIsSignedIn(true);  // Store user data and token
      navigate('/blog/myfeed');
    } catch (error) {
      setError('Login failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-20">
        <DotPattern className={cn("inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]")} />
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular">
            <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
              Login
            </span>
          </h1>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md mt-4"></div>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen">
      <DotPattern className={cn("inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]")} />
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular mb-8">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Login
          </span>
        </h1>
        {error && <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">{error}</div>}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">Email</label>
            <Input type="email" id="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="Enter your email" className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg" required />
          </div>
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">Password</label>
            <Input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Enter your password" className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg" required />
          </div>
          <Button type="submit" className="w-full py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg">
            Login
          </Button>
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button type="button" onClick={() => navigate('/auth/register')} className="text-blue-500 hover:text-blue-600 font-medium">
              Register here
            </button>
          </p>
        </form>
      </div>
    </div>
  );
}

export default Login;
