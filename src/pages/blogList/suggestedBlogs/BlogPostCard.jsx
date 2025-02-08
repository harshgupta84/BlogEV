import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PencilLine, Trash, Copy, Eye } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";
import useBlogStore from "@/store/blogStore";
import { BorderBeam } from "@/components/ui/border-beam";

export default function BlogPostCard({ blog }) {
  const { id, title, createdAt, topics = [], likes = [], views = 0, user } = blog;
  const { toast } = useToast();
  const { deleteBlog } = useBlogStore();

  // Format the createdAt date
  const date = createdAt
    ? new Date(createdAt).toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric",
      })
    : "Unknown Date";

  // Delete handler with toast notification
  const deleteHandler = () => {
    deleteBlog(id);
    toast({
      title: `Blog "${title}" deleted successfully!`,
      description: "The blog post has been removed from the system.",
      duration: 4000,
    });
  };

  // Copy link handler
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
      .catch((error) => {
        console.error("Failed to copy link:", error);
        toast({
          title: "Error copying link",
          description: "Something went wrong. Please try again.",
          variant: "destructive",
          duration: 3000,
        });
      });
  };

  return (
    <div className="relative">
      <BorderBeam className="rounded-2xl" size={100} duration={9} delay={8} />
      <Card className="shadow-md border dark:border-gray-700">
        {/* Header Section with Edit/Delete/Copy Icons */}
        <div className="flex items-center justify-end px-4 pt-4 gap-7">
          <Link to={`/blog/update/${id}`}>
            <PencilLine className="cursor-pointer" />
          </Link>
          <Trash className="cursor-pointer" onClick={deleteHandler} />
          <Copy className="cursor-pointer" onClick={copyLinkHandler} />
        </div>

        {/* User Avatar and Name Section */}
        <CardContent className="flex items-center gap-4 pb-4">
          <Avatar>
            <AvatarImage src={user?.image || "https://via.placeholder.com/150"} alt={user?.name} />
            <AvatarFallback>{user?.name?.charAt(0) || "U"}</AvatarFallback>
          </Avatar>
          <div className="text-lg font-semibold text-gray-700 dark:text-gray-300">
            {user?.name || "Unknown Author"}
          </div>
        </CardContent>

        {/* Blog Title Section */}
        <Link to={`/blog/view/${id}`}>
          <CardHeader className="pb-4">
            <h2 className="text-3xl font-bold leading-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
              {title}
            </h2>
          </CardHeader>
        </Link>

        {/* Blog Date Section */}
        <CardContent className="pb-2">
          <div className="flex items-center space-x-2 text-md text-muted-foreground">
            <CalendarIcon className="h-6 w-6" />
            <time dateTime={createdAt}>{date}</time>
          </div>
        </CardContent>

        {/* Blog Footer Section with Categories, Views, and Likes */}
        <CardFooter className="flex items-center justify-between pt-4 sm:flex-col sm:items-start md:flex-row">
          <div className="flex flex-wrap gap-2">
            {topics.map((topic, index) => (
              <Badge key={index} className="dark:bg-[#0098C5] text-sm">
                {topic}
              </Badge>
            ))}
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform">
              <Eye className="h-5 w-5" /> <span>{views}</span>
            </div>
            <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform">
              👍 <span>{likes.length}</span>
            </div>
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}
