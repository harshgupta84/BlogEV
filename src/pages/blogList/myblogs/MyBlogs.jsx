import React from "react";
import BlogPosts from "../BlogPosts";
import { Toaster } from "@/components/ui/toaster";  
import { ToastProvider } from '@radix-ui/react-toast';
import useBlogStore from "@/store/blogStore";

function MyBlogs() {
  const { blogs } = useBlogStore();
  return (
    <div className="mt-24 ">
      <div className="">

        {/* use the same h1 component from the Hero.jsx file */}
        <h1 className=" text-5xl md:text-7xl max-w-3xl  text-center font-regular">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Your Blogs
          </span>
          <span className=" ml-1">📝</span>
        </h1>


      </div>
      <div className="mt-5 ">
        <ToastProvider>
        
          <BlogPosts blogs={blogs}/>
          <Toaster />
        </ToastProvider>
      </div>
    </div>
  );
}

export default MyBlogs;
