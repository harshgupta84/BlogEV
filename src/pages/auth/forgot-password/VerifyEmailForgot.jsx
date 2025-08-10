"use client";

import React, { useState, useEffect } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { useNavigate } from "react-router-dom";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import useLoginStore from "@/store/loginStore";
import { Mail, CheckCircle, AlertCircle, Loader2, RefreshCw, ArrowLeft, KeyRound } from "lucide-react";

export function VerifyEmailForgot() {
  const [value, setValue] = useState("");
  const [timeLeft, setTimeLeft] = useState(300); // 5 minutes
  const [canResend, setCanResend] = useState(false);
  const [isResending, setIsResending] = useState(false);
  const { verifyOtpForgot, forgotPassword, loading, email, error, setError } = useLoginStore();

  const navigate = useNavigate();

  useEffect(() => {
    if (timeLeft > 0) {
      const timer = setTimeout(() => setTimeLeft(timeLeft - 1), 1000);
      return () => clearTimeout(timer);
    } else {
      setCanResend(true);
    }
  }, [timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  const handleResendOTP = async () => {
    setIsResending(true);
    setError('');
    try {
      await forgotPassword(email);
      setTimeLeft(300);
      setCanResend(false);
    } catch (error) {
      setError('Failed to resend OTP. Please try again.');
    } finally {
      setIsResending(false);
    }
  };
  // Dummy handler function for OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (value.length !== 6) {
      setError('Please enter a complete 6-digit code');
      return;
    }
   
    const result = await verifyOtpForgot(email, value);
    if (result) {
      navigate('/auth/reset-password');
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center py-12 px-4">
        <DotPattern className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )} />
        <div className="relative z-10 w-full max-w-md">
          <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
            <div className="text-center">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4">
                <Loader2 className="w-8 h-8 text-white animate-spin" />
              </div>
              <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                Verifying Reset Code
              </h2>
              <p className="text-gray-600 dark:text-gray-400 mb-6">
                Please wait while we verify your reset code...
              </p>
              <div className="space-y-3">
                <div className="flex items-center space-x-3">
                  <CheckCircle className="w-5 h-5 text-green-500" />
                  <span className="text-sm text-gray-600">Code received</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Loader2 className="w-5 h-5 text-blue-500 animate-spin" />
                  <span className="text-sm text-gray-600">Verifying code</span>
                </div>
                <div className="flex items-center space-x-3 opacity-50">
                  <div className="w-5 h-5 rounded-full border-2 border-gray-300"></div>
                  <span className="text-sm text-gray-400">Preparing reset</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    )
  }

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
              Enter Reset Code
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 mb-2">
            We've sent a 6-digit reset code to
          </p>
          <p className="font-semibold text-gray-800 dark:text-gray-200">
            {email || 'your email address'}
          </p>
        </div>

        {/* Form Container */}
        <div className="bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm rounded-xl shadow-2xl border border-gray-200 dark:border-gray-700 p-8">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* OTP Input */}
            <div className="text-center">
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-4">
                Enter Reset Code
              </label>
              <InputOTP
                maxLength={6}
                value={value}
                onChange={(value) => {
                  setValue(value);
                  setError('');
                }}
                className="justify-center"
              >
                <InputOTPGroup className="gap-3">
                  {[0, 1, 2, 3, 4, 5].map((index) => (
                    <InputOTPSlot
                      key={index}
                      index={index}
                      className={cn(
                        "w-12 h-12 text-xl text-center border-2 rounded-lg transition-all duration-200 font-mono font-bold",
                        value.length > index 
                          ? "border-blue-500 bg-blue-50 dark:bg-blue-900/20" 
                          : "border-gray-300 dark:border-gray-600",
                        "focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                      )}
                    />
                  ))}
                </InputOTPGroup>
              </InputOTP>
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

            {/* Timer and Resend */}
            <div className="text-center space-y-3">
              {!canResend ? (
                <p className="text-sm text-gray-600 dark:text-gray-400">
                  Code expires in <span className="font-mono font-semibold text-blue-600">{formatTime(timeLeft)}</span>
                </p>
              ) : (
                <div className="space-y-2">
                  <p className="text-sm text-gray-600 dark:text-gray-400">
                    Didn't receive the code?
                  </p>
                  <Button
                    type="button"
                    variant="outline"
                    onClick={handleResendOTP}
                    disabled={isResending}
                    className="text-blue-500 border-blue-200 hover:bg-blue-50"
                  >
                    {isResending ? (
                      <>
                        <Loader2 className="w-4 h-4 mr-2 animate-spin" />
                        Resending...
                      </>
                    ) : (
                      <>
                        <RefreshCw className="w-4 h-4 mr-2" />
                        Resend Code
                      </>
                    )}
                  </Button>
                </div>
              )}
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              disabled={loading || value.length !== 6}
              className={cn(
                "w-full py-3 rounded-lg font-medium transition-all duration-200 shadow-lg hover:shadow-xl",
                value.length === 6 
                  ? "bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white" 
                  : "bg-gray-300 dark:bg-gray-600 text-gray-500 cursor-not-allowed"
              )}
            >
              {loading ? (
                <>
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                  Verifying...
                </>
              ) : (
                'Verify & Continue'
              )}
            </Button>

            {/* Back to Forgot Password */}
            <div className="text-center pt-4">
              <button
                type="button"
                onClick={() => navigate('/auth/forgot-password')}
                className="inline-flex items-center text-sm text-gray-600 dark:text-gray-400 hover:text-gray-800 dark:hover:text-gray-200 transition-colors"
              >
                <ArrowLeft className="w-4 h-4 mr-1" />
                Back to Email Entry
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default VerifyEmailForgot;
