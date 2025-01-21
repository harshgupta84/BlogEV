import React, { useState, useEffect } from "react";
import MarkdownPreview from "@uiw/react-markdown-preview";
import "highlight.js/styles/github.css";
import useBlogStore from "@/store/blogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";

function UpdateBlog() {
  const { id } = useParams(); // Get the blog ID from the URL
  const { getBlogById, updateBlog } = useBlogStore(); // Get the store functions
  const { toast } = useToast(); // Use toast for notifications
  const navigate = useNavigate();

  // Retrieve the blog by its ID
  const existingBlog = getBlogById(id);

  // State for form fields
  const [markdown, setMarkdown] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [pic, setPic] = useState("");

  // Populate the fields with the existing blog data
  useEffect(() => {
    if (existingBlog) {
      setMarkdown(existingBlog.content);
      setAuthor(existingBlog.author);
      setCategory(existingBlog.category);
      setPic(existingBlog.pic);
    }
  }, [existingBlog]);

  const handleUpdate = () => {
    // Prepare the updated data
    const updatedData = {
      content: markdown,
      author,
      category,
      pic,
      updatedAt: new Date().toISOString(),
    };

    updateBlog(id, updatedData);

    toast({
      title: "Blog updated successfully!",
      description: `Your blog "${existingBlog?.title}" has been updated.`,
      duration: 4000,
    });

    // Navigate to the "My Blogs" page
    navigate("/myblogs");
  };

  if (!existingBlog) {
    return (
      <div className="text-center mt-20">
        <h1 className="text-2xl font-bold">Blog Not Found</h1>
        <p className="mt-4">The blog you're trying to update doesn't exist.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen bg-background relative">
      <div className="container mx-auto max-w-[1200px] flex-1 flex flex-col items-center justify-center z-10 relative">
        <div className="text-center mb-8">
          <h1 className="text-5xl font-extrabold tracking-tight bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] bg-clip-text text-transparent">
            Update Blog
          </h1>
          <p className="text-lg text-muted-foreground mt-4">
            Edit your blog content and preview changes.
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

          {/* Markdown Preview */}
          <div className="w-1/2 p-4 overflow-auto bg-neutral-50 dark:bg-neutral-900 dark:text-white">
            <MarkdownPreview source={markdown} style={{ background: "transparent" }} />
          </div>
        </div>

        {/* Update Button */}
        <Button
          className="mt-6 bg-gradient-to-br from-[#0098C5] to-[#8CCC4C] text-white"
          onClick={handleUpdate}
        >
          Update Blog
        </Button>
      </div>
    </div>
  );
}

export default UpdateBlog;
