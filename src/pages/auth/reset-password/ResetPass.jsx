import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useLoginStore from '@/store/loginStore';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import { useNavigate } from 'react-router-dom';

function ResetPass() {
  
  const [confirmPassword, setConfirmPassword] = useState('');
 
  const { resetPassword, error, loading ,password,setPassword} = useLoginStore();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
     await resetPassword();
     navigate('/auth/login');
    
  };

  return (
    <div className="flex justify-center items-center min-h-screen">
      <DotPattern
        className={cn(
          'inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]'
        )}
      />
      <div className="w-full max-w-md p-6">
        <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular mb-9">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Reset Password
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label
              htmlFor="password"
              className="block text-sm font-medium text-gray-700"
            >
              Password
            </label>
            <Input
              id="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label
              htmlFor="confirmPassword"
              className="block text-sm font-medium text-gray-700"
            >
              Confirm Password
            </label>
            <Input
              id="confirmPassword"
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
         
          <Button type="submit" disabled={loading} className="w-full">
            {loading ? 'Sending...' : 'Send Reset Link'}
          </Button>
        </form>
      </div>
    </div>
  );
}

export default ResetPass;
