import React, { useState, useEffect } from "react";
import MarkdownEditor from "../blogCreate/MarkdownEditor";
import useBlogStore from "@/store/blogStore";
import { useToast } from "@/hooks/use-toast";
import { useNavigate, useParams } from "react-router-dom";

function UpdateBlog() {
  const { id } = useParams();
  const { getBlogById, updateBlog } = useBlogStore();
  const { toast } = useToast();
  const navigate = useNavigate();

  const [markdown, setMarkdown] = useState("");
  const [author, setAuthor] = useState("");
  const [category, setCategory] = useState("");
  const [title, setTitle] = useState("");

  const existingBlog = getBlogById(id);

  // Extract the title from the first line of Markdown
  const getTitle = (markdown) => {
    const firstLine = markdown.split("\n")[0];
    return firstLine.startsWith("#") ? firstLine.replace(/^#\s*/, "") : "Untitled Blog";
  };

  useEffect(() => {
    if (existingBlog) {
      setMarkdown(existingBlog.content);
      setAuthor(existingBlog.author);
      setCategory(existingBlog.category);
      setTitle(getTitle(existingBlog.content)); // Initialize title from the existing blog content
    }
  }, [existingBlog]);

  useEffect(() => {
    // Update the title whenever the markdown content changes
    setTitle(getTitle(markdown));
  }, [markdown]);

  const handleUpdate = () => {
    const updatedBlog = {
      ...existingBlog,
      content: markdown,
      author,
      category,
      title, // Use the dynamically updated title
      updatedAt: new Date().toISOString(),
    };

    updateBlog(id, updatedBlog);

    toast({
      title: "Blog updated successfully!",
      description: `Your blog "${title}" has been updated.`,
    });

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
    <div className="mt-24 ">
      <MarkdownEditor
        markdown={markdown}
        setMarkdown={setMarkdown}
        onSubmit={handleUpdate}
        buttonText="Update Blog"
      />
    </div>
  );
}

export default UpdateBlog;
