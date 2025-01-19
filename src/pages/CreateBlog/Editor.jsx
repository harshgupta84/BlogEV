import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeHighlight from "rehype-highlight";
import "highlight.js/styles/github.css";  
import useBlogStore from "@/store/blogStore";  
import { useToast } from "@/hooks/use-toast";  

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

  const [author, setAuthor] = useState('John Doe'); // Placeholder author
  const [category, setCategory] = useState('Technology'); // Placeholder category
  const [pic, setPic] = useState(''); // Placeholder picture URL
  const { addBlog } = useBlogStore(); // Get the addBlog function from the store
  const { toast } = useToast(); // Use toast for notifications

  // Function to generate title from the first line of markdown
  const getTitle = (markdown) => {
    const firstLine = markdown.split("\n")[0];
    return firstLine.startsWith("#") ? firstLine.replace(/^#\s*/, "") : "Untitled Blog";
  };

  // Handle save functionality
  const handleSave = () => {
    const title = getTitle(markdown); // Extract title from markdown

    // Add the blog to the Zustand store
    addBlog(title, markdown, author, category, pic);

    // Show success toast using ShadCN's toast system
    toast({
      title: `Blog "${title}" saved successfully!`,
      description: "Your blog has been saved to the system.",
      duration: 4000,
    });

    // Reset the markdown content
    setMarkdown("# New Blog...");
    setAuthor(''); // Reset author input (or you can keep a default value)
    setCategory(''); // Reset category input (or keep a default)
    setPic(''); // Reset pic URL input (if needed)
  };

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="container mx-auto max-w-[1200px] flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Markdown Editor
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Create and preview your Markdown side by side.
          </p>
        </div>

        <div className="flex flex-1 w-full gap-4 overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-neutral-900">
          {/* Markdown Editor */}
          <textarea
            className="w-1/2 p-4 text-lg resize-none focus:outline-none bg-neutral-100 dark:bg-neutral-800 dark:text-white"
            value={markdown}
            onChange={(e) => setMarkdown(e.target.value)}
            placeholder="Write your Markdown here..."
          ></textarea>

          {/* Preview Section */}
          <div className="w-1/2 p-4 overflow-auto bg-neutral-50 dark:bg-neutral-900 dark:text-white">
            <ReactMarkdown
              className="prose dark:prose-invert"
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeHighlight]}
            >
              {markdown}
            </ReactMarkdown>
          </div>
        </div>

        {/* Save Button */}
        <button
          className="mt-6 bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] text-white"
          onClick={handleSave}
        >
          Save Blog
        </button>
      </div>
    </div>
  );
}

export default Editor;
