import React, { useEffect, useState } from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "highlight.js/styles/github.css";
import useBlogStore from "@/store/blogStore";
import useBookmarkStore from "@/store/bookmarkStore";
import useLikeStore from "@/store/likeStore";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Card, CardContent } from "@/components/ui/card";
import { useToast } from "@/hooks/use-toast";
import { Edit3, Trash2, Share2, Bookmark, BookmarkPlus, Heart, Eye, Clock, User, Calendar, ArrowLeft, MoreVertical } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { Toaster } from "@/components/ui/toaster";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";

export default function BlogView() {
  const { id } = useParams();
  const { fetchBlogById, currentBlog, deleteBlog } = useBlogStore();
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { isLiked, toggleLike, getLikeCount, setLikeState } = useLikeStore();
  const navigate = useNavigate();
  const { toast } = useToast();
  const [loading, setLoading] = useState(true);
  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);
  const [readingTime, setReadingTime] = useState(0);

  useEffect(() => {
    if (id) {
      fetchBlogById(id).then(() => {
        setLoading(false);
        if (currentBlog) {
          // Calculate reading time (assuming 200 words per minute)
          const words = currentBlog.content?.split(' ').length || 0;
          setReadingTime(Math.ceil(words / 200));
          
          // Initialize like state
          setLikeState(id, false, currentBlog.likes?.length || 0);
        }
      });
    }
  }, [id, fetchBlogById, currentBlog, setLikeState]);

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24">
        <DotPattern className={cn(
          "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
        )} />
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="animate-pulse space-y-6">
              <div className="flex items-center space-x-4 mb-8">
                <div className="w-12 h-12 bg-gray-300 dark:bg-gray-700 rounded-full"></div>
                <div className="space-y-2">
                  <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-32"></div>
                  <div className="h-3 bg-gray-300 dark:bg-gray-700 rounded w-24"></div>
                </div>
              </div>
              <div className="h-12 bg-gray-300 dark:bg-gray-700 rounded w-3/4"></div>
              <div className="h-6 bg-gray-300 dark:bg-gray-700 rounded w-1/2"></div>
              <div className="h-64 bg-gray-300 dark:bg-gray-700 rounded"></div>
              <div className="space-y-3">
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-full"></div>
                <div className="h-4 bg-gray-300 dark:bg-gray-700 rounded w-2/3"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (!currentBlog) {
    return (
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-24 flex items-center justify-center">
        <div className="text-center">
          <div className="w-24 h-24 bg-gray-200 dark:bg-gray-700 rounded-full flex items-center justify-center mb-6 mx-auto">
            <Bookmark className="w-12 h-12 text-gray-400" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100 mb-2">Blog not found</h2>
          <p className="text-gray-600 dark:text-gray-400 mb-6">The blog you're looking for doesn't exist or has been removed.</p>
          <Button onClick={() => navigate('/blog/feed')} className="bg-gradient-to-r from-blue-500 to-green-500 text-white">
            Browse Blogs
          </Button>
        </div>
      </div>
    );
  }

  const { title, author, user, createdAt, topics = [], pic, content, views = 0 } = currentBlog;

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

  const handleBookmark = async () => {
    setIsBookmarking(true);
    const success = await toggleBookmark(id);
    if (success) {
      toast({
        title: isBookmarked(id) ? "Bookmarked!" : "Bookmark removed!",
        description: isBookmarked(id) 
          ? `"${currentBlog.title}" has been added to your bookmarks.`
          : `"${currentBlog.title}" has been removed from your bookmarks.`,
      });
    }
    setIsBookmarking(false);
  };

  const handleLike = async () => {
    setIsLiking(true);
    const success = await toggleLike(id);
    if (success) {
      toast({
        title: isLiked(id) ? "Liked!" : "Unliked!",
        description: isLiked(id) 
          ? "Added to your likes" 
          : "Removed from your likes",
      });
    }
    setIsLiking(false);
  };

  const getTimeAgo = (dateString) => {
    const now = new Date();
    const date = new Date(dateString);
    const diffInMinutes = Math.floor((now - date) / (1000 * 60));
    
    if (diffInMinutes < 60) return `${diffInMinutes}m ago`;
    if (diffInMinutes < 1440) return `${Math.floor(diffInMinutes / 60)}h ago`;
    return `${Math.floor(diffInMinutes / 1440)}d ago`;
  };

  return (
    <div className="min-h-screen bg-gray-50 dark:bg-gray-900 pt-20">
      <DotPattern className={cn(
        "inset-4 z-0 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]"
      )} />
      
      <div className="relative z-10">
        {/* Header Bar */}
        <div className="bg-white dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700 sticky top-16 z-40">
          <div className="container mx-auto px-4">
            <div className="flex items-center justify-between py-4">
              <Button
                variant="ghost"
                onClick={() => navigate(-1)}
                className="flex items-center space-x-2"
              >
                <ArrowLeft className="w-4 h-4" />
                <span>Back</span>
              </Button>
              
              <div className="flex items-center space-x-2">
                {/* Like Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "transition-all duration-200",
                    isLiked(id)
                      ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
                      : "text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                  )}
                  onClick={handleLike}
                  disabled={isLiking}
                >
                  <Heart className={cn(
                    "w-5 h-5 mr-2 transition-all duration-200",
                    isLiked(id) ? "fill-current" : ""
                  )} />
                  <span>{getLikeCount(id)}</span>
                </Button>

                {/* Bookmark Button */}
                <Button
                  variant="ghost"
                  size="sm"
                  className={cn(
                    "transition-all duration-200",
                    isBookmarked(id)
                      ? "text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                      : "text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                  )}
                  onClick={handleBookmark}
                  disabled={isBookmarking}
                >
                  <Bookmark className={cn(
                    "w-5 h-5 mr-2 transition-all duration-200",
                    isBookmarked(id) ? "fill-current" : ""
                  )} />
                  {isBookmarked(id) ? "Saved" : "Save"}
                </Button>

                {/* More Actions */}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button variant="ghost" size="sm">
                      <MoreVertical className="w-5 h-5" />
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem asChild>
                      <Link to={`/blog/update/${id}`} className="flex items-center">
                        <Edit3 className="mr-2 h-4 w-4" />
                        Edit Blog
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={shareHandler}>
                      <Share2 className="mr-2 h-4 w-4" />
                      Share
                    </DropdownMenuItem>
                    <DropdownMenuItem onClick={deleteHandler} className="text-red-600">
                      <Trash2 className="mr-2 h-4 w-4" />
                      Delete
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            </div>
          </div>
        </div>

        {/* Blog Content */}
        <div className="container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            {/* Author & Meta Info */}
            <Card className="mb-8">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-6">
                  <div className="flex items-center space-x-4">
                    <Avatar className="w-12 h-12 ring-2 ring-gray-200 dark:ring-gray-600">
                      <AvatarImage src={user?.image || "https://via.placeholder.com/150"} alt={user?.name || author} />
                      <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold">
                        {(user?.name || author)?.charAt(0) || "A"}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-gray-900 dark:text-gray-100">
                        {user?.name || author || "Unknown Author"}
                      </h3>
                      <div className="flex items-center space-x-4 text-sm text-gray-500 dark:text-gray-400">
                        <div className="flex items-center space-x-1">
                          <Calendar className="w-4 h-4" />
                          <span>{new Date(createdAt).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Clock className="w-4 h-4" />
                          <span>{readingTime} min read</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Eye className="w-4 h-4" />
                          <span>{views} views</span>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Title */}
                <h1 className="text-3xl md:text-4xl lg:text-5xl font-bold mb-6 leading-tight bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent">
                  {title}
                </h1>

                {/* Topics */}
                {topics.length > 0 && (
                  <div className="flex flex-wrap gap-2 mb-6">
                    {topics.map((topic, index) => (
                      <Badge key={index} variant="secondary" className="bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                        {topic}
                      </Badge>
                    ))}
                  </div>
                )}

                {/* Featured Image */}
                {pic && (
                  <div className="mb-8">
                    <img 
                      src={pic} 
                      alt={`Featured image for "${title}"`} 
                      className="w-full h-64 md:h-80 object-cover rounded-xl shadow-lg" 
                    />
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Blog Content */}
            <Card>
              <CardContent className="p-8">
                <div className="prose dark:prose-invert max-w-none prose-lg">
                  <MarkdownPreview 
                    source={content} 
                    style={{ 
                      background: "transparent", 
                      color: "inherit",
                      fontSize: "1.1rem",
                      lineHeight: "1.8"
                    }} 
                  />
                </div>
              </CardContent>
            </Card>

            {/* Engagement Footer */}
            <Card className="mt-8">
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-6">
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Eye className="w-5 h-5" />
                      <span className="font-medium">{views} views</span>
                    </div>
                    <div className="flex items-center space-x-2 text-gray-600 dark:text-gray-400">
                      <Heart className={cn(
                        "w-5 h-5",
                        isLiked(id) ? "text-red-500 fill-current" : ""
                      )} />
                      <span className="font-medium">{getLikeCount(id)} likes</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center space-x-2">
                    <Button
                      variant="outline"
                      onClick={shareHandler}
                      className="flex items-center space-x-2"
                    >
                      <Share2 className="w-4 h-4" />
                      <span>Share</span>
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}
