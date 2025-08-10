import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Alert, AlertDescription } from '@/components/ui/alert';
import useLoginStore from '@/store/loginStore';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';
import { Mail, ArrowLeft, Loader2, CheckCircle, AlertCircle, KeyRound, ArrowRight } from 'lucide-react';

function ForgotPass() {
  const { forgotPassword, error, loading, email, setEmail } = useLoginStore();
  const navigate = useNavigate();
  const [isEmailValid, setIsEmailValid] = useState(false);
  const [focusedField, setFocusedField] = useState(null);

  React.useEffect(() => {
    const emailValid = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    setIsEmailValid(emailValid);
  }, [email]);
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!isEmailValid) {
      return;
    }
    
    const result = await forgotPassword(email);
    if (result) {
      navigate("/auth/verify-email-forgot");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4">
      <DotPattern className={cn(
        "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
      )} />
      
      <div className="relative z-10 w-full max-w-md">
        {/* Header */}
        <div className="text-center mb-8">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
            <KeyRound className="w-8 h-8 text-white" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-2">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Forgot Password?
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            No worries! Enter your email and we'll send you reset instructions.
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Input */}
            <div className="space-y-2">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Email Address
              </label>
              <div className="relative">
                <Mail className={cn(
                  "absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 transition-colors duration-200",
                  focusedField === 'email' ? "text-blue-500" : "text-gray-400"
                )} />
                <Input
                  id="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  onFocus={() => setFocusedField('email')}
                  onBlur={() => setFocusedField(null)}
                  placeholder="Enter your email address"
                  className={cn(
                    "w-full pl-10 pr-10 py-3 border rounded-lg transition-all duration-200 bg-gray-50 dark:bg-gray-700/50",
                    focusedField === 'email' ? "border-blue-500 ring-2 ring-blue-500/20" : "border-gray-300 dark:border-gray-600",
                    email && !isEmailValid ? "border-red-500" : ""
                  )}
                  disabled={loading}
                  required
                />
                {email && (
                  <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    {isEmailValid ? (
                      <CheckCircle className="w-5 h-5 text-green-500" />
                    ) : (
                      <AlertCircle className="w-5 h-5 text-red-500" />
                    )}
                  </div>
                )}
              </div>
              {email && !isEmailValid && (
                <p className="text-red-500 text-sm">Please enter a valid email address</p>
              )}
            </div>

            {/* Error Message */}
            {error && (
              <Alert className="border-red-200 bg-red-50 dark:bg-red-900/20">
                <AlertCircle className="h-4 w-4 text-red-600" />
                <AlertDescription className="text-red-600 dark:text-red-400">
                  {error}
                </AlertDescription>
              </Alert>
            )}

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || !isEmailValid}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
                isEmailValid 
                  ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Sending Reset Code...
                </>
              ) : (
                <>
                  Send Reset Code
                  <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </Button>

            {/* Back to Login */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => navigate('/auth/login')}
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Login
              </button>
            </div>
          </form>
        </div>

        {/* Help Text */}
        <div className="mt-6 text-center">
          <p className="text-sm text-gray-500">
            Remember your password?{' '}
            <button
              onClick={() => navigate('/auth/login')}
              className="text-blue-500 hover:text-blue-600 font-medium transition-colors"
            >
              Sign in here
            </button>
          </p>
        </div>
      </div>
    </div>
  );
}

export default ForgotPass;
