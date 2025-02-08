import React, { useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import useLoginStore from '@/store/loginStore';
import useUserStore from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { Loader2 } from "lucide-react"; // Import loading spinner

function Login() {
  const { 
    email, 
    setEmail, 
    password, 
    setPassword, 
    loginUser, 
    error, 
    loading 
  } = useLoginStore();

  const { isSignedIn } = useUserStore();
  const navigate = useNavigate();

  // Redirect if already signed in
  useEffect(() => {
    if (isSignedIn) {
      navigate('/blog/feed');
    }
  }, [isSignedIn, navigate]);

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await loginUser();
      // Navigation will happen automatically through the useEffect when isSignedIn changes
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md relative z-10">
        <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular mb-8">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Login
          </span>
        </h1>

        {/* Error Message */}
        {error && (
          <div className="mb-4 p-3 bg-red-100 border border-red-400 text-red-700 rounded">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Email Input */}
          <div>
            <label 
              htmlFor="email" 
              className="block text-gray-700 dark:text-gray-300 mb-3 text-lg"
            >
              Email
            </label>
            <Input
              type="email"
              id="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Enter your email"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              disabled={loading}
              required
            />
          </div>

          {/* Password Input */}
          <div>
            <label 
              htmlFor="password" 
              className="block text-gray-700 dark:text-gray-300 mb-3 text-lg"
            >
              Password
            </label>
            <Input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="Enter your password"
              className="w-full p-4 bg-gray-100 dark:bg-gray-600 border border-gray-300 dark:border-gray-500 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 dark:focus:ring-blue-300 text-lg"
              disabled={loading}
              required
            />
          </div>

          {/* Submit Button */}
          <Button
            type="submit"
            className="w-full py-4 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 text-lg"
            disabled={loading}
          >
            {loading ? (
              <>
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                Logging in...
              </>
            ) : (
              'Login'
            )}
          </Button>

          {/* Registration Link */}
          <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            Don't have an account?{' '}
            <button
              type="button"
              onClick={() => navigate('/auth/register')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Register here
            </button>
          </p>
        </form>
        <p className="text-center mt-4 text-gray-600 dark:text-gray-400">
            😭 {' '}
            <button
              type="button"
              onClick={() => navigate('/auth/forgot-password')}
              className="text-blue-500 hover:text-blue-600 font-medium"
            >
              Forgot Password
            </button>
          </p>
      </div>
    </div>
  );
}

export default Login;