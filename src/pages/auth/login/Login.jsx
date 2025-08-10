import React, { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useLoginStore from '@/store/loginStore';
import useUserStore from '@/store/userStore';
import { useNavigate } from 'react-router-dom';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { Loader2, Mail, Lock, Eye, EyeOff, AlertCircle, CheckCircle, ArrowRight, Sparkles } from "lucide-react";

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
  const [showPassword, setShowPassword] = useState(false);
  const [isFormValid, setIsFormValid] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  useEffect(() => {
    if (isSignedIn) {
      navigate('/blog/feed');
    }
  }, [isSignedIn, navigate]);

  useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    const passwordValid = password.length >= 6;
    setIsFormValid(emailValid && passwordValid);
  }, [email, password]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isFormValid) return;
    
    try {
      await loginUser();
    } catch (error) {
      console.error('Login error:', error);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <Sparkles className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Welcome Back
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Sign in to continue your blogging journey
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          {/* Error Message */}
          {error && (
            <Alert className="mb-6 border-red-200 bg-red-50 dark:bg-red-900/20">
              <AlertCircle className="h-4 w-4 text-red-600" />
              <AlertDescription className="text-red-600 dark:text-red-400">
                {error}
              </AlertDescription>
            </Alert>
          )}

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label 
                htmlFor="email" 
                className="block text-sm font-medium text-gray-700 dark:text-gray-300"
              >
                Email Address
              </label>
              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                  focusedField === 'email' ? "text-blue-500" : "text-gray-400"
                )} />
                <Input
                  type="email"
                  id="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email"
                  className={cn(
                    "w-full pl-10 pr-4 py-3 border rounded-lg transition-all duration-200 bg-gray-50 dark:bg-gray-700/50",
                    focusedField === 'email' ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-300 dark:border-gray-600",
                    email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) ? "border-red-500" : ""
                  )}
                  disabled={loading}
                  required
                />
                {email && /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email) && (
                  <CheckCircle className="absolute right-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-green-500" />
                )}
              </div>
            </div>

            {/* Password Input */}
            <div className="space-y-2">
              <div className="flex justify-between items-center">
                <label 
                  htmlFor="password" 
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Password
                </label>
                <button
                  type="button"
                  onClick={() => navigate('/auth/forgot-password')}
                  className="text-sm text-blue-500 hover:text-blue-600 transition-colors"
                >
                  Forgot password?
                </button>
              </div>
              <div className="relative">
                <Lock className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                  focusedField === 'password' ? "text-blue-500" : "text-gray-400"
                )} />
                <Input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  onFocus={() => setFocusedField('password')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your password"
                  className={cn(
                    "w-full pl-10 pr-12 py-3 border rounded-lg transition-all duration-200 bg-gray-50 dark:bg-gray-700/50",
                    focusedField === 'password' ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-300 dark:border-gray-600"
                  )}
                  disabled={loading}
                  required
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600 transition-colors"
                >
                  {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !isFormValid}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5",
                isFormValid 
                  ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Signing in...
                </>
              ) : (
                <>
                  Sign in
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

          </form>

          {/* Footer */}
          <div className="mt-6 pt-6 border-t border-gray-200 dark:border-gray-700">
            <p className="text-center text-gray-600 dark:text-gray-400">
              Don't have an account?{' '}
              <button
                type="button"
                onClick={() => navigate('/auth/register')}
                className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
              >
                Create one here
              </button>
            </p>
          </div>
        </div>
        
        {/* Features */}
        <div className="mt-8 text-center">
          <p className="text-sm text-gray-500 mb-4">Join thousands of bloggers worldwide</p>
          <div className="flex justify-center space-x-6 text-xs text-gray-400">
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Free to use</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Rich editor</span>
            </div>
            <div className="flex items-center space-x-1">
              <CheckCircle className="w-4 h-4" />
              <span>Community driven</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Login;