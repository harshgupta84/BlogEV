import React, { useEffect, useState } from "react";
import useBookmarkStore from "@/store/bookmarkStore";
import BlogPostCard from "@/pages/blogList/suggestedBlogs/BlogPostCard";
import { Bookmark, BookOpen, Heart, Sparkles } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

function Bookmarked() {
  const { bookmarks, loading, fetchBookmarks, getBookmarkCount } = useBookmarkStore();
  const [isInitialized, setIsInitialized] = useState(false);

  useEffect(() => {
    if (!isInitialized) {
      fetchBookmarks();
      setIsInitialized(true);
    }
  }, [fetchBookmarks, isInitialized]);

  if (loading && !isInitialized) {
    return (
      <div className="min-h-screen flex items-center justify-center pt-24">
        <DotPattern className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )} />
        <div className="relative z-10 text-center">
          <div className="inline-flex items-center justify-center w-16 h-16 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-4 animate-pulse">
            <Bookmark className="w-8 h-8 text-white" />
          </div>
          <h2 className="text-2xl font-semibold mb-2 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
            Loading Your Bookmarks
          </h2>
          <p className="text-gray-600 dark:text-gray-400">
            Please wait while we fetch your saved blogs...
          </p>
          <div className="mt-8 grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            {[1, 2, 3].map((i) => (
              <div key={i} className="animate-pulse">
                <div className="bg-gray-200 dark:bg-gray-700 rounded-lg h-64 w-full"></div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  }

  const isEmpty = bookmarks.length === 0;

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
      <DotPattern className={cn(
        "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
      )} />
      
      <div className="relative z-10 container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-gradient-to-r from-blue-500 to-green-500 rounded-full mb-6">
            <Bookmark className="w-10 h-10 text-white fill-current" />
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4">
            <span className="bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
              Your Bookmarks
            </span>
          </h1>
          <p className="text-gray-600 dark:text-gray-400 text-lg max-w-2xl mx-auto">
            {isEmpty 
              ? "Start building your reading list by bookmarking interesting blogs"
              : `You have ${getBookmarkCount()} saved blog${getBookmarkCount() !== 1 ? 's' : ''} to read later`
            }
          </p>
        </div>

        {isEmpty ? (
          /* Empty State */
          <div className="text-center py-16">
            <div className="max-w-md mx-auto">
              <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-200 dark:border-gray-700">
                <div className="inline-flex items-center justify-center w-16 h-16 bg-gray-100 dark:bg-gray-700 rounded-full mb-6">
                  <BookOpen className="w-8 h-8 text-gray-400" />
                </div>
                <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100 mb-4">
                  No bookmarks yet
                </h3>
                <p className="text-gray-600 dark:text-gray-400 mb-6">
                  Discover amazing content and save your favorite blogs to read later. 
                  Start exploring our blog collection!
                </p>
                <div className="space-y-3">
                  <Link to="/blog/feed">
                    <Button className="w-full bg-gradient-to-r from-blue-500 to-green-500 hover:from-blue-600 hover:to-green-600 text-white">
                      <Sparkles className="w-4 h-4 mr-2" />
                      Explore Blogs
                    </Button>
                  </Link>
                  <Link to="/blog/create">
                    <Button variant="outline" className="w-full">
                      Create Your First Blog
                    </Button>
                  </Link>
                </div>
              </div>
            </div>
          </div>
        ) : (
          /* Bookmarks Grid */
          <>
            {/* Stats Bar */}
            <div className="bg-white dark:bg-gray-800 rounded-xl shadow-sm border border-gray-200 dark:border-gray-700 p-6 mb-8">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-6">
                  <div className="flex items-center space-x-2">
                    <Bookmark className="w-5 h-5 text-blue-500" />
                    <span className="font-semibold text-gray-900 dark:text-gray-100">
                      {getBookmarkCount()} Bookmarks
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Heart className="w-5 h-5 text-red-500" />
                    <span className="text-gray-600 dark:text-gray-400">
                      Reading List
                    </span>
                  </div>
                </div>
                <Link to="/blog/feed">
                  <Button variant="outline" size="sm">
                    Discover More
                  </Button>
                </Link>
              </div>
            </div>

            {/* Bookmarks List */}
            <div className="grid gap-6 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {bookmarks.map((blog) => (
                <BlogPostCard 
                  key={blog.id} 
                  blog={blog} 
                  showActions={false}
                />
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
}

export default Bookmarked;
