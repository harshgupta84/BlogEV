import React from "react";
import BlogPostCard from "./BlogPostCard";
import { Link } from "react-router-dom";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { BorderBeam } from "@/components/ui/border-beam";
import useBlogStore from "@/store/blogStore";

export default function BlogPosts() {
  const blogs = useBlogStore((state) => state.blogs); // Fetch blogs from Zustand store

  return (
    <div>
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="mx-28 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link key={blog.id} to={`/blog/view/${blog.id}`}>
              <div className="relative">
                <BorderBeam
                  className="rounded-2xl"
                  size={100}
                  duration={9}
                  delay={8}
                />
                <BlogPostCard {...blog} />
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
