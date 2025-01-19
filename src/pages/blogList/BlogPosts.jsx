import BlogPostCard from "./BlogPostCard";

import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BorderBeam } from "@/components/ui/border-beam";
import useBlogStore from "@/store/blogStore";  
import { useEffect } from "react";

export default function BlogPosts() {
  const {blogs} =useBlogStore();


  return (
    <div>
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className=" mx-28 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link to={`/blog/view/${blog.id}`}>
              <div className="relative">
                <BorderBeam
                  className="rounded-2xl"
                  size={100}
                  duration={9}
                  delay={8}
                />
                <BlogPostCard key={blog.id} blog={blog} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
