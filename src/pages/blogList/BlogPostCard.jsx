import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon, PencilLine } from "lucide-react";

import { Link } from "react-router-dom";

export default function BlogPostCard({ blog }) {
  const { id, title, createdAt, author, category, pic, likes } = blog; // Destructure blog object

  // Format the createdAt date
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Card className="shadow-md border dark:border-gray-700">
      {/* Header Section with Author Info and Edit Icon */}
      <div className="flex items-center justify-between px-4 pt-4">
        <div className="flex items-center space-x-2 text-[#8CCC4C]">
          <Avatar className="h-8 w-8 border dark:border-white">
            <AvatarImage src={pic} alt={author} />
            <AvatarFallback>
              {author.slice(0, 2).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author}</span>
        </div>
        <div className="text-gray-500 hover:text-gray-800 dark:hover:text-gray-200">
          <Link to={`/blog/update/${id}`}>
            <PencilLine className="cursor-pointer" />
          </Link>
        </div>
      </div>

      {/* Blog Title */}
      <CardHeader className="pb-4">
        <h2 className="text-3xl font-bold leading-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
          {title}
        </h2>
      </CardHeader>

      {/* Blog Meta Information */}
      <CardContent className="pb-2">
        <div className="flex items-center space-x-2 text-md text-muted-foreground">
          <CalendarIcon className="h-6 w-6" />
          <time dateTime={createdAt}>{date}</time>
        </div>
      </CardContent>

      {/* Footer Section with Category and Likes */}
      <CardFooter className="flex items-center justify-between pt-4">
        <Badge className="dark:bg-[#0098C5] text-sm">{category}</Badge>
        <div className="flex items-center gap-1.5 text-gray-600 dark:text-gray-300 hover:scale-110 transition-transform">
          👍 <span>{likes}</span>
        </div>
      </CardFooter>
    </Card>
  );
}
