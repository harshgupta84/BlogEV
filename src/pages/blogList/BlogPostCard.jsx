import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PencilLine, Trash, Copy } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { Link, useNavigate } from "react-router-dom";
import useBlogStore from "@/store/blogStore";
import { BorderBeam } from "@/components/ui/border-beam";
import { deleteBlog } from "@/services/blogService";

export default function BlogPostCard({ blog }) {
  const { id, title, createdAt, content, topics } = blog;
  const { toast } = useToast();
  const navigate = useNavigate();

  // Format the createdAt date
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  // Safe parsing of topics
  const parseTopics = (topicsData) => {
    try {
      if (Array.isArray(topicsData)) {
        return topicsData;
      }
      if (typeof topicsData === 'string') {
        // If it's a comma-separated string
        if (topicsData.includes(',')) {
          return topicsData.split(',').map(topic => topic.trim());
        }
        // Try parsing JSON
        return JSON.parse(topicsData);
      }
      return [];
    } catch (error) {
      return [];
    }
  };

  const blogTopics = parseTopics(topics);

  // Delete handler with toast notification
  const deleteHandler = () => {
    deleteBlog(id);
    toast({
      title: `Blog "${title}" deleted successfully!`,
      description: "The blog post has been removed.",
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
      .catch(() => {
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
        {/* Header Section */}
        <div className="flex items-center justify-between px-4 pt-4 sm:flex-col sm:items-start sm:gap-4 md:flex-row">
          <div className="flex items-center space-x-2 text-[#8CCC4C]">
            <Avatar className="h-8 w-8 border dark:border-white">
              <AvatarImage src="/default-avatar.png" alt="Author" />
              <AvatarFallback>AB</AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">Unknown Author</span>
          </div>
          <div className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200 flex gap-7 sm:mt-2 md:mt-0">
            <Link to={`/blog/update/${id}`}>
              <PencilLine className="cursor-pointer" />
            </Link>
            <Trash className="cursor-pointer" onClick={deleteHandler} />
            <Copy className="cursor-pointer" onClick={copyLinkHandler} />
          </div>
        </div>

        {/* Blog Title Section */}
        <Link to={`/blog/view/${id}`}>
          <CardHeader className="pb-4">
            <h2 className="text-3xl font-bold leading-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
              {title}
            </h2>
          </CardHeader>
        </Link>

        {/* Blog Content Preview */}
        

        {/* Blog Date and Topics */}
        <CardFooter className="flex items-center justify-between pt-4 sm:flex-col sm:items-start md:flex-row">
          <div className="flex items-center space-x-2 text-md text-muted-foreground">
            <CalendarIcon className="h-6 w-6" />
            <time dateTime={createdAt}>{date}</time>
          </div>
          <div className="flex gap-2">
            {blogTopics.map((topic, index) => (
              <Badge key={index} className="dark:bg-[#0098C5] text-sm">
                {topic}
              </Badge>
            ))}
          </div>
        </CardFooter>
      </Card>
    </div>
  );
}