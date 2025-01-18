import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Badge } from "@/components/ui/badge"
import { CalendarIcon } from 'lucide-react'
import { NeonGradientCard } from "@/components/ui/neon-gradient-card"

export default function BlogPostCard({
  title,
  createdAt,
  author,
  category,
  pic
}) {
  const date = new Date(createdAt).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'long',
    day: 'numeric'
  })

  return (
    <NeonGradientCard className=" ">
      <CardHeader className="pb-4 text-[#00729E]">
        <h2 className="text-3xl font-bold leading-tight">{title}</h2>
      </CardHeader>
      <CardContent className="pb-2">
        <div className="flex items-center space-x-2 text-md text-muted-foreground">
          <CalendarIcon className="h-6 w-6" />
          <time  dateTime={createdAt}>{date}</time>
        </div>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4">
        <Badge variant="secondary" className=" dark:bg-[#0098C5] text-md">{category}</Badge>
        <div className="flex items-center space-x-2 text-[#8CCC4C]">
          <Avatar className="h-8 w-8 border dark:border-white ">
            <AvatarImage src={pic} alt={author}  />
            <AvatarFallback>{author.slice(0, 2).toUpperCase()}</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">{author}</span>
        </div>
      </CardFooter>
    
    </NeonGradientCard>
  )
}
