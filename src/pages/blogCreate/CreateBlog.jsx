import React, { useState } from "react";
import useBlogStore from "@/store/blogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import MarkdownEditor from "./MarkdownEditor";

function CreateBlog() {
  const [markdown, setMarkdown] = useState("# New Blog...\nStart typing here...");
  const [author, setAuthor] = useState("John Doe");
  const [category, setCategory] = useState("Technology");
  const { addBlog } = useBlogStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleSave = () => {
    const title = markdown.split("\n")[0].replace(/^#\s*/, "") || "Untitled Blog";
    addBlog(title, markdown, author, category);

    toast({
      title: `Blog "${title}" saved successfully!`,
      description: "Your blog has been saved to the system.",
    });

    navigate("/myblogs");
  };

  return (
    <div className="mt-24 ">
        <MarkdownEditor
          markdown={markdown}
          setMarkdown={setMarkdown}
          onSubmit={handleSave}
          buttonText="Save Blog"
        />
    </div>
  );
}

export default CreateBlog;
