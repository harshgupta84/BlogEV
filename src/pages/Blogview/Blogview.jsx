import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBlogById } from "@/services/blogService";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge"; // Add this import
import { useToast } from "@/hooks/use-toast";
import { Edit3, Trash2, Share2, Bookmark, BookmarkPlus, Calendar, Eye } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import useBookmarkStore from "@/store/bookmarkStore";
import useBlogStore from "@/store/blogStore";

export default function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { deleteBlog } = useBlogStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const blogData = await getBlogById(id);
      setBlog(blogData);
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return <p className="text-center text-lg">Loading...</p>;
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl text-red-500 font-semibold">Blog not found!</p>
      </div>
    );
  }

  const deleteHandler = () => {
    deleteBlog(id);
    navigate("/blog/myblogs");
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

  const toggleBookmark = () => {
    if (isBookmarked(id)) {
      removeBookmark(id);
      toast({
        title: "Bookmark removed",
        description: `"${blog.title}" has been removed from your bookmarks.`,
      });
    } else {
      addBookmark(id);
      toast({
        title: "Bookmark added",
        description: `"${blog.title}" has been added to your bookmarks.`,
      });
    }
  };

  const formatDate = (date) => {
    return new Date(date).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
  };

  const formatViews = (views) => {
    if (views >= 1000000) {
      return `${(views / 1000000).toFixed(1)}M`;
    } else if (views >= 1000) {
      return `${(views / 1000).toFixed(1)}K`;
    }
    return views;
  };
  return (
    <div className="container mx-auto px-4 py-8">
    {/* Command Panel - Keep as is */}
    
    {/* Blog Content */}
    <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-6 max-w-3xl mx-4 sm:mx-auto">
      {/* Blog Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
          {blog.title}
        </h1>
      </div>

      {/* Metadata */}
      <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
        {/* Author and Date */}
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {blog.authorId}
            </span>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Calendar size={16} />
            <span>{formatDate(blog.createdAt)}</span>
          </div>
        </div>

        {/* Views */}
        <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
          <Eye size={16} />
          <span>{formatViews(blog.views)} views</span>
        </div>
      </div>

      {/* Topics */}
      <div className="flex flex-wrap gap-2 mb-6">
        {(Array.isArray(blog.topics) ? blog.topics : JSON.parse(blog.topics)).map((topic, index) => (
          <Badge 
            key={index}
            variant="secondary"
            className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100 rounded-full"
          >
            {topic}
          </Badge>
        ))}
      </div>

      {/* Blog Content */}
      <div className="prose dark:prose-invert max-w-none leading-relaxed">
        <MarkdownPreview 
          source={blog.content} 
          style={{ 
            background: "transparent",
            color: "inherit"
          }}
        />
      </div>
    </div>
    <Toaster />
  </div>
    );
}
