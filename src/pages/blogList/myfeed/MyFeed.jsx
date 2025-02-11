import React ,{useState,useEffect}from "react";
import BlogPosts from "../BlogPosts";
import { Toaster } from "@/components/ui/toaster";  
import { ToastProvider } from '@radix-ui/react-toast';
import useBlogStore from "@/store/blogStore";
function MyFeed() {
    const {listBlogs, myfeed} = useBlogStore();
     const [isLoading, setIsLoading] = useState(true);
      const [error, setError] = useState(null);
    
      useEffect(() => {
        const fetchBlogs = async () => {
          try {
            setIsLoading(true);
            await listBlogs();
          } catch (err) {
            setError(err.message);
          } finally {
            setTimeout(() => {
              setIsLoading(false);
            }, 1000);
          }
        };
    
        fetchBlogs();
      }, [listBlogs]);
    
  return (
    <div className="mt-24 ">
      <div className="">

        {/* use the same h1 component from the Hero.jsx file */}
        <h1 className=" text-5xl md:text-7xl max-w-3xl  text-center font-regular">
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Suggested Blogs
          </span>
          <span className=" ml-1">📝</span>
        </h1>


      </div>
      <div className="mt-5 ">
        <ToastProvider>
          <BlogPosts blogs={myfeed}/>
          <Toaster />
        </ToastProvider>
      </div>
    </div>
  );
}

export default MyFeed;
