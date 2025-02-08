import React, { useState, useEffect } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Popover, PopoverTrigger, PopoverContent } from "@/components/ui/popover";
import { ChevronsUpDown, Check } from "lucide-react";
import { Command, CommandInput, CommandList, CommandEmpty, CommandGroup, CommandItem } from "@/components/ui/command";
import { Badge } from "@/components/ui/badge";
import { chatSession } from "@/pages/blogCreate/AiModal";
import useCreateBlogStore from "@/store/createBlogStore";

function MarkdownEditor({ onSubmit, buttonText }) {
  const {
    content,
    title,
    setTopic,
    loading,
    setLoading,
    setTitle,
    setContent,
  } = useCreateBlogStore();

  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [selectedTopics, setSelectedTopics] = useState([]);

  const topicsList = [
    { value: "Technology", label: "Technology" },
    { value: "Science", label: "Science" },
    { value: "Business", label: "Business" },
    { value: "Design", label: "Design" },
    { value: "Music", label: "Music" },
    { value: "Sports", label: "Sports" },
  ];

  useEffect(() => {
    setIsMobile(window.innerWidth <= 768);
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const addTopic = (topic) => {
    setSelectedTopics((prev) => [...prev, topic]);
    setTopic(topic);
  };

  const removeTopic = (topic) => {
    setSelectedTopics((prev) => prev.filter((t) => t !== topic));
  };

  const handleSelectTopic = (topic) => {
    if (!selectedTopics.includes(topic)) {
      addTopic(topic);
    }
    setValue("");
    setOpen(false);
  };

  const generateContent = async () => {
    if (!title) {
      alert("Please enter a title first");
      return;
    }

    try {
      setLoading(true);
      const prompt = `Generate content for the blog in Markdown with the title: "${title}".`;
      const result = await chatSession.sendMessage(prompt);
      const resultText = await result.response.text();
      setContent(resultText);
    } catch (error) {
      console.error("Error generating blog content:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="flex flex-col items-center mx-8">
        <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
          Markdown Editor
        </h1>
        <p className="text-lg text-muted-foreground mt-4">Create and preview your Markdown.</p>
        <div className="flex gap-4 w-full">
          <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-md h-96 animate-pulse"></div>
          <div className="flex-1 bg-neutral-200 dark:bg-neutral-700 rounded-md h-96 animate-pulse"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative mb-4 mx-3">
      <div className="container mx-auto max-w-[1200px] flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Markdown Editor
          </h1>
          <p className="text-lg text-muted-foreground mt-4">Create and preview your Markdown.</p>
        </div>

        <div className="m-3">
          <PulsatingButton onClick={generateContent}>✨ Generate Content for Blog</PulsatingButton>
        </div>

        <div className="flex flex-col w-full max-w-sm">
          <div>
            <Label>Blog Title</Label>
            <Input value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>

          <div className="w-full mt-4">
            <Popover open={open} onOpenChange={setOpen}>
              <PopoverTrigger asChild>
                <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                  {value ? topicsList.find((topic) => topic.value === value)?.label || "Select topic..." : "Select topic..."}
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
                          <Check className={`ml-auto ${selectedTopics.includes(topic.value) ? "opacity-100" : "opacity-0"}`} />
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </CommandList>
                </Command>
              </PopoverContent>
            </Popover>

            <div className="space-x-2 mt-4 flex flex-wrap">
              {selectedTopics.map((topic, index) => (
                <Badge key={index} className="flex items-center bg-blue-500 text-white p-2 rounded-md">
                  {topic}
                  <button onClick={() => removeTopic(topic)} className="ml-2 text-xs text-gray-300 hover:text-white">
                    ×
                  </button>
                </Badge>
              ))}
            </div>
          </div>
        </div>

        <div className={`flex flex-1 w-full ${isMobile ? "" : "gap-4"} overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-neutral-900`}>
          {(!isMobile || !isPreviewVisible) && (
            <textarea
              className="w-full p-4 text-lg resize-none focus:outline-none bg-neutral-100 dark:bg-neutral-800 dark:text-white"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your Markdown here..."
            ></textarea>
          )}

          {(!isMobile || isPreviewVisible) && (
            <div className="w-full p-4 overflow-auto bg-neutral-50 dark:bg-neutral-900 dark:text-white">
              <MarkdownPreview source={content} style={{ background: "transparent", color: "inherit" }} />
            </div>
          )}
        </div>

        <div className="flex gap-4 mt-6">
          <Button className="bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] text-white" onClick={onSubmit}>
            {buttonText}
          </Button>
          {isMobile && (
            <Button className="bg-neutral-600 text-white" onClick={() => setIsPreviewVisible(!isPreviewVisible)}>
              {isPreviewVisible ? "Back to Editor" : "Preview"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;