import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { CalendarIcon } from "lucide-react";
import { BorderBeam } from "@/components/ui/border-beam";

export default function BlogPostCard({
  title,
  createdAt,
  author,
  category,
  pic,
  likes,
}) {
  const date = new Date(createdAt).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    
      <Card>
        <div className="flex items-center space-x-2 text-[#8CCC4C] ml-4 mt-4">
            <Avatar className="h-8 w-8 border dark:border-white ">
              <AvatarImage src={pic} alt={author} />
              <AvatarFallback>
                {author.slice(0, 2).toUpperCase()}
              </AvatarFallback>
            </Avatar>
            <span className="text-sm font-medium">{author}</span>
          </div>
        <CardHeader className="pb-4">
          <h2 className="text-3xl font-bold leading-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            {title}
          </h2>
        </CardHeader>
        <CardContent className="pb-2">
          <div className="flex items-center space-x-2 text-md text-muted-foreground">
            <CalendarIcon className="h-6 w-6" />
            <time dateTime={createdAt}>{date}</time>
          </div>
        </CardContent>
        <CardFooter className="flex items-center justify-between pt-4">
          <Badge  className=" dark:bg-[#0098C5] text-sm">
            {category}
          </Badge>
          <div className="flex gap-1.5 hover:scale-125">
            👍 <span>{likes}</span>
          </div>
        </CardFooter>
      </Card>
    
  );
}
