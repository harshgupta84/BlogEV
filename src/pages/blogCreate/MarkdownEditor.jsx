import React, { useState, useEffect } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "highlight.js/styles/github.css";
import { Button } from "@/components/ui/button";

function MarkdownEditor({ markdown, setMarkdown, onSubmit, buttonText }) {
  const [isPreviewVisible, setIsPreviewVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768); // Initial check for mobile

  // Update `isMobile` when the screen size changes
  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth <= 768);
    };

    window.addEventListener("resize", handleResize);

    // Cleanup the event listener on component unmount
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="container mx-auto max-w-[1200px] flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Markdown Editor
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Create and preview your Markdown.
          </p>
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
              <MarkdownPreview source={markdown} style={{ background: "transparent" }} />
            </div>
          ) : null}
        </div>

        {/* Buttons Section */}
        <div className="flex gap-4 mt-6">
          {/* Save Button */}
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
