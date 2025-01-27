import React, { useState, useEffect } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";
import { PulsatingButton } from "@/components/ui/pulsating-button";
import LoadingSpinner from "@/utils/LoadingSpinner";
import { chatSession } from "@/pages/blogCreate/AiModal";

function MarkdownEditor({ markdown, setMarkdown, onSubmit, buttonText }) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initial check for mobile
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const generateContent = async () => {
    const title = markdown.split("\n")[0].replace(/^#\s*/, "") || "Untitled Blog";
    const prompt = `Generate content for the blog in Markdown with the title: "${title}" and add the title at the top. Do not include anything else except the main content of the blog.`;

    try {
      setLoading(true);
      const result = await chatSession.sendMessage(prompt);
      const resultText = await result.response.text();
      setLoading(false);
      setMarkdown(resultText);
    } catch (error) {
      console.error("Error generating blog content:", error);
      setLoading(false);
    }
  };
  if(loading){
    return (
       <LoadingSpinner title="Let the Magic Happen ✨" />
    )
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative mb-4 mx-3">
    
      <div className="container mx-auto max-w-[1200px] flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Markdown Editor
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Create and preview your Markdown.
          </p>
        </div>

        <div className="m-3">
          <PulsatingButton onClick={generateContent}>
            ✨ Generate Content for Blog
          </PulsatingButton>
        </div>

        <div
          className={`flex flex-1 w-full ${
            isMobile ? "" : "gap-4"
          } overflow-hidden border rounded-lg shadow-lg bg-white dark:bg-neutral-900`}
        >
          {/* Markdown Editor */}
          {(!isMobile || !isPreviewVisible) && (
            <textarea
              className="w-full p-4 text-lg resize-none focus:outline-none bg-neutral-100 dark:bg-neutral-800 dark:text-white"
              value={markdown}
              onChange={(e) => setMarkdown(e.target.value)}
              placeholder="Write your Markdown here..."
            ></textarea>
          )}

          {/* Markdown Preview */}
          {(isMobile && isPreviewVisible) || !isMobile ? (
            <div
              className={`w-full p-4 overflow-auto bg-neutral-50 dark:bg-neutral-900 dark:text-white ${
                isMobile && !isPreviewVisible ? "hidden" : ""
              }`}
            >
              <MarkdownPreview source={markdown} style={{ background: "transparent" ,color:"inherit"}} />
            </div>
          ) : null}
        </div>

        {/* Buttons Section */}
        <div className="flex gap-4 mt-6">
          <Button
            className="bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] text-white"
            onClick={onSubmit}
          >
            {buttonText}
          </Button>

          {/* Preview Toggle Button (Visible Only on Mobile) */}
          {isMobile && (
            <Button
              className="bg-neutral-600 text-white"
              onClick={() => setIsPreviewVisible(!isPreviewVisible)}
            >
              {isPreviewVisible ? "Back to Editor" : "Preview"}
            </Button>
          )}
        </div>
      </div>
    </div>
  );
}

export default MarkdownEditor;

