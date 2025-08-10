import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { CalendarIcon, PencilLine, Trash, Copy, Eye, Heart, Bookmark, Share, MoreVertical, Clock } from "lucide-react";
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "@/components/ui/dropdown-menu";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import useBlogStore from "@/store/blogStore";
import useBookmarkStore from "@/store/bookmarkStore";
import useLikeStore from "@/store/likeStore";
import { BorderBeam } from "@/components/ui/border-beam";
import { cn } from "@/lib/utils";
import React, { useState, useEffect } from "react";

export default function BlogPostCard({ blog, showActions = true }) {
  const { id, title, content, createdAt, topics = [], likes = [], views = 0, user } = blog;
  const { toast } = useToast();
  const { deleteBlog } = useBlogStore();
  const { isBookmarked, toggleBookmark } = useBookmarkStore();
  const { isLiked, toggleLike, getLikeCount, setLikeState } = useLikeStore();
  const [isLiking, setIsLiking] = useState(false);
  const [isBookmarking, setIsBookmarking] = useState(false);

  useEffect(() => {
    // Initialize like state from blog data
    setLikeState(id, likes.some(like => like.userId === user?.id), likes.length);
  }, [id, likes, user?.id, setLikeState]);

  // Format the createdAt date
  const date = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  const deleteHandler = async () => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      await deleteBlog(id);
      toast({
        title: `Blog "${title}" deleted successfully!`,
        description: "The blog post has been removed from the system.",
        duration: 4000,
      });
    }
  };

  const copyLinkHandler = () => {
    const baseURL = window.location.origin;
    const link = `${baseURL}/blog/view/${id}`;

    navigator.clipboard
      .writeText(link)
      .then(() => {
        toast({
          title: "Link copied!",
          description: "The blog link has been copied to your clipboard.",
          duration: 3000,
        });
      })
      .catch(() => {
        toast({
          title: "Error copying link",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  const handleLike = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsLiking(true);
    const success = await toggleLike(id);
    if (success) {
      toast({
        title: isLiked(id) ? "Unliked!" : "Liked!",
        description: isLiked(id) ? "Removed from your likes" : "Added to your likes",
        duration: 2000,
      });
    }
    setIsLiking(false);
  };

  const handleBookmark = async (e) => {
    e.preventDefault();
    e.stopPropagation();
    setIsBookmarking(true);
    const success = await toggleBookmark(id);
    if (success) {
      toast({
        title: isBookmarked(id) ? "Bookmarked!" : "Bookmark removed!",
        description: isBookmarked(id) ? "Added to your bookmarks" : "Removed from your bookmarks",
        duration: 2000,
      });
    }
    setIsBookmarking(false);
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
    <div className="relative group">
      <BorderBeam className="rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={100} duration={12} delay={0} />
      <Card className="shadow-lg hover:shadow-xl transition-all duration-300 border border-gray-200 dark:border-gray-700 hover:border-blue-300 dark:hover:border-blue-600 bg-white dark:bg-gray-800">
        {/* Header Section */}
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center gap-3">
            <Avatar className="w-10 h-10 ring-2 ring-gray-200 dark:ring-gray-600">
              <AvatarImage src={user?.image || "https://via.placeholder.com/150"} alt={user?.name} />
              <AvatarFallback className="bg-gradient-to-r from-blue-500 to-green-500 text-white font-semibold">
                {user?.name?.charAt(0) || "U"}
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <span className="font-semibold text-gray-900 dark:text-gray-100 text-sm">
                {user?.name || "Unknown Author"}
              </span>
              <div className="flex items-center gap-2 text-xs text-gray-500 dark:text-gray-400">
                <Clock className="w-3 h-3" />
                <span>{getTimeAgo(createdAt)}</span>
              </div>
            </div>
          </div>
          
          {showActions && (
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" size="sm" className="h-8 w-8 p-0">
                  <MoreVertical className="h-4 w-4" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end">
                <DropdownMenuItem asChild>
                  <Link to={`/blog/update/${id}`} className="flex items-center">
                    <PencilLine className="mr-2 h-4 w-4" />
                    Edit
                  </Link>
                </DropdownMenuItem>
                <DropdownMenuItem onClick={copyLinkHandler}>
                  <Copy className="mr-2 h-4 w-4" />
                  Copy Link
                </DropdownMenuItem>
                <DropdownMenuItem onClick={deleteHandler} className="text-red-600">
                  <Trash className="mr-2 h-4 w-4" />
                  Delete
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          )}
        </div>

        {/* Blog Content */}
        <Link to={`/blog/view/${id}`} className="block">
          <CardContent className="px-4 pb-4">
            <h2 className="text-xl font-bold leading-tight mb-3 bg-gradient-to-r from-blue-600 to-green-600 bg-clip-text text-transparent hover:from-blue-700 hover:to-green-700 transition-all duration-200">
              {title}
            </h2>
            {content && (
              <p className="text-gray-600 dark:text-gray-300 text-sm line-clamp-3 leading-relaxed">
                {content.replace(/[#*`]/g, '').slice(0, 150)}...
              </p>
            )}
          </CardContent>
        </Link>

        {/* Topics */}
        {topics.length > 0 && (
          <CardContent className="px-4 pb-3">
            <div className="flex flex-wrap gap-2">
              {topics.slice(0, 3).map((topic, index) => (
                <Badge key={index} variant="secondary" className="text-xs px-2 py-1 bg-blue-100 text-blue-700 dark:bg-blue-900/30 dark:text-blue-300">
                  {topic}
                </Badge>
              ))}
              {topics.length > 3 && (
                <Badge variant="outline" className="text-xs px-2 py-1">
                  +{topics.length - 3} more
                </Badge>
              )}
            </div>
          </CardContent>
        )}

        {/* Footer Actions */}
        <CardFooter className="px-4 py-3 border-t border-gray-100 dark:border-gray-700">
          <div className="flex items-center justify-between w-full">
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-1 text-gray-500 dark:text-gray-400">
                <Eye className="h-4 w-4" />
                <span className="text-sm">{views}</span>
              </div>
            </div>
            
            <div className="flex items-center gap-2">
              {/* Like Button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-3 transition-all duration-200",
                  isLiked(id)
                    ? "text-red-500 hover:text-red-600 bg-red-50 dark:bg-red-900/20"
                    : "text-gray-500 hover:text-red-500 hover:bg-red-50 dark:hover:bg-red-900/20"
                )}
                onClick={handleLike}
                disabled={isLiking}
              >
                <Heart className={cn(
                  "h-4 w-4 mr-1 transition-all duration-200",
                  isLiked(id) ? "fill-current" : ""
                )} />
                <span className="text-sm">{getLikeCount(id) || likes.length}</span>
              </Button>

              {/* Bookmark Button */}
              <Button
                variant="ghost"
                size="sm"
                className={cn(
                  "h-8 px-3 transition-all duration-200",
                  isBookmarked(id)
                    ? "text-blue-500 hover:text-blue-600 bg-blue-50 dark:bg-blue-900/20"
                    : "text-gray-500 hover:text-blue-500 hover:bg-blue-50 dark:hover:bg-blue-900/20"
                )}
                onClick={handleBookmark}
                disabled={isBookmarking}
              >
                <Bookmark className={cn(
                  "h-4 w-4 transition-all duration-200",
                  isBookmarked(id) ? "fill-current" : ""
                )} />
              </Button>

              {/* Share Button */}
              <Button
                variant="ghost"
                size="sm"
                className="h-8 px-3 text-gray-500 hover:text-green-500 hover:bg-green-50 dark:hover:bg-green-900/20 transition-all duration-200"
                onClick={copyLinkHandler}
              >
                <Share className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
