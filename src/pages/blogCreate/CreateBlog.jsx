import React, { useState } from "react";
import useBlogStore from "@/store/blogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { ChevronsUpDown, Check } from "lucide-react";
import DotPattern from "@/components/ui/dot-pattern";
import { cn } from "@/lib/utils";
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


function CreateBlog() {
  const [markdown, setMarkdown] = useState("# New Blog...\nStart typing here...");
  const [title, setTitle] = useState("");
  const [topics, setTopics] = useState([]);
  const [open, setOpen] = useState(false);
  const { addBlog } = useBlogStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = () => {
    const blogTitle = title || markdown.split("\n")[0].replace(/^#\s*/, "") || "Untitled Blog";
    addBlog(blogTitle, markdown, topics);
    
    toast({
      title: `Blog "${blogTitle}" saved successfully!`,
      description: "Your blog has been saved to the system.",
    });
    navigate("/blog/myblogs");
  };

  const handleSelectTopic = (selectedValue) => {
    setTopics((prevTopics) =>
      prevTopics.includes(selectedValue) ? prevTopics : [...prevTopics, selectedValue]
    );
  };

  const removeTopic = (topicToRemove) => {
    setTopics((prevTopics) => prevTopics.filter((topic) => topic !== topicToRemove));
  };

  return (
    <div className="mt-24 container mx-auto max-w-[1200px]">
       <DotPattern className={cn("inset-4 -z-10 [mask-image:radial-gradient(50vw_circle_at_center,white,transparent)]")} />
      <div className="text-center mb-8">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
          Markdown Editor
        </h1>
        <p className="text-lg text-muted-foreground mt-4">Create and preview your Markdown.</p>
      </div>

      <div className="flex flex-col w-full max-w-sm mx-auto">
        <Label>Blog Title</Label>
        <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Enter blog title..." />
      </div>

      <div className="w-full max-w-sm mx-auto mt-4">
        <Label>Select Topics</Label>
        <Popover open={open} onOpenChange={setOpen}>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full flex justify-between">
              {topics.length > 0 ? topics.map((t) => topicsList.find((topic) => topic.value === t)?.label).join(", ") : "Select topics..."}
              <ChevronsUpDown className="opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-full p-0">
            <Command>
              <CommandInput placeholder="Search topic..." className="h-9" />
              <CommandList>
                <CommandEmpty>No topic found.</CommandEmpty>
                <CommandGroup>
                  {topicsList.map((topic) => (
                    <CommandItem key={topic.value} value={topic.value} onSelect={() => handleSelectTopic(topic.value)}>
                      {topic.label}
                      <Check className={`ml-auto ${topics.includes(topic.value) ? "opacity-100" : "opacity-0"}`} />
                    </CommandItem>
                  ))}
                </CommandGroup>
              </CommandList>
            </Command>
          </PopoverContent>
        </Popover>

        <div className="space-x-2 mt-4 flex flex-wrap">
          {topics.map((topic, index) => (
            <Badge key={index} className="flex items-center bg-blue-500 text-white p-2 rounded-md">
              {topicsList.find((t) => t.value === topic)?.label}
              <button onClick={() => removeTopic(topic)} className="ml-2 text-xs text-gray-300 hover:text-white">×</button>
            </Badge>
          ))}
        </div>
      </div>

      <MarkdownEditor title={title} markdown={markdown} setMarkdown={setMarkdown} onSubmit={handleSave} buttonText="Save Blog" />
    </div>
  );
}

export default CreateBlog;
