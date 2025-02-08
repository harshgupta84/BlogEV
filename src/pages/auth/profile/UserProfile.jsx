
import React from 'react';
import { Button } from "@/components/ui/button";
import { LogOut, Lock, UserCog } from "lucide-react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import DotPattern from '@/components/ui/dot-pattern';
import { cn } from '@/lib/utils';
import useUserStore from '@/store/userStore';
import useLoginStore from '@/store/loginStore';
import { useNavigate } from 'react-router-dom';
import { Loader2 } from "lucide-react";

function UserProfile() {
  const navigate = useNavigate();
  const { name, email, pic, interestedTopics, loading } = useUserStore();
  console.log("User Profile", name, email, pic, interestedTopics, loading);
  const { logoutUser } = useLoginStore();

  const handleLogout = () => {
    logoutUser();
    navigate('/auth/login');
  }

  const handleChangePassword = () => {
    navigate('/auth/change-password');
    console.log("Change password clicked");
  }

  const handleUpdateInfo = () => {
    console.log("Update info clicked");
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen ">
        <Loader2 className="h-8 w-8 animate-spin text-gray-700 dark:text-gray-300" />
      </div>
    );
  }

  return (
    <div className="min-h-screen mt-20 container mx-auto p-4 ">
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />

      <div className="relative z-10">
        <h1 className="text-4xl font-bold text-center mb-8">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            User Profile
          </span>
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* User Info Section */}
          <div className="md:col-span-2">
            <div className=" shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <div className="flex items-center space-x-4 mb-4">
                <Avatar className="h-20 w-20 border border-gray-300 dark:border-white">
                  {pic && <AvatarImage src={pic} alt={name} />}
                  <AvatarFallback className="text-gray-700 dark:text-gray-300">
                    {name?.charAt(0)?.toUpperCase()}
                  </AvatarFallback>
                </Avatar>
                <div>
                  <h2 className="text-2xl font-bold text-gray-800 dark:text-gray-100">{name}</h2>
                  <p className="text-gray-600 dark:text-gray-400">{email}</p>
                </div>
              </div>

              <div>
                <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-2">
                  Interested Topics
                </h3>
                <div className="flex flex-wrap gap-2">
                  {interestedTopics && interestedTopics.length > 0 ? (
                    interestedTopics.map((topic) => (
                      <Badge key={topic} variant="secondary" className="bg-gray-200 dark:bg-gray-700 text-gray-800 dark:text-gray-300">
                        {topic}
                      </Badge>
                    ))
                  ) : (
                    <p className="text-gray-500 dark:text-gray-400">No topics selected yet</p>
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* User Actions Section */}
          <div>
            <div className="shadow-lg rounded-lg p-6 border border-gray-200 dark:border-gray-700">
              <h3 className="text-lg font-semibold text-gray-800 dark:text-gray-200 mb-4">
                Account Actions
              </h3>
              <div className="space-y-4">
                <Button 
                  onClick={handleUpdateInfo} 
                  className="w-full flex items-center justify-center bg-blue-500 hover:bg-blue-600 text-white dark:bg-blue-400 dark:hover:bg-blue-500"
                >
                  <UserCog className="mr-2 h-4 w-4" />
                  Update Info
                </Button>
                <Button 
                  onClick={handleChangePassword} 
                  className="w-full flex items-center justify-center bg-green-500 hover:bg-green-600 text-white dark:bg-green-400 dark:hover:bg-green-500"
                >
                  <Lock className="mr-2 h-4 w-4" />
                  Change Password
                </Button>
                <Button 
                  onClick={handleLogout} 
                  variant="destructive" 
                  className="w-full flex items-center justify-center bg-red-500 hover:bg-red-600 text-white dark:bg-red-400 dark:hover:bg-red-500"
                >
                  <LogOut className="mr-2 h-4 w-4" />
                  Logout
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default UserProfile;
