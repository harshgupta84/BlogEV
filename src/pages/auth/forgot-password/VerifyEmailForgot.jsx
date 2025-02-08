"use client";

import React, { useState } from "react";
import {
  InputOTP,
  InputOTPGroup,
  InputOTPSlot,
} from "@/components/ui/input-otp"; // Adjust the import according to your project structure
import useAuthStore from "@/store/authStore";
import { useNavigate } from "react-router-dom";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import useLoginStore from "@/store/loginStore";

export function VerifyEmailForgot() {
  const [value, setValue] = useState("");
  const {verifyOtpForgot,loading,setLoading,email}=useLoginStore();

  const navigate = useNavigate();
  // Dummy handler function for OTP submission
  const handleSubmit = async (e) => {
    e.preventDefault();
   
    setLoading(true)  
    verifyOtpForgot(email,value);
    setLoading(false)
    navigate('/auth/reset-password')
    // Dummy action: You can replace this with your real logic later
  };

  if(loading){
    return(
      <div className="flex justify-center items-center min-h-screen mt-20">
        
        <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
          <h1 className=" text-5xl md:text-6xl max-w-3xl  text-center font-regular">
              <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
                Verify Email
              </span>
              
            </h1>
            <div className="flex justify-center items-center mt-10">
              <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-gray-900"></div>
            </div>
        </div>
      </div>
    )
  }

  return (
    <div className="flex justify-center items-center min-h-screen mt-20">
      <DotPattern className={cn(
                              "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
                            )}
                          />
      <div className="p-8 rounded-lg shadow-lg w-full max-w-md">
      <h1 className=" text-5xl md:text-6xl max-w-3xl  text-center font-regular">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Verify Email
          </span>
          
        </h1>

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* OTP Input Boxes */}
          <InputOTP
            maxLength={6}
            value={value}
            onChange={(value) => setValue(value)}
          >
            <InputOTPGroup>
              <InputOTPSlot
                index={0}
                className="w-16 h-16 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputOTPSlot
                index={1}
                className="w-16 h-16 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputOTPSlot
                index={2}
                className="w-16 h-16 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputOTPSlot
                index={3}
                className="w-16 h-16 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputOTPSlot
                index={4}
                className="w-16 h-16 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
              <InputOTPSlot
                index={5}
                className="w-16 h-16 text-xl text-center border-2 border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              />
            </InputOTPGroup>
          </InputOTP>

          {/* Submit Button */}
          <div>
            <button
              type="submit"
              className="w-full py-4 bg-blue-500 text-white text-lg font-semibold rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Verify OTP
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default VerifyEmailForgot;
