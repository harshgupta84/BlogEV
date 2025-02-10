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

  useEffect(() => {
    if (existingBlog) {
      setMarkdown(existingBlog.content);
      setAuthor(existingBlog.author);
      setCategory(existingBlog.category);
      setTitle(existingBlog.content.split("\n")[0].replace(/^#\s*/, "") || "Untitled Blog");
    }
  }, [existingBlog]);

  const handleUpdate = () => {
    const updatedBlog = {
      ...existingBlog,
      content: markdown,
      author,
      category,
      title: markdown.split("\n")[0].replace(/^#\s*/, "") || "Untitled Blog",
      updatedAt: new Date().toISOString(),
    };

    updateBlog(id, updatedBlog);

    toast({
      title: "Blog updated successfully!",
      description: `Your blog "${title}" has been updated.`,
    });

    navigate("/blog/myblogs");
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
    <div className="mt-24">
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
