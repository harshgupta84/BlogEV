import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useLoginStore from '@/store/loginStore';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

function ForgotPass() {
  
  const { forgotPassword, error, loading,email,setEmail } = useLoginStore();

  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Forgot Password",email);
    forgotPassword(email);
    navigate("/auth/verify-email-forgot")
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
        <DotPattern className={cn(
                                      "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
                                    )}
           />
      <div className="w-full max-w-md p-6">
      <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular mb-9">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Change Password
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700">
              Email Address
            </label>
            <Input
              id="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm text-red-600">{error}</p>}
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ForgotPass;
