import React, { useEffect, useState } from "react";
import BlogPosts from "../BlogPosts";
import { Toaster } from "@/components/ui/toaster";  
import { ToastProvider } from "@radix-ui/react-toast";
import useBlogStore from "@/store/blogStore";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
// Separate Loading Skeleton Component
const BlogSkeleton = () => {
  return (
    <div className="w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 animate-pulse">
     
      <div className="space-y-6">
        {[1, 2, 3].map((index) => (
          <div 
            key={index} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-md overflow-hidden border border-gray-200 dark:border-gray-700"
          >
            <div className="flex flex-col md:flex-row">
              {/* Skeleton Image */}
              <div className="w-full md:w-1/3">
                <div className="h-64 md:h-full bg-gray-200 dark:bg-gray-700"></div>
              </div>
              
              {/* Skeleton Content */}
              <div className="w-full md:w-2/3 p-6">
                {/* Title */}
                <div className="h-8 bg-gray-200 dark:bg-gray-700 rounded w-3/4 mb-4"></div>
                
                {/* Description */}
                <div className="space-y-3">
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-full"></div>
                  <div className="h-4 bg-gray-200 dark:bg-gray-700 rounded w-5/6"></div>
                </div>
                
                {/* Tags */}
                <div className="mt-6 flex gap-2">
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                  <div className="h-6 w-20 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                </div>
                
                {/* Author Info and Date */}
                <div className="mt-6 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 bg-gray-200 dark:bg-gray-700 rounded-full"></div>
                    <div className="h-4 w-32 bg-gray-200 dark:bg-gray-700 rounded"></div>
                  </div>
                  <div className="h-4 w-24 bg-gray-200 dark:bg-gray-700 rounded"></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

function MyBlogs() {
  const { getUserBlogs, myblogs } = useBlogStore();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setIsLoading(true);
        await getUserBlogs();
      } catch (err) {
        setError(err.message);
      } finally {
        setTimeout(() => {
          setIsLoading(false);
        }, 1000);
      }
    };

    fetchBlogs();
  }, [getUserBlogs]);

  const retryLoad = () => {
    setError(null);
    getUserBlogs();
  };

  if (error) {
    return (
      <div className="mt-24 text-center">
        <p className="text-red-500 dark:text-red-400 mb-4">Error loading blogs: {error}</p>
        <button 
          onClick={retryLoad}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
        >
          Retry
        </button>
      </div>
    );
  }

  return (
    <div className="mt-24">
      <DotPattern
        className={cn(
          "inset-4 -z-10 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div>
        <h1 className="text-5xl md:text-7xl max-w-3xl text-center font-regular mx-auto">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Your Blogs
          </span>
          <span className="ml-1">📝</span>
        </h1>
      </div>

      <div className="mt-10">
        <ToastProvider>
          {isLoading ? (
            <BlogSkeleton />
          ) : myblogs.length === 0 ? (
            <div className="text-center mt-10 text-gray-500 dark:text-gray-400 flex flex-col items-center">
              <p className="text-xl mb-4">No blogs found.</p>
              <p className="text-gray-400 dark:text-gray-500">Start writing your first blog!</p>
            </div>
          ) : (
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
              <BlogPosts blogs={myblogs} />
            </div>
          )}
          <Toaster />
        </ToastProvider>
      </div>
    </div>
  );
}

export default MyBlogs;