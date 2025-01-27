import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "highlight.js/styles/github.css"; // Syntax highlighting styles
import useBlogStore from "@/store/blogStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit3, Trash2, Share2 } from "lucide-react"; // Lucide icons
import { Toaster } from "@/components/ui/toaster";

export default function BlogView() {
  const { id } = useParams(); // Extract ID from the URL
  const { getBlogById, deleteBlog } = useBlogStore();
  const navigate = useNavigate();
  const { toast } = useToast();

  const blog = getBlogById(id);

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl text-red-500 font-semibold">
          Blog not found!
        </p>
      </div>
    );
  }

  const deleteHandler = () => {
    deleteBlog(id);
    navigate("/myblogs");
    toast({
      title: "Blog deleted successfully!",
      description: `Your blog "${blog.title}" has been deleted.`,
    });
  };

  const shareHandler = () => {
    const blogUrl = `${window.location.origin}/blog/view/${id}`;
    navigator.clipboard.writeText(blogUrl);
    toast({
      title: "Link copied to clipboard!",
      description: `Share this link: ${blogUrl}`,
    });
  };

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Command Panel */}
      <div
        className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch sm:space-x-4 space-y-4 sm:space-y-0 mb-6 p-4  mx-4 sm:mx-8 lg:mx-16"
      >
        {/* Update Note Button */}
        <Button
          className="flex items-center space-x-2 text-lg sm:text-xl bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors"
        >
          <Edit3 size={18} />
          <Link to={`/blog/update/${id}`}>Update Note</Link>
        </Button>

        {/* Delete Note Button */}
        <Button
          className="flex items-center space-x-2 text-lg sm:text-xl bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-600 text-white transition-colors"
          onClick={deleteHandler}
        >
          <Trash2 size={18} />
          <span>Delete Note</span>
        </Button>

        {/* Share Link Button */}
        <Button
          className="flex items-center space-x-2 text-lg sm:text-xl bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white transition-colors"
          onClick={shareHandler}
        >
          <Share2 size={18} />
          <span>Share Link</span>
        </Button>
      </div>

      {/* Blog Content */}
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-6 max-w-3xl mx-4 sm:mx-auto">
        {/* Blog Title */}
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-left">
          {blog.title}
        </h1>

        {/* Metadata */}
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-6 text-left">
          By <span className="font-semibold">{blog.author}</span> |{" "}
          {new Date(blog.createdAt).toLocaleDateString()} |{" "}
          <span className="italic">{blog.category}</span>
        </p>

        {/* Blog Image */}
        {blog.pic && (
          <img
            src={blog.pic}
            alt={`Image for blog "${blog.title}"`}
            className="rounded-md mb-6 w-full max-h-80 object-cover"
          />
        )}

        {/* Blog Content */}
        <div className="prose dark:prose-invert max-w-none leading-relaxed">
          <MarkdownPreview
            source={blog.content}
            style={{ background: "transparent", color: "inherit" }}
          />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
