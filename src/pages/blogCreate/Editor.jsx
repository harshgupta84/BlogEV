import React, { useState } from "react";
import MarkdownPreview from '@uiw/react-markdown-preview';
import "highlight.js/styles/github.css";  
import useBlogStore from "@/store/blogStore";  
import { useToast } from "@/hooks/use-toast";  
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import { chatSession } from "@/pages/blogCreate/AiModal";
import LoadingSpinner from "../../utils/LoadingSpinner"
function Editor() {
  const [markdown, setMarkdown] = useState(`# Welcome to BlogEV\nStart typing your Markdown here...

## Features
- Live preview of Markdown
- Supports **bold**, _italic_, and [links](https://example.com)
- Write code blocks:
\`\`\`javascript
console.log("Hello, Markdown!");
\`\`\`
- Create lists:
  - Bullet list
  1. Numbered list
`);

  const [author, setAuthor] = useState("John Doe"); // Placeholder author
  const [category, setCategory] = useState("Technology");
  const [pic, setPic] = useState("");
  const { addBlog } = useBlogStore(); 
  const { toast } = useToast(); 
  const [loading,setLoading]=useState(false);
  const navigate = useNavigate();

  // Helper function to extract the title from the first line of Markdown
  const getTitle = (markdown) => {
    const firstLine = markdown.split("\n")[0];
    return firstLine.startsWith("#") ? firstLine.replace(/^#\s*/, "") : "Untitled Blog";
  };

  const handleSave = () => {
    const title = getTitle(markdown);
    addBlog(title, markdown, author, category, pic);

    toast({
      title: `Blog "${title}" saved successfully!`,
      description: "Your blog has been saved to the system.",
      duration: 4000,
    });

    // Reset the form fields
    setMarkdown("# New Blog...");
    setAuthor("John Doe");
    setCategory("Technology");
    setPic("");

    // Navigate to the "My Blogs" page
    navigate("/myblogs");
  };

  const generateContent = async () => {
    const title = getTitle(markdown);
    const prompt = `Generate content for the blog in Markdown  with the title: "${title} and add title at top and do not anything except the main content of blog and dont specify it as markdown"`;
    
    try {
      setLoading(true);
      const result = await chatSession.sendMessage(prompt);
      const resultText = await result.response.text();
      setLoading(false);
      setMarkdown(resultText);
      toast({
        title: "Blog content generated!",
        description: "AI-generated content has been added to the editor.",
        duration: 4000,
      });
    } catch (error) {
      console.error("Error generating blog content:", error);
      toast({
        title: "Error generating content",
        description: "There was an issue generating the blog content. Please try again.",
        variant: "destructive",
        duration: 4000,
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      {loading && <LoadingSpinner title={"Let the Magic Happen ✨"}/>}
      <div className="container mx-auto max-w-[1200px] flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Markdown Editor
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Create and preview your Markdown side by side.
          </p>
        </div>

        <div className="m-3">
          <PulsatingButton onClick={generateContent}>
            ✨ Generate Content For Blog
          </PulsatingButton>
        </div>

        <div className="flex flex-1 w-full gap-4 overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-neutral-900">
          {/* Markdown Editor */}
          <textarea
            className="w-1/2 p-4 text-lg resize-none focus:outline-none bg-neutral-100 dark:bg-neutral-800 dark:text-white"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your Markdown here..."
          ></textarea>

          {/* Markdown Preview */}
          <div className="w-1/2 p-4 overflow-auto bg-neutral-50 dark:bg-neutral-900 dark:text-white">
            <MarkdownPreview source={markdown} style={{background:"transparent"}}/>
          </div>
        </div>

        {/* Save Button */}
        <Button
          className="mt-6 bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] text-white"
          onClick={handleSave}
        >
          Save Blog
        </Button>
      </div>
    </div>
  );
}

export default Editor;
