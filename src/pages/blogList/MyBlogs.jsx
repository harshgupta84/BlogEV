import React from "react";

import BlogPosts from "./BlogPosts";

function MyBlogs() {
  return (
    <div className="mt-24">
    
     <div className="">
        <h1 className=" text-5xl md:text-7xl max-w-3xl  text-center font-regular">
        
          <span className="bg-gradient-to-br tracking-tighter from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Your Blogs
          </span>
          <span className=" ml-1">📝</span>
        </h1>
        </div>
      <div className="mt-5">
      <BlogPosts />
      </div>
    </div>
  );
}

export default MyBlogs;
