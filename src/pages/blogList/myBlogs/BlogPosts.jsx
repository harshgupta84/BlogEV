import DotPattern from "@/components/ui/dot-pattern";
import useBlogStore from "@/store/blogStore";
import { useEffect } from "react";
import BlogPostCardUser from "./BlogPostCardUser";

export default function BlogPosts() {
  const { myBlogs, fetchMyBlogs, loading } = useBlogStore();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div>
      <DotPattern className="inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]" />
      
      <div className="mx-20">
        <div className="flex flex-col gap-6">
          {loading ? (
            Array.from({ length: 3 }).map((_, index) => (
              <div
                key={index}
                className="flex flex-col gap-4 p-4 border rounded-lg shadow-md animate-fade-in"
              >
                <div className="bg-gray-300 dark:bg-neutral-700 h-6 w-3/4 rounded animate-pulse" />
                <div className="bg-gray-300 dark:bg-neutral-700 h-4 w-1/2 rounded animate-pulse" />
                <div className="bg-gray-300 dark:bg-neutral-700 h-32 w-full rounded animate-pulse" />
              </div>
            ))
          ) : (
            myBlogs.map((blog) => (
              <div key={blog.id} className="animate-fade-in">
                <BlogPostCardUser blog={blog} />
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
}
