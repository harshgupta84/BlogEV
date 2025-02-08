import React, { useState } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import useLoginStore from '@/store/loginStore';
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';

import { useNavigate } from 'react-router-dom';

function ChangePass() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const { changePassword, error, loading,logoutUser } = useLoginStore();

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await changePassword(oldPassword, newPassword);
    logoutUser();
    navigate('/auth/login');
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen mt-20">
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular">
            <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
              Change Password
            </span>
          </h1>
          <div className="mt-6">
            <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
            <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
            <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
            <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
            <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-6 w-1/2 mb-4 rounded-md"></div>
            <div className="bg-gray-300 dark:bg-gray-700 animate-pulse h-12 w-full mb-4 rounded-md"></div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-center min-h-screen ">
        <DotPattern className={cn(
                              "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
                            )}
                          />
      <div className="w-full max-w-md p-6 rounded-lg shadow-lg">
      <h1 className="text-5xl md:text-6xl max-w-3xl text-center font-regular mb-9">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Change Password
          </span>
        </h1>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="oldPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              Old Password
            </label>
            <Input
              id="oldPassword"
              type="password"
              value={oldPassword}
              onChange={(e) => setOldPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          <div>
            <label htmlFor="newPassword" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
              New Password
            </label>
            <Input
              id="newPassword"
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              required
              className="mt-1"
            />
          </div>
          {error && <p className="text-sm text-red-600 dark:text-red-400">{error}</p>}
          <div>
            <Button type="submit" disabled={loading} className="w-full">
              {loading ? 'Changing...' : 'Change Password'}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default ChangePass;
