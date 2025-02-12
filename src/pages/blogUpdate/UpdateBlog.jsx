import React, { useState, useEffect } from "react";
import MarkdownEditor from "../blogCreate/MarkdownEditor";
import useBlogStore from "@/store/blogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check, Loader2 } from "lucide-react";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
import { getBlogById } from "@/services/blogService";
import { Toaster } from "@/components/ui/toaster";
import { updateBlog } from "@/services/blogService";
const topicsList = [
  { value: "Technology", label: "Technology" },
  { value: "Programming", label: "Programming" },
  { value: "AI & ML", label: "AI & ML" },
  { value: "Web Development", label: "Web Development" },
  { value: "Cybersecurity", label: "Cybersecurity" },
  { value: "Blockchain", label: "Blockchain" },
  { value: "Cloud Computing", label: "Cloud Computing" },
  { value: "Data Science", label: "Data Science" },
  { value: "DevOps", label: "DevOps" },
  { value: "UI/UX Design", label: "UI/UX Design" },
  { value: "Open Source", label: "Open Source" },
  { value: "Startups", label: "Startups" },
  { value: "Marketing", label: "Marketing" },
  { value: "Finance", label: "Finance" },
  { value: "Health & Wellness", label: "Health & Wellness" },
  { value: "Education", label: "Education" },
];


function UpdateBlog() {
  const { id } = useParams();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [markdown, setMarkdown] = useState("");
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        setLoading(true);
        const blogData = await getBlogById(id);
        if (blogData) {
          setBlog(blogData);
          setMarkdown(blogData.content);
          setTitle(blogData.title);
          setTopics(Array.isArray(blogData.topics) ? blogData.topics : JSON.parse(blogData.topics));
        } else {
          setError("Blog not found");
        }
      } catch (err) {
        setError(err.message);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to load blog",
        });
      } finally {
        setLoading(false);
      }
    };

    fetchBlog();
  }, [id, toast]);

  const handleUpdate = async () => {
    try {
    
      const updatedBlog = {
        ...blog,
        title: title,
        content: markdown,
        topics: topics,
      };

      await updateBlog(id, updatedBlog);

      toast({
        title: "Success!",
        description: "Your blog has been updated successfully.",
      });

      navigate(`/blog/view/${id}`);
    } catch (err) {
      toast({
        variant: "destructive",
        title: "Error",
        description: "Failed to update blog",
      });
    }
  };

  const handleSelectTopic = (selectedValue) => {
    setTopics((prevTopics) =>
      prevTopics.includes(selectedValue) ? prevTopics : [...prevTopics, selectedValue]
    );
  };

  const removeTopic = (topicToRemove) => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic !== topicToRemove));
  };

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8 mt-24">
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

  if (error) {
    return (
      <div className="mt-24 container mx-auto text-center">
        <h1 className="text-2xl font-bold text-gray-800 dark:text-gray-200">Error</h1>
        <p className="mt-4 text-gray-600 dark:text-gray-400">{error}</p>
        <Button 
          className="mt-6"
          onClick={() => navigate("/blog/myblogs")}
        >
          Back to My Blogs
        </Button>
      </div>
    );
  }

  return (
    <div className="mt-24 container mx-auto max-w-[1200px] px-4">
      <DotPattern className={cn("inset-4 -z-10 [mask-image:radial-gradient(40vw_circle_at_center,white,transparent)]")} />
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
          Update Blog
        </h1>
        <p className="text-lg text-muted-foreground mt-4">Edit your blog content and settings.</p>
      </div>

      <div className="max-w-35 mx-auto  rounded-lg shadow-lg p-6">
        <div className="space-y-6">
          <div>
            <Label htmlFor="title">Blog Title</Label>
            <Input 
              id="title"
              value={title} 
              onChange={(e) => setTitle(e.target.value)} 
              placeholder="Enter blog title..." 
              className="mt-1"
            />
          </div>

          <div>
            <Label>Topics</Label>
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" className="w-full justify-between mt-1">
                  {topics.length > 0 ? topics.map((t) => topicsList.find(topic => topic.value === t)?.label).join(", ") : "Select topics..."}
                  <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-full p-0">
                <Command>
                  <CommandInput placeholder="Search topic..." />
                  <CommandList>
                    <CommandEmpty>No topic found.</CommandEmpty>
                    <CommandGroup>
                      {topicsList.map((topic) => (
                        <CommandItem
                          key={topic.value}
                          value={topic.value}
                          onSelect={() => handleSelectTopic(topic.value)}
                        >
                          <Check
                            className={cn(
                              "mr-2 h-4 w-4",
                              topics.includes(topic.value) ? "opacity-100" : "opacity-0"
                            )}
                          />
                          {topic.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="flex flex-wrap gap-2 mt-2">
              {topics.map((topic, index) => (
                <Badge
                  key={index}
                  variant="secondary"
                  className="px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-800 dark:text-blue-100"
                >
                  {topicsList.find(t => t.value === topic)?.label}
                  <button
                    onClick={() => removeTopic(topic)}
                    className="ml-2 hover:text-red-500"
                  >
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>

          <div>
            
            <div className="mt-1">
              <MarkdownEditor
              title={title} 
                markdown={markdown} 
                setMarkdown={setMarkdown} 
                onSubmit={handleUpdate} 
                buttonText="Update Blog" 
              />
            </div>
          </div>
        </div>
      </div>
      <Toaster />
    </div>
  );
}

export default UpdateBlog;