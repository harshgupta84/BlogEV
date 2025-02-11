import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useUserStore from '@/store/userStore';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import authService from '@/services/authService';



function Register() {
  const navigate = useNavigate();

  // State variables
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [name, setName] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
   const { setUserEmail} = useUserStore();  
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    setUserEmail(email);
    setLoading(true);
    setError(null);
  
    try {
      const data = await authService.register(name, email, password);
      navigate('/auth/interests');
    } catch (error) {
      setError('Registration failed. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-20">
        <DotPattern
          className={cn(
            "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
          )}
        />
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular">
            <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
              Register Info
            </span>
          </h1>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md mt-4"></div>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
          <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
        <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular mb-9">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Register Info
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label htmlFor="email" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label htmlFor="password" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              required
            />
          </div>

          {/* Confirm Password Input */}
          <div>
            <label htmlFor="confirm-password" className="block text-gray-700 dark:text-gray-300 mb-3 text-lg">
              Confirm Password
            </label>
            <Input
              type="password"
              id="confirm-password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm your password"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              required
            />
          </div>

          {/* Error Message */}
          {error && <p className="text-red-500 text-sm">{error}</p>}

          {/* Name Input */}
          <div>
            <label htmlFor="name" className="block text-gray-800 dark:text-white font-semibold mb-2">
              Name
            </label>
            <Input
              id="name"
              type="text"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Enter your name"
              className="w-full p-3 bg-gray-100 dark:bg-gray-700 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300"
            />
          </div>

          {/* Submit Button */}
          <div>
            <Button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            >
              Register
            </Button>
          </div>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
          Have an account?{' '}
          <button
            type="button"
            onClick={() => navigate('/auth/login')}
            className="text-blue-500 hover:text-blue-600 font-medium"
          >
            Login here
          </button>
        </p>
      </div>
    </div>
  );
}

export default Register;
