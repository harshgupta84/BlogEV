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

function MarkdownEditor({ onSubmit, buttonText, showHeader = true }) {
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
    <div className="flex flex-col bg-background relative">
      <div className="w-full flex-1 flex flex-col z-10 relative">
        {showHeader && (
          <>
            <div className="text-center mb-8 p-6">
              <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
                Markdown Editor
              </h1>
              <p className="text-lg text-muted-foreground mt-4">Create and preview your Markdown.</p>
            </div>

            <div className="text-center mb-6">
              <PulsatingButton onClick={generateContent}>✨ Generate Content for Blog</PulsatingButton>
            </div>
          </>
        )}

        {/* Form Controls */}
        <div className="p-6 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
          <div className="max-w-4xl mx-auto grid gap-6 md:grid-cols-2">
            {/* Title Input */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Blog Title</Label>
              <Input 
                value={title} 
                onChange={(e) => setTitle(e.target.value)} 
                placeholder="Enter your blog title..."
                className="text-lg font-medium"
              />
            </div>

            {/* Topic Selection */}
            <div className="space-y-2">
              <Label className="text-sm font-medium">Topics</Label>
              <Popover open={open} onOpenChange={setOpen}>
                <PopoverTrigger asChild>
                  <Button variant="outline" role="combobox" aria-expanded={open} className="w-full justify-between">
                    {selectedTopics.length > 0 ? `${selectedTopics.length} topic${selectedTopics.length !== 1 ? 's' : ''} selected` : "Select topics..."}
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
            </div>

            {/* Selected Topics */}
            {selectedTopics.length > 0 && (
              <div className="md:col-span-2">
                <div className="flex flex-wrap gap-2">
                  {selectedTopics.map((topic, index) => (
                    <Badge key={index} className="flex items-center bg-blue-500 text-white px-3 py-1 rounded-full">
                      {topic}
                      <button onClick={() => removeTopic(topic)} className="ml-2 text-xs hover:bg-white hover:bg-opacity-20 rounded-full p-1">
                        ×
                      </button>
                    </Badge>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Editor Section */}
        <div className="flex-1 flex flex-col">
          {/* Mobile Toggle */}
          {isMobile && (
            <div className="p-4 border-b border-gray-200 dark:border-gray-700">
              <Button 
                variant="outline" 
                onClick={() => setIsPreviewVisible(!isPreviewVisible)}
                className="w-full"
              >
                {isPreviewVisible ? "✏️ Edit" : "👁️ Preview"}
              </Button>
            </div>
          )}

          {/* Editor/Preview */}
          <div className={`flex flex-1 ${isMobile ? "" : ""} min-h-[500px]`}>
            {(!isMobile || !isPreviewVisible) && (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">✏️ Editor</h3>
                </div>
                <textarea
                  className="flex-1 p-6 text-base resize-none focus:outline-none bg-white dark:bg-gray-900 dark:text-white border-0 font-mono leading-relaxed"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  placeholder="# Start writing your blog...\n\nUse **Markdown** to format your content:\n- **Bold text**\n- *Italic text*\n- [Links](https://example.com)\n- ![Images](image-url)\n\n## Subheadings\n\nAnd much more!"
                  style={{ minHeight: '500px' }}
                ></textarea>
              </div>
            )}

            {!isMobile && (
              <div className="w-px bg-gray-200 dark:bg-gray-700"></div>
            )}

            {(!isMobile || isPreviewVisible) && (
              <div className="flex-1 flex flex-col">
                <div className="p-4 border-b border-gray-200 dark:border-gray-700 bg-gray-50 dark:bg-gray-800">
                  <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300">👁️ Preview</h3>
                </div>
                <div className="flex-1 p-6 overflow-auto bg-white dark:bg-gray-900">
                  {content ? (
                    <div className="prose dark:prose-invert max-w-none prose-lg">
                      <MarkdownPreview 
                        source={content} 
                        style={{ 
                          background: "transparent", 
                          color: "inherit",
                          fontFamily: "inherit"
                        }} 
                      />
                    </div>
                  ) : (
                    <div className="text-center text-gray-500 dark:text-gray-400 mt-12">
                      <div className="text-4xl mb-4">📝</div>
                      <p>Start writing to see your preview here</p>
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;