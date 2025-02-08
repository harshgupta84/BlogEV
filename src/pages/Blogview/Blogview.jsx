import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "highlight.js/styles/github.css";
import useBlogStore from "@/store/blogStore";
import useBookmarkStore from "@/store/bookmarkStore";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Edit3, Trash2, Share2, Bookmark, BookmarkPlus } from "lucide-react";
import { Toaster } from "@/components/ui/toaster";

export default function BlogView() {
  const { id } = useParams();
  const { fetchBlogById, currentBlog, deleteBlog } = useBlogStore();
  const { addBookmark, removeBookmark, isBookmarked } = useBookmarkStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (id) {
      fetchBlogById(id).then(() => setLoading(false));
    }
  }, [id, fetchBlogById]);

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

  if (!currentBlog) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-xl text-red-500 font-semibold">Blog not found!</p>
      </div>
    );
  }

  const { title, author, createdAt, category, pic, content } = currentBlog;

  const deleteHandler = () => {
    deleteBlog(id);
    navigate("/blog/myblogs");
    toast({
      title: "Blog deleted successfully!",
      description: `Your blog "${title}" has been deleted.`,
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
        description: `"${title}" has been removed from your bookmarks.`,
      });
    } else {
      addBookmark(id);
      toast({
        title: "Bookmark added",
        description: `"${title}" has been added to your bookmarks.`,
      });
    }
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="flex flex-col sm:flex-row justify-center items-center sm:items-stretch sm:space-x-4 space-y-4 sm:space-y-0 mb-6 p-4 mx-4 sm:mx-8 lg:mx-16">
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
        <Button
          className="flex items-center space-x-2 text-lg sm:text-xl bg-blue-500 dark:bg-blue-700 hover:bg-blue-600 dark:hover:bg-blue-600 text-white transition-colors"
          onClick={shareHandler}
        >
          <Share2 size={18} />
          <span>Share Link</span>
        </Button>
        <Button
          className={`flex items-center space-x-2 text-lg sm:text-xl ${
            isBookmarked(id)
              ? "bg-yellow-500 dark:bg-yellow-700 hover:bg-yellow-600 dark:hover:bg-yellow-600 text-white"
              : "bg-gray-200 dark:bg-neutral-700 hover:bg-gray-300 dark:hover:bg-neutral-600"
          } transition-colors`}
          onClick={toggleBookmark}
        >
          {isBookmarked(id) ? <Bookmark size={18} /> : <BookmarkPlus size={18} />}
          <span>{isBookmarked(id) ? "Remove Bookmark" : "Add Bookmark"}</span>
        </Button>
      </div>
      <div className="bg-white dark:bg-neutral-900 shadow-lg rounded-lg p-6 max-w-3xl mx-4 sm:mx-auto">
        <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold mb-4 text-left">{title}</h1>
        <p className="text-gray-500 dark:text-gray-400 text-sm sm:text-base mb-6 text-left">
          By <span className="font-semibold">{author}</span> | {new Date(createdAt).toLocaleDateString()} | <span className="italic">{category}</span>
        </p>
        {pic && <img src={pic} alt={`Image for blog "${title}"`} className="rounded-md mb-6 w-full max-h-80 object-cover" />}
        <div className="prose dark:prose-invert max-w-none leading-relaxed">
          <MarkdownPreview source={content} style={{ background: "transparent", color: "inherit" }} />
        </div>
      </div>
      <Toaster />
    </div>
  );
}
