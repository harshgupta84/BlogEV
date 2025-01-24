import BlogPostCard from "./BlogPostCard";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { Link } from "react-router-dom";
import { BorderBeam } from "@/components/ui/border-beam";
import useBlogStore from "@/store/blogStore";

export default function BlogPosts() {
  const { blogs } = useBlogStore();
  return (
    <div>
      <DotPattern
        className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className=" mx-20">
        <div className="flex flex-col gap-6">
          {blogs.toReversed().map((blog) => (
            <BlogPostCard key={blog.id} blog={blog} />
          ))}
        </div>
      </div>
    </div>
  );
}
