import BlogPostCard from "./BlogPostCard";
import { blogs } from "../../data/blogs.json";

import { Link } from "react-router-dom";
export default function BlogPosts() {
   
  return (
    <div className=" mt-40">
        
      <div className=" mx-28 p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog) => (
            <Link to={`/note/view/${blog.id}`}><BlogPostCard  key={blog.id} {...blog} /></Link>
          ))}
        </div>
      </div>
    </div>
  );
}
