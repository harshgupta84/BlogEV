
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import useBlogStore from "@/store/blogStore";
import { useEffect } from "react";
import BlogPostCardUser from "./BlogPostCardUser";

export default function BlogPosts() {
  const { myBlogs, fetchMyBlogs } = useBlogStore();

  useEffect(() => {
    fetchMyBlogs();
  }, []);

  return (
    <div>
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="mx-20">
        <div className="flex flex-col gap-6">
          {myBlogs.map((blog) => (
            <BlogPostCardUser key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
