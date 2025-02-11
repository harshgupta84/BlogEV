import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import { getBlogById, deleteBlog } from "@/services/blogService";
import MarkdownPreview from "@uiw/react-markdown-preview";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import {
  Edit3,
  Trash2,
  Share2,
  Bookmark,
  BookmarkPlus,
  Calendar,
  Eye,
} from "lucide-react";
import { Toaster } from "@/components/ui/toaster";
import useBookmarkStore from "@/store/bookmarkStore";
import useBlogStore from "@/store/blogStore";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import useUserStore from "@/store/userStore";
export default function BlogView() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { user } = useUserStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlog = async () => {
      setLoading(true);
      const blogData = await getBlogById(id);
      console.log(blogData);
      setBlog(blogData);
      setLoading(false);
    };

    fetchBlog();
  }, [id]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse space-y-6">
          <div className="h-8 bg-gray-300 dark:bg-neutral-700 rounded w-3/4"></div>
          <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-1/2"></div>
          <div className="h-64 bg-gray-300 dark:bg-neutral-700 rounded"></div>
          <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-full"></div>
          <div className="h-4 bg-gray-300 dark:bg-neutral-700 rounded w-2/3"></div>
        </div>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl text-red-500 font-semibold">
          Blog not found!
        </p>
      </div>
    );
  }

  const deleteHandler = async () => {
    await deleteBlog(id);
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
    return new Date(date).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
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
      <DotPattern
        className={cn(
          "inset-4 -z-10 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )}
      />
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch sm:space-x-4 space-y-4 sm:space-y-0 mb-6 p-4 mx-4 sm:mx-8 lg:mx-16">
        {/* Conditionally show Update and Delete buttons if the logged-in user is the author */}
        {blog.author.id === user.id && (
          <>
            <Link to={`/blog/update/${id}`} className="flex">
              <Button className="flex items-center space-x-2 text-lg sm:text-xl bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600 transition-colors">
                <Edit3 size={18} />
                <span>Update Note</span>
              </Button>
            </Link>
            <Button
              className="flex items-center space-x-2 text-lg sm:text-xl bg-red-500 dark:bg-red-700 hover:bg-red-600 dark:hover:bg-red-600 text-white transition-colors"
              onClick={deleteHandler}
            >
              <Trash2 size={18} />
              <span>Delete Note</span>
            </Button>
          </>
        )}

        {/* Share and Bookmark buttons - always visible */}
        <Button
          className="flex items-center space-x-2 text-lg sm:text-xl bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white transition-colors"
          onClick={shareHandler}
        >
          <Share2 size={18} />
          <span>Share Link</span>
        </Button>
        {blog.author.id !== user.id && (
          <>
            <Button
              className={`flex items-center space-x-2 text-lg sm:text-xl ${
                isBookmarked(id)
                  ? "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 dark:hover:bg-yellow-600 text-white"
                  : "bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
              } transition-colors`}
              onClick={toggleBookmark}
            >
              {isBookmarked(id) ? (
                <Bookmark size={18} />
              ) : (
                <BookmarkPlus size={18} />
              )}
              <span>
                {isBookmarked(id) ? "Remove Bookmark" : "Add Bookmark"}
              </span>
            </Button>
          </>
        )}
      </div>

      {/* Blog Title */}
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
          {blog.title}
        </h1>
      </div>

      {/* Blog Content */}
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-6 max-w-3xl mx-4 sm:mx-auto">
        {/* Metadata */}
        <div className="flex flex-col sm:flex-row items-center justify-between mb-6 space-y-4 sm:space-y-0">
          <div className="flex items-center space-x-4">
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              Written By:
            </span>
            <span className="font-semibold text-gray-700 dark:text-gray-300">
              {blog.author.name}
            </span>
            <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
              <Calendar size={16} />
              <span>{formatDate(blog.createdAt)}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2 text-gray-500 dark:text-gray-400">
            <Eye size={16} />
            <span>{formatViews(blog.views)} views</span>
          </div>
        </div>

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
