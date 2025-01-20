
import React from "react";
import { useParams } from "react-router-dom";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css"; // Syntax highlighting styles
import useBlogStore from "@/store/blogStore";

export default function BlogView() {
  const { id } = useParams(); // Extract ID from the URL as a string
  const {getBlogById} = useBlogStore();
  const blog = getBlogById(id);

  if (!blog) {
    return <p className="text-center text-xl text-red-500">Blog not found!</p>;
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-6 max-w-4xl mx-auto">
        {/* Blog Title */}
        <h1 className="text-4xl font-bold mb-4 text-left">{blog.title}</h1>
        {/* Blog Metadata */}
        <p className="text-gray-600 dark:text-gray-300 text-sm mb-6 text-left">
          By {blog.author} | {new Date(blog.createdAt).toLocaleDateString()} |{" "}
          {blog.category}
        </p>
        {/* Blog Image */}
        {blog.pic && (
          <img
            src={blog.pic}
            alt={blog.title}
            className="rounded-md mb-6 max-h-72 object-cover mx-auto"
          />
        )}
        {/* Blog Content */}
        <div className="prose dark:prose-invert max-w-none">
          <ReactMarkdown
            remarkPlugins={[remarkGfm]} // Enable GitHub-flavored Markdown
            rehypePlugins={[rehypeHighlight]} // Enable syntax highlighting
          >
            {blog.content}
          </ReactMarkdown>
        </div>
      </div>
    </div>
  );
}
